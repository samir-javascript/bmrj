import handleError from "@/lib/handlers/error"
import connectToDb from "@/database/connect"
import Order from "@/database/models/order.model"
import { NextResponse } from "next/server";
import Product from "@/database/models/product.model";
export const GET = async( _: Request,
    { params }: { params: Promise<{ orderId: string }> })=>  {
        const {orderId} = await params;
    try {
        await connectToDb()

        const order = await Order.findById(orderId)
        .populate({path: "orderItems.product", model: Product})
        if(!order) throw new Error("Order not found")
        return NextResponse.json({success: true, data: order})
    } catch (error) {
        return handleError(error,"api") as APIErrorResponse
    }
}