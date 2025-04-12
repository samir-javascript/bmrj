import { NextResponse } from "next/server";


import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDb from "@/database/connect";
import { UsersSchema } from "@/lib/zod";
import User from "@/database/models/user.model";
import handleError from "@/lib/handlers/error";



export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await connectToDb();

    const validatedData = UsersSchema.partial().safeParse({ email });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}