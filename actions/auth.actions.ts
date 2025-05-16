// "use server";

// import bcrypt from "bcryptjs";
// import crypto from "crypto"
// import { signIn } from "@/auth";
// import { AuthCredentials, EmailVerificationParams } from "@/types/action";

// import User, { IUser } from "@/database/models/user.model";
// import Account, { IAccount } from "@/database/models/account.model";
// import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
// import handleError from "@/lib/handlers/error";
// import { action } from "@/lib/handlers/action";
// import { EmailVerificationValidationSchema, LoginValidationSchema, SignUpValidationSchema } from "@/lib/zod";
// import Token, { IToken } from "@/database/models/token.model";
// import { sendVerificationEmail } from "@/lib/nodemailer";
// import connectToDb from "@/database/connect";
// import { revalidatePath } from "next/cache";
// import { ROUTES } from "@/constants/routes";
// import mongoose from "mongoose";




// export async function signUpWithCredentials(
//   params: AuthCredentials
// ): Promise<ActionResponse> {
//   const validationResult = await action({ params, schema: SignUpValidationSchema });

//   if (validationResult instanceof Error) {
//     return handleError(validationResult) as ErrorResponse;
//   }

//   const { name, lastName, email, password, phoneNumber, gender  } = validationResult.params!;

//  await connectToDb();
// const session = await mongoose.startSession();
// session.startTransaction();

// try {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new ForbiddenError(`You indicated you're a new customer, but an account already exists with the email address ${email}.`);
//   }

//   const checkPhone = await User.findOne({ phoneNumber });
//   if (checkPhone) {
//     throw new Error(`${phoneNumber} phone number is already in use!`);
//   }

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const [newUser] = await User.create(
//     [{ lastName, name, email, password: hashedPassword, gender, phoneNumber }],
//     { session }
//   );

//   await Account.create(
//     [
//       {
//         userId: newUser._id,
//         name,
//         provider: "credentials",
//         providerAccountId: email,
//         password: hashedPassword,
//       }
//     ],
//     { session }
//   );

//   await session.commitTransaction();
//   session.endSession();

//   // we should not call signIn fn here instead we should send an email verification first and then call sign In fn once the verification process goes through
//  //  await signIn("credentials", { email, password, redirect: false });
//   await sendVerificationEmail(email,"jh")
//   revalidatePath(ROUTES.adminUsersList);

//   return { success: true };

// } catch (error) {
//   await session.abortTransaction();
//   session.endSession();
//   return handleError(error) as ErrorResponse;
// }

// }
// export async function signInWithCredentials(
//   params:Pick<AuthCredentials, "email" | "password">
// ): Promise<ActionResponse> {
//   const validationResult = await action({ params, schema: LoginValidationSchema });

//   if (validationResult instanceof Error) {
//     return handleError(validationResult) as ErrorResponse;
//   }

//   const {  email, password } = validationResult.params!;

 

//   try {
//     await connectToDb()
//     const existingUser = await User.findOne({ email }) as IUser

//     if (!existingUser) {
//       throw new Error(`The email/password you entered is incorrect. Verify your credentials or try using a different method to log in.`)
//     }
   
//     //   const account= await Account.findOne({
//     //     provider: "credentials",
//     //     providerAccountId: email
//     //  }) as IAccount
//     //  if(!account) throw new NotFoundError("Account")
 
//       const matchPassword = await bcrypt.compare(password, existingUser.password as string)
//       if(!matchPassword) throw new Error('The email/password you entered is incorrect. Verify your credentials or try using a different method to log in.')
    
  

//       if(existingUser.isVerified !== true)  throw new Error("please check out your inbox to verify your email")
      
   
//     await signIn("credentials", { email, password, redirect: false });
    


//     return { success: true };
//   } catch (error) {
//      return handleError(error) as ErrorResponse;
//   }
// }

// // export async function VerifyEmail(params:EmailVerificationParams): Promise<ActionResponse> {
// //     const validatedResult = await action({params,schema: EmailVerificationValidationSchema});
// //     if(validatedResult instanceof Error) {
// //        return handleError(validatedResult) as ErrorResponse
// //     }
// //     const { token } = validatedResult.params!
// //     await connectToDb()
// //     try {
// //         const existingRToken = await Token.findOne({token}) as IToken
// //         if(!existingRToken || existingRToken.expiresAt < new Date()) {
// //             throw new Error('token expired or invalid')
// //         }
// //         const user = await User.findOne({_id: existingRToken.userId}) 
// //         if(!user) {
// //             throw new Error('User attached to token not found')
// //         }
// //         await Token.deleteOne({ _id: existingRToken._id }); 
// //         user.isVerified = true;
// //          await user.save();
// //        await signIn("credentials", { email: user.email, password: user.password , redirect: false });
   
// //         return {
// //            success: true
// //         }
// //     } catch (error) {
// //         return handleError(error) as ErrorResponse
// //     }
// // }

"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthCredentials, EmailVerificationParams } from "@/types/action";

import User, { IUser } from "@/database/models/user.model";
import Account from "@/database/models/account.model";
import Token, { IToken } from "@/database/models/token.model";

import { ForbiddenError } from "@/lib/http-errors";
import handleError from "@/lib/handlers/error";
import { action } from "@/lib/handlers/action";
import { EmailVerificationValidationSchema, LoginValidationSchema, SignUpValidationSchema } from "@/lib/zod";
import { sendVerificationEmail } from "@/lib/nodemailer";
import connectToDb from "@/database/connect";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/constants/routes";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function signUpWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpValidationSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, lastName, email, password, phoneNumber, gender } = validationResult.params!;
  const normalizedEmail = email.toLowerCase().trim();

  await connectToDb();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ForbiddenError(`You indicated you're a new customer, but an account already exists with the email address ${normalizedEmail}.`);
    }

    const phoneExists = await User.findOne({ phoneNumber });
    if (phoneExists) {
      throw new ForbiddenError(`${phoneNumber} is already associated with another account.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create(
      [{ lastName, name, email: normalizedEmail, password: hashedPassword, gender, phoneNumber }],
      { session }
    );

    await Account.create(
      [{
        userId: newUser._id,
        name,
        provider: "credentials",
        providerAccountId: normalizedEmail,
        password: hashedPassword,
      }],
      { session }
    );
  // Send email verification
   // Delete any existing tokens for this user to avoid duplicates
await Token.deleteMany({ userId: newUser._id });

// Generate a new verification code
const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

await Token.create({
  token: verificationCode,
  userId: newUser._id,
  expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
});


    await sendVerificationEmail(normalizedEmail, verificationCode);
    await session.commitTransaction();

  
    revalidatePath(ROUTES.adminUsersList);

    return { success: true, message: "please check out your email to verify" };

  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: LoginValidationSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;
  const normalizedEmail = email.toLowerCase().trim();

  try {
    await connectToDb();
    const existingUser = await User.findOne({ email: normalizedEmail }) as IUser;

    if (!existingUser) {
      throw new ForbiddenError("The email/password you entered is incorrect.");
    }

    const passwordMatches = await bcrypt.compare(password, existingUser.password as string);
    if (!passwordMatches) {
      throw new ForbiddenError("The email/password you entered is incorrect.");
    }

    if (!existingUser.isVerified) throw new ForbiddenError("Please check your inbox and verify your email before logging in.")


    await signIn("credentials", { email: normalizedEmail, password, redirect: false });
    return { success: true };

  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function VerifyEmail(params: EmailVerificationParams): Promise<ActionResponse> {
  const validatedResult = await action({ params, schema: EmailVerificationValidationSchema });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { token } = validatedResult.params!;
  await connectToDb();

  try {
    const existingToken = await Token.findOne({ token }) as IToken;

    if (!existingToken || existingToken.expiresAt < new Date()) {
      throw new ForbiddenError("This token is invalid or has expired.");
    }

    const user = await User.findById(existingToken.userId);
    if (!user) {
      throw new ForbiddenError("No user is associated with this token.");
    }

    await Token.deleteOne({ _id: existingToken._id }); // cleanup
    user.isVerified = true;
    await user.save();

  //  redirect(ROUTES.signin)

    return { success: true };

  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
