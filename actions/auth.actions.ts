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
import { EmailVerificationValidationSchema, LoginValidationSchema, SendResetPasswordSchema, SignUpValidationSchema } from "@/lib/zod";
import { sendSetPasswordCode, sendVerificationEmail } from "@/lib/nodemailer";
import connectToDb from "@/database/connect";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/constants/routes";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import ResetToken from "@/database/models/ResetPasswordToken";

// export async function signUpWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
//   const validationResult = await action({ params, schema: SignUpValidationSchema });

//   if (validationResult instanceof Error) {
//     return handleError(validationResult) as ErrorResponse;
//   }

//   const { name, lastName, email, password, phoneNumber, gender } = validationResult.params!;
//   const normalizedEmail = email.toLowerCase().trim();

//   await connectToDb();
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const existingUser = await User.findOne({ email: normalizedEmail });
//     if (existingUser) {
//       throw new ForbiddenError(`You indicated you're a new customer, but an account already exists with the email address ${normalizedEmail}.`);
//     }

//     const phoneExists = await User.findOne({ phoneNumber });
//     if (phoneExists) {
//       throw new ForbiddenError(`${phoneNumber} is already associated with another account.`);
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const [newUser] = await User.create(
//       [{ lastName, name, email: normalizedEmail, password: hashedPassword, gender, phoneNumber }],
//       { session }
//     );

//     await Account.create(
//       [{
//         userId: newUser._id,
//         name,
//         provider: "credentials",
//         providerAccountId: normalizedEmail,
//         password: hashedPassword,
//       }],
//       { session }
//     );
//   // Send email verification
//    // Delete any existing tokens for this user to avoid duplicates
// await Token.deleteMany({ userId: newUser._id });

// // Generate a new verification code
// const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

// await Token.create({
//   token: verificationCode,
//   userId: newUser._id,
//   expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
// });


//     await sendVerificationEmail(normalizedEmail, verificationCode);
//     await session.commitTransaction();

  
//     revalidatePath(ROUTES.adminUsersList);

//     return { success: true, message: "please check out your email to verify" };

//   } catch (error) {
//     await session.abortTransaction();
//     return handleError(error) as ErrorResponse;
//   } finally {
//     session.endSession();
//   }
// }
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
    // Pre-generate expensive values
    const [hashedPassword, verificationCode] = await Promise.all([
      bcrypt.hash(password, 12),
      Promise.resolve(Math.floor(100000 + Math.random() * 900000).toString()),
    ]);

    // Parallel user lookup
    const [existingUser, phoneExists] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ phoneNumber }),
    ]);

    if (existingUser) {
      throw new ForbiddenError(`An account already exists with the email address ${normalizedEmail}.`);
    }

    if (phoneExists) {
      throw new ForbiddenError(`${phoneNumber} is already associated with another account.`);
    }

    // Create user and account in transaction
    const [newUser] = await User.create(
      [{ lastName, name, email: normalizedEmail, password: hashedPassword, gender, phoneNumber }],
      { session }
    );

    await Account.create(
      [{
        userId: newUser._id,
        name,
        provider: 'credentials',
        providerAccountId: normalizedEmail,
        password: hashedPassword,
      }],
      { session }
    );

    // Clean previous tokens and create new one
    await Token.deleteMany({ userId: newUser._id }, { session });
    await Token.create([{
      token: verificationCode,
      userId: newUser._id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
    }], { session });

    await session.commitTransaction();
    session.endSession();

    // Send email after transaction (non-blocking)
    sendVerificationEmail(normalizedEmail, verificationCode).catch(console.error);

    // Optional: revalidate admin user list page
    revalidatePath(ROUTES.adminUsersList);

    return {
      success: true,
      message: 'Please check your email to verify your account.',
    };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
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

export async function SendResetPasswordCode(email:string): Promise<ActionResponse> {
   const validatedResult = await action({ params: { email }, schema: SendResetPasswordSchema });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  
  await connectToDb();

  try {
     const user = await User.findOne({email}) as IUser
     if(!user) throw new Error('User not found')
       // Clean previous tokens and create new one
      const resetCode =  Math.floor(1000 + Math.random() * 9000);
    await ResetToken.deleteMany({ userId: user._id });
    await ResetToken.create({
      resetCode,
      userId: user._id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
    });
    await sendSetPasswordCode(email,resetCode)
     return {
      success: true,
      message: 'Please check your email inbox to reset your current password.',
    };

  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}