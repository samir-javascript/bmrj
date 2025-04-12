"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto"
import { signIn } from "@/auth";
import { AuthCredentials, EmailVerificationParams } from "@/types/action";

import User, { IUser } from "@/database/models/user.model";
import Account, { IAccount } from "@/database/models/account.model";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
import handleError from "@/lib/handlers/error";
import { action } from "@/lib/handlers/action";
import { EmailVerificationValidationSchema, LoginValidationSchema, SignUpValidationSchema } from "@/lib/zod";
import Token, { IToken } from "@/database/models/token.model";
import { sendVerificationEmail } from "@/lib/nodemailer";
import connectToDb from "@/database/connect";





export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpValidationSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, lastName, email, password, phoneNumber, gender  } = validationResult.params!;

 await connectToDb()

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
       throw new ForbiddenError(`You indicated you're a new customer, but an account already exists with the email address ${email}.`)
    }
    // 

   

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ lastName, name, email, password: hashedPassword, gender, phoneNumber }]);

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
    );
   
    const token = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit code
    await Token.create({ userId: newUser._id, token });
    
     await sendVerificationEmail(newUser.email,token)

    await signIn("credentials", { email, password, redirect: false });
    
    return { success: true };
  } catch (error) {
     return handleError(error) as ErrorResponse;
    
  } 
}
export async function signInWithCredentials(
  params:Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: LoginValidationSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {  email, password } = validationResult.params!;

 

  try {
    const existingUser = await User.findOne({ email }) as IUser

    if (!existingUser) {
      throw new Error(`The email/password you entered is incorrect. Verify your credentials or try using a different method to log in.`)
    }
   
    //   const account= await Account.findOne({
    //     provider: "credentials",
    //     providerAccountId: email
    //  }) as IAccount
    //  if(!account) throw new NotFoundError("Account")
 
      const matchPassword = await bcrypt.compare(password, existingUser.password as string)
      if(!matchPassword) throw new Error('The email/password you entered is incorrect. Verify your credentials or try using a different method to log in.')
    
  

   
   
    await signIn("credentials", { email, password, redirect: false });
    


    return { success: true };
  } catch (error) {
     return handleError(error) as ErrorResponse;
  }
}

export async function VerifyEmail(params:EmailVerificationParams): Promise<ActionResponse> {
    const validatedResult = await action({params,schema: EmailVerificationValidationSchema});
    if(validatedResult instanceof Error) {
       return handleError(validatedResult) as ErrorResponse
    }
    const { token } = validatedResult.params!
    await connectToDb()
    try {
        const existingRToken = await Token.findOne({token}) as IToken
        if(!existingRToken || existingRToken.expiresAt < new Date()) {
            throw new Error('token expired or invalid')
        }
        const user = await User.findOne({_id: existingRToken.userId}) 
        if(!user) {
            throw new Error('User attached to token not found')
        }
        await Token.deleteOne({ _id: existingRToken._id }); 
        user.isVerified = true;
        await user.save();
      // await signIn("credentials", { email: user.email, password: "soso123A@" , redirect: false });
   
        return {
           success: true
        }
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
}

