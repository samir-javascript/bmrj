import { NextResponse } from "next/server";


import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import User from "@/database/models/user.model";
import connectToDb from "@/database/connect";
import handleError from "@/lib/handlers/error";
import { UsersSchema } from "@/lib/zod";



export async function GET() {
  // get all users;
  try {
    await connectToDb();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await connectToDb();
    const body = await request.json();

    const validatedData = UsersSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, lastName } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
           throw new ForbiddenError(`You indicated you're a new customer, but an account already exists with the email address ${email}.`)
    }

    // const existingUsername = await User.findOne({ username });
    // if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}