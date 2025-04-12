"use server"

import connectToDb from "@/database/connect";
import Coupon, { ICoupon } from "@/database/models/cupon.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CouponSchema } from "@/lib/zod";
import { CouponParams } from "@/types/action";


export async function createCoupon(params:CouponParams): Promise<ActionResponse<{coupon:ICoupon}>> {
     const validatedResult = await action({params,schema:CouponSchema})
     if(validatedResult instanceof Error) {
         return handleError(validatedResult) as ErrorResponse;
     }
  try {
    await connectToDb();

    const { code } = validatedResult.params! // Get coupon code and cart total

   

    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
       throw new Error('Coupon not found')
    }

    if (new Date() > coupon.expiryDate) {
       throw new Error('Coupon has expired')
    }

   

   
    return {
        success:true,
        data: {coupon: JSON.parse(JSON.stringify(coupon))}
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
