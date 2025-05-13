"use server"

import { auth } from "@/auth";
import connectToDb from "@/database/connect";
import Account, { IAccount } from "@/database/models/account.model";
import { Cart } from "@/database/models/cart.model";
import Collection from "@/database/models/collection";
import Order from "@/database/models/order.model";
import Product, { IReview } from "@/database/models/product.model";
import SetPasswordToken, { ISetPasswordToken } from "@/database/models/setPasswordToken.model";
import Shipping, { IShipping } from "@/database/models/shippingAdress.model";
import User, { IUser } from "@/database/models/user.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { NotFoundError, UnAuthorizedError } from "@/lib/http-errors";
import { sendSetPasswordVerificationCode } from "@/lib/nodemailer";
import { DeleteSelectedUsersSchema, DeleteUserValidationSchema, editProfileSchema, GetSetPasswordCodeSchema, GetUserInfoSchema, GetUserWithShippingSchema, PaginatedSchemaValidation, UpdateUserDetailsSchema } from "@/lib/zod";
import { DeleteSelectedUsersParams, DeleteUserParams, EditProfileParams, EditUserProfileByAdmin, GetUserInfoParams, GetUserWithShippingParams, IUserWithShipping, PaginatedSchemaParams, VerifyCodeAndSetPasswordParams } from "@/types/action";
import { Order as OrderType } from "@/types/Elements";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import mongoose, {FilterQuery,isValidObjectId} from "mongoose";

import { revalidatePath } from "next/cache";






export async function editProfile(
  params: EditProfileParams
): Promise<ActionResponse<{ user: IUser; canChangePassword: boolean }>> {

  const validatedResult = await action({
    params,
    schema: editProfileSchema,
    authorize: true,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const {
    email,
    name,
    lastName,
    currentPassword,
    password,
    confirmPassword,
    phoneNumber,
    gender,
  } = validatedResult.params!;
  
  const userId = validatedResult.session?.user.id!;

  try {
    await connectToDb();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const user = await User.findById(userId).session(session);
      if (!user) throw new Error('User Not found');

      const account = await Account.findOne({ userId }).session(session);
      if (!account) throw new Error('ACCOUNT NOT FOUND');
    
      const canChangePassword = user.password !== "";

      // Update user fields if they have changed
      if (user.name !== name) user.name = name;
      if (user.lastName !== lastName) user.lastName = lastName;
      if (user.email !== email) user.email = email;
      if (user.gender !== gender) user.gender = gender;
      if (user.phoneNumber !== phoneNumber) user.phoneNumber = phoneNumber;
       
      // Handle password change for "credentials" provider
      if (canChangePassword && password && currentPassword) {
        if (password !== confirmPassword) throw new Error('Passwords must match');
        const comparePassword = await bcrypt.compare(currentPassword,user.password)
        if(!comparePassword) throw new Error("Wrong current password")
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        account.password = hashedPassword;

        // Only update providerAccountId if provider is credentials
     
        // Optional: sync name if needed (be cautious with OAuth accounts)
        // account.name = name;
      }
      if (account.provider === 'credentials') {
        account.providerAccountId = email;
        account.name = name;
      }

      await Promise.all([user.save({ session }), account.save({ session })]);

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        data: {
          user: JSON.parse(JSON.stringify(user)),
          canChangePassword,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
export async function getUserInfo(params:GetUserInfoParams):Promise<ActionResponse<{userInfo:IUser}>>  {
   const validatedResult = await action({params,schema:GetUserInfoSchema,authorize:true})
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse;
   }

    const session = validatedResult.session?.user.id!

   try {
      await connectToDb()
      const user = await User.findById(session)
    
      if(!user) throw new Error("User not found")
      return  {
         success: true,
         data: {userInfo: JSON.parse(JSON.stringify(user))}
      }
   } catch (error) {
     return handleError(error) as ErrorResponse
   }
}
export async function checkPasswordcanChange(params: {userId:string}): Promise<ActionResponse<{canPasswordChange:boolean}>>{
  const validatedResult = await action({params,schema:GetUserInfoSchema,authorize:true})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse
  }
    const { userId } = validatedResult.params!
   try {
       await connectToDb()
       const user = await User.findById(userId) as IUser
       if(!user) throw new Error("User not found")
     
        const canChangePassword = user.password?.length! > 0;
    return {
       success: true,
       data: {canPasswordChange: canChangePassword}
    }

   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}

export async function SendSetPasswordCode(): Promise<ActionResponse> {
  const session = await auth();

  if (!session?.user.id)
    throw new UnAuthorizedError("You're unauthorized to perform this action.");

  try {
    await connectToDb();

    // Check if a token already exists and remove it to prevent duplicates
    await SetPasswordToken.deleteMany({ userId: session.user.id });

    // Create new token instance
    const tokenDoc = new SetPasswordToken()

    // Generate plain 6-digit token and hash it internally
    const plainToken = tokenDoc.generateSetPasswordToken(session.user.id)

    // Save to DB
    await tokenDoc.save();

    // Example: Send token to user's email
    await sendSetPasswordVerificationCode(session.user.email as string,plainToken);

    return {
      success: true,
      message: "Verification code sent to your email.",
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function VerifyCodeAndSetPassword(params:VerifyCodeAndSetPasswordParams): Promise<ActionResponse> {
  const validatedResult = await action({params,schema:GetSetPasswordCodeSchema,authorize:true})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse;
  }
  const userSession = validatedResult.session?.user.id;
  if(!userSession) throw new Error("you are an authorized to perform this action")
  const { code, password, confirmPassword} = validatedResult.params!
  try {
      await connectToDb()
      const user = await User.findById(userSession) 
      if(!user) throw new NotFoundError("User")
        const hashedToken = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");
        const tokenDoc = await SetPasswordToken.findOne({
          userId: user._id,
          setPasswordToken: hashedToken,
          setPasswordExpires: { $gt: new Date() }, // token not expired
        });

        if (!tokenDoc) {
          throw new Error("Invalid or expired code.");
        }

        if(password !== confirmPassword) throw new Error("Passwords must match")
          const hashedPassword = await bcrypt.hash(password, 12);
          const account = await Account.findOne({userId:userSession})
          if(!account) throw new NotFoundError("Account")
          user.password = hashedPassword;
          account.password = hashedPassword;
          await user.save()
          await SetPasswordToken.deleteOne({ _id: tokenDoc._id });
          return {
             success: true,
             message: "password has been set successfuly"
          }

  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}

// a bag to fix [shipping address inheritance after logout]

// TODO: finish this ;
export async function editUserProfileByAdmin(params:EditUserProfileByAdmin): Promise<ActionResponse>{
  const validatedResult = await action({params,schema:UpdateUserDetailsSchema,authorize:true})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse
  }
  const session = validatedResult.session;
  if(!session) throw new Error("User Session is missing")
  const {  lastName, firstName,isAdmin, email, gender, phoneNumber,
     address, city, country, postalCode,  userId } = params;
  try {
    await connectToDb()
    const isAdminUser = await User.findById(session.user.id) as IUser;
    if(!isAdminUser.isAdmin) throw new Error("Only admin users can perform this action")
      const userToUpdate = await User.findById(userId) 
    if(!userToUpdate) throw new Error("User not found")
     if(userToUpdate.name !== firstName)  userToUpdate.name = firstName;
    if(userToUpdate.lastName !== lastName)  userToUpdate.lastName = lastName;
    if(userToUpdate.email !== email)  userToUpdate.email = email;
    if(userToUpdate.gender !== gender)  userToUpdate.gender = gender;
    if(userToUpdate.phoneNumber !== phoneNumber)  userToUpdate.phoneNumber = phoneNumber;
    if(userToUpdate.isAdmin !== isAdmin)  userToUpdate.isAdmin = isAdmin;
    // if (currentPassword && newPassword) {
    //   const isMatch = await bcrypt.compare(currentPassword, userToUpdate.password);
    //   if (!isMatch) throw new Error("Wrong user password");
    //   userToUpdate.password = await bcrypt.hash(newPassword, 10);
    // }
    
    
    await userToUpdate.save()
    const activeUserShippingAddress = await Shipping.findOne({userId,isActive: true}) 
     if(activeUserShippingAddress) {
         activeUserShippingAddress.address = address;
         activeUserShippingAddress.postalCode = postalCode;
         activeUserShippingAddress.country = country;
         activeUserShippingAddress.city = city;
         await activeUserShippingAddress.save() 
     }else {
      await Shipping.create({
        userId,
        name: `${firstName} ${lastName}`,
        address,
        city,
        country,
        postalCode,
        phoneNumber: phoneNumber || "",
        isActive: true,
      });
     }
     return {
       success: true
     }

  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}

// TODO: delete user by admin

export async function deleteUser(params: DeleteUserParams): Promise<ActionResponse> {
  const validatedResult = await action({ params, schema: DeleteUserValidationSchema, authorize: true });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const session = validatedResult.session;
  const { userId } = params;

  try {
    await connectToDb();

    // find admin user
    const adminUser = await User.findById(session?.user.id) as IUser;
    if (!adminUser.isAdmin) throw new Error("only admin users can perform this action");

    const user = await User.findById(userId) as IUser;
    if (!user) throw new Error("User not found");

    // delete user
    await User.findByIdAndDelete(user._id);

    // delete all orders
    await Order.deleteMany({ user: user._id });

    // delete wishlist items
    await Collection.deleteMany({ userId: user._id });

    // delete user cart
    await Cart.deleteMany({ userId: user._id });

    // delete user reviews/comments from all products
    const productsWithUserReviews = await Product.find({ "reviews.user": user._id });

    for (const product of productsWithUserReviews) {
      // filter out the user's reviews
      product.reviews = product.reviews.filter(
        (review:IReview) => review.user.toString() !== user._id.toString()
      );

      // update numReviews and rating
      product.numReviews = product.reviews.length;
      const totalRating = product.reviews.reduce((sum:number, r:IReview) => sum + r.rating, 0);
      product.rating = product.numReviews > 0 ? totalRating / product.numReviews : 0;

      await product.save();
    }

    return {
      success: true,
      message: "user has been deleted successfully"
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}


// TODO: Get all users for admin





export const getAllUsers = async (
  params: PaginatedSchemaParams
): Promise<ActionResponse<{
  users: (IUser & { 
    orderCount: number; 
    latestPurchase?: string; 
    totalSpent: number 
  })[], 
  isNext: boolean 
}>> => {
  const validatedResult = await action({ params, schema: PaginatedSchemaValidation, authorize: true });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const session = validatedResult.session;
  if (!session) throw new Error("missing user admin session");

  const { page = 1, pageSize = 10, query } = params;
  const filterQuery: FilterQuery<typeof User> = { isAdmin: false };
  const skip = pageSize * (page - 1);

  try {
    await connectToDb();

    if (query && query.trim() !== "") {
      filterQuery.$or = [
        { name: { $regex: new RegExp(query, "i") } },
        { lastName: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
      ];
    }

    const userAdmin = await User.findById(session.user.id) as IUser;
    if (!userAdmin?.isAdmin) throw new Error("Cannot proceed! This action is only allowed by admin users");

    const usersCount = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    const userIds = users.map(u => u._id);

    // Aggregate: get orderCount, totalSpent, latestPurchase per user
    const ordersSummary = await Order.aggregate([
      { $match: { user: { $in: userIds } } },
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 },
          latestPurchase: { $max: "$createdAt" },
          totalSpent: { $sum: "$totalPrice" }
        }
      }
    ]);

    const summaryMap = new Map(
      ordersSummary.map(o => [o._id.toString(), {
        count: o.count,
        latestPurchase: o.latestPurchase,
        totalSpent: o.totalSpent
      }])
    );

    const usersWithStats = users.map(user => {
      // @ts-ignore
      const summary = summaryMap.get((user as IUser)._id.toString());
      return {
        ...user,
        orderCount: summary?.count || 0,
        latestPurchase: summary?.latestPurchase?.toISOString(),
        totalSpent: summary?.totalSpent || 0
      };
    });

    const isNext = usersCount > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(usersWithStats)),
        isNext
      }
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};


export const getUsers = async (
  params: {}
): Promise<ActionResponse<{
  users: IUser[],
  totalSpent: number
}>> => {
  const validatedResult = await action({ params, authorize: true });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const session = validatedResult.session;
  if (!session) throw new Error("missing user admin session");

  try {
    await connectToDb();

    const userAdmin = await User.findById(session.user.id) as IUser;
    if (!userAdmin?.isAdmin) throw new Error("Cannot proceed! This action is only allowed by admin users");

    // Get all non-admin users
    const users = await User.find({ isAdmin: false }).sort({ createdAt: -1 }).lean();

    // Aggregate total spending per user
    const spending = await Order.aggregate([
      {
        $match: {
          user: { $in: users.map(user => user._id) }
        }
      },
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalPrice" }
        }
      }
    ]);

    const spendingMap = new Map(spending.map(item => [item._id.toString(), item.totalSpent]));

    // Calculate overall total spent
    const totalSpent = spending.reduce((acc, curr) => acc + curr.totalSpent, 0);

    // (Optional) You could still add per-user spending if needed
    // const usersWithSpending = users.map(user => ({
    //   ...user,
    //   totalSpent: spendingMap.get(user._id.toString()) || 0
    // }));

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)), // original users list
        totalSpent, // total money spent by all users
      }
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};


export const deleteSelectedUsers = async (params: DeleteSelectedUsersParams): Promise<ActionResponse> => {
  const validatedResult = await action({ params, schema: DeleteSelectedUsersSchema, authorize: true });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const session = validatedResult.session;
  if (!session) throw new UnAuthorizedError();

  const { usersId } = params;

  try {
    await connectToDb();

    const isAdminUser = await User.findById(session.user.id) as IUser;
    if (!isAdminUser.isAdmin) throw new UnAuthorizedError("only admin users can perform this action");

    for (const userId of usersId) {
      const user = await User.findById(userId);
      if (!user) continue;

      // Delete related data
      await Order.deleteMany({ user: user._id });
      await Collection.deleteMany({ userId: user._id });
      await Cart.deleteMany({ userId: user._id });

      // Remove user reviews from all products
      const products = await Product.find({ "reviews.user": user._id });

      for (const product of products) {
        product.reviews = product.reviews.filter(
          (review:IReview) => review.user.toString() !== user._id.toString()
        );

        product.numReviews = product.reviews.length;
        const totalRating = product.reviews.reduce((sum:number, r:IReview) => sum + r.rating, 0);
        product.rating = product.numReviews > 0 ? totalRating / product.numReviews : 0;

        await product.save();
      }

      await User.findByIdAndDelete(user._id);
    }

    revalidatePath("/admin/usersManagement/users");

    return {
      success: true,
      message: `${usersId.length} user(s) and related data successfully deleted.`,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};




export const getUserWithShipping = async (params:GetUserWithShippingParams): Promise<ActionResponse<IUserWithShipping>> => {
  const validatedResult = await action({params,schema:GetUserWithShippingSchema,authorize:true})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse
  }
  const session = validatedResult.session;
  if(!session) throw new UnAuthorizedError('')
    const {userId} = params;
    
  try {

    await connectToDb();
    if(!isValidObjectId(userId)) throw new Error("User Id is not valid")
    const isAdminUser = await User.findById(session.user.id) as IUser
    if(!isAdminUser.isAdmin) throw new Error('Only admin users can have access to this area!')
    const user = await User.findById(userId) as IUser
    if (!user) throw new Error("User not found");

    // const shippingAddresses = await Shipping.find({ userId }).sort({ createdAt: -1 })
    const [shippingAddresses, orders, products] = await Promise.all([
      Shipping.find({ userId }).sort({ createdAt: -1 }),
      Order.find({ user: userId }).sort({ createdAt: -1 }),
      Product.find({ "reviews.user": userId })
    ]);

    // Extract user's reviews from products
    const reviews = products.flatMap(product =>
      product.reviews
        .filter((review: any) => String(review.user) === String(userId))
        .map((review: IReview) => ({
          productId: String(product._id),
          productName: product.name,
          reviews: review
        }))
    );
    
    const parsedUser  = JSON.parse(JSON.stringify(user))
    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
        shippingAddresses: JSON.parse(JSON.stringify(shippingAddresses)),
        orders: JSON.parse(JSON.stringify(orders)),
        reviews: JSON.parse(JSON.stringify(reviews)),
      }
    };
  } catch (error) {
     return handleError(error) as ErrorResponse;
  }
};
