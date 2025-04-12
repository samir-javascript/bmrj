import { NextResponse } from "next/server";


import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDb from "@/database/connect";
import { AccountSchema } from "@/lib/zod";
import Account from "@/database/models/account.model";
import handleError from "@/lib/handlers/error";


export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    await connectToDb()

    const validatedData = AccountSchema.partial().safeParse({
      userId,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const account = await Account.findOne({ userId });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}