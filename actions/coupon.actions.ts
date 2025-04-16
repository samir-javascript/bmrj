"use server"

import connectToDb from "@/database/connect";
import Coupon, { ICoupon } from "@/database/models/cupon.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CouponSchema } from "@/lib/zod";
import { CouponParams } from "@/types/action";
import { Action } from "@reduxjs/toolkit";


export async function createCoupon(params:CouponParams): Promise<ActionResponse<{coupon:ICoupon}>> {
     const validatedResult = await action({params,schema:CouponSchema})
     if(validatedResult instanceof Error) {
         return handleError(validatedResult) as ErrorResponse;
     }
  try {
    await connectToDb();

    const { code, userId } = validatedResult.params! // Get coupon code and cart total

   

    const coupon = await Coupon.findOne({ code, isActive: true })
    if (!coupon || !coupon.isActive || new Date() > coupon.expiryDate) throw new Error('Invalid or expired coupon.')
      if (!coupon.usedBy) {
        coupon.usedBy = [];
      }
      const hasUsed = coupon?.usedBy?.includes(userId);
   
    if(hasUsed) throw new Error("You have already used this coupon.")
    coupon.usedBy.push(userId)
    return {
        success:true,
        data: {coupon: JSON.parse(JSON.stringify(coupon))}
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
export async function coupon(): Promise<ActionResponse> {
   try {
      const existing = await Coupon.findOne({ code: 'GET50OFF' });
      if (existing) {
        return { success: false, message: 'Coupon already exists.' };
      }
  
      const newCoupon = await Coupon.create({
        code: 'GET50OFF',
        discount: 50, // 50% off
        expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // expires in 1 month
        isActive: true,
      });
      return  {
        success: true,
        data: JSON.parse(JSON.stringify(newCoupon))
      }
   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}