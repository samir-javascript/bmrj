"use server"

import { auth } from "@/auth";
import connectToDb from "@/database/connect";
import Account, { IAccount } from "@/database/models/account.model";
import { Cart } from "@/database/models/cart.model";
import Collection from "@/database/models/collection";
import Order from "@/database/models/order.model";
import SetPasswordToken, { ISetPasswordToken } from "@/database/models/setPasswordToken.model";
import User, { IUser } from "@/database/models/user.model";
import { cache } from "@/lib/cache";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { NotFoundError, UnAuthorizedError } from "@/lib/http-errors";
import { sendSetPasswordVerificationCode } from "@/lib/nodemailer";
import { DeleteUserValidationSchema, editProfileSchema, GetSetPasswordCodeSchema, GetUserInfoSchema, PaginatedSchemaValidation } from "@/lib/zod";
import { DeleteUserParams, EditProfileParams, EditUserProfileByAdmin, GetUserInfoParams, PaginatedSchemaParams, VerifyCodeAndSetPasswordParams } from "@/types/action";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import mongoose from "mongoose";





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


// TODO: finish this ;
// export async function editUserProfileByAdmin(params:EditUserProfileByAdmin): Promise<ActionResponse>{
//   const validatedResult = await action({params,schema:EditUserProfileByAdminSchema,authorize:true})
//   if(validatedResult instanceof Error) {
//      return handleError(validatedResult) as ErrorResponse
//   }
//   const {} = params;
//   try {
//     await connectToDb()
//   } catch (error) {
//      return handleError(error) as ErrorResponse
//   }
// }

// TODO: delete user by admin

export async function deleteUser(params:DeleteUserParams): Promise<ActionResponse> {
  const validatedResult = await action({params,schema:DeleteUserValidationSchema,authorize:true})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse
  }
  const session = validatedResult.session;
  const { userId } = params
   try {
      await connectToDb()
      // find admin user;
      const adminUser = await User.findById(session?.user.id) as IUser;
      if(!adminUser.isAdmin) throw new Error('only admin users can perform this action')
      const user = await User.findById(userId) as IUser
    if(!user) throw new Error('User not found')
      await User.findByIdAndDelete(user._id)
    
      // delete all his orders
      await Order.deleteMany({user: user._id})
      // delete all his comments

      // delete his wishlist items
      await Collection.deleteMany({userId: user._id})
      // Delete user cart
      await Cart.deleteMany({userId:user._id})
      return {
         success: true
      }
   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}

// TODO: Get all users for admin
export const  getAllUsers = cache( async(params:PaginatedSchemaParams):Promise<ActionResponse<{users: IUser[], isNext:boolean}>> => {
   const validatedResult = await action({params,schema:PaginatedSchemaValidation,authorize:true})
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
   }
   const session = validatedResult.session
   if(!session) throw new Error('missing user admin session')
    const { page = 1, pageSize = 10} = params;
  const skip = pageSize * (page - 1)
    try {
      await connectToDb()
      const userAdmin = await User.findById(session.user.id) as IUser
      if(!userAdmin.isAdmin) throw new Error('Cannot procced! this action is only allowed by admin users')
        const usersCount = await User.countDocuments()
      const users = await User.find()
      .skip(skip)
      .limit(pageSize)
      .sort({createdAt: -1})
      const isNext:boolean = usersCount > skip + users.length;
      return  {
         success: true,
         data: {users: JSON.parse(JSON.stringify(users)), isNext: isNext}
      }
    } catch (error) {
       return handleError(error) as ErrorResponse
    }
}, ["getAllUsers", "/admin/usersManagement/users"], {revalidate: 60 * 24 * 24})
