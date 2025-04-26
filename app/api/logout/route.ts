import { NextResponse } from "next/server";
import User from "@/database/models/user.model";
import dbConnect from "@/database/connect"
import handleError from "@/lib/handlers/error";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId } = await req.json();

    if (!userId) throw new Error("User ID missing")

    await User.findByIdAndUpdate(userId, { lastSeen: new Date() });

    return NextResponse.json({ success: true });
  } catch (error) {
     return handleError(error, "api") as APIErrorResponse
  }
}
