"use server"

import { auth } from "@/auth";
import { ROUTES } from "@/constants/routes";
import connectToDb from "@/database/connect";
import Shipping, { IShipping } from "@/database/models/shippingAdress.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { DeleteShippingSchema, editShippingSchema, GetSingleShippingSchema, ShippingSchemaValidation } from "@/lib/zod";
import { CreateShippingParams, DeleteShippingParams, EditShippingParams, GetSingleShippingParams } from "@/types/action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createShippingAddress(params:CreateShippingParams): Promise<ActionResponse<{shipping:IShipping}>> {
    const validatedResult = await action({params,schema:ShippingSchemaValidation,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { city, postalCode, country, name, phoneNumber, address} = validatedResult.params!
    const userId = validatedResult.session?.user.id!;
    try {
        await connectToDb()
        const newShippingAddress = await Shipping.create({
            city,
            postalCode,
            country,
            name,
            phoneNumber,
            address, 
            userId
        })

       
        revalidatePath(ROUTES.shipping)
        return {
            success: true,
            data: {shipping: JSON.parse(JSON.stringify(newShippingAddress))}
        }
        
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
}
export async function getShippingAddress(): Promise<ActionResponse<{shippingAddresses: IShipping[]}>>{
    const session = await auth()
    if(!session) redirect('/')
   try {
      await connectToDb()
      const shippingAddresses = await Shipping.find({userId: session.user.id})
      

     return {
        success: true,
        data: {shippingAddresses: JSON.parse(JSON.stringify(shippingAddresses))}
     }
   } catch (error) {
     return handleError(error) as ErrorResponse
   }
}
export async function deleteShipping(params:DeleteShippingParams): Promise<ActionResponse> {
    const validatedResult = await action({params,schema:DeleteShippingSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
     const { id } = validatedResult.params!
     const userId = validatedResult.session?.user.id!

   try {
      await connectToDb()
      const shipping = await Shipping.findById(id)
      if(!shipping) throw new Error('Shipping not found')
        await Shipping.findOneAndDelete({
          _id:id,
          userId
       })
       revalidatePath(ROUTES.shipping)
       return {
        success: true,
        message: "shipping address has been deleted successfuly"
       }

   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}
export async function editShippingAddress(params:EditShippingParams):Promise<ActionResponse<{shipping:IShipping}>> {
    const validatedResult = await action({params,schema:editShippingSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const  { id, phoneNumber, city,country, address, postalCode, name} = validatedResult.params!
   
   
  try {
    await connectToDb()
    const shipping = await Shipping.findById(id)
    if(!shipping) throw new Error('Shipping Not found')
        if(shipping.address !== address) shipping.address = address;
    if(shipping.phoneNumber !== phoneNumber) shipping.phoneNumber = phoneNumber;
    if(shipping.name !== name) shipping.name = name;
    if(shipping.city !== city) shipping.city = city;
    if(shipping.country !== country) shipping.country = country;
    if(shipping.postalCode !== postalCode) shipping.postalCode = postalCode;
    await shipping.save()
 
    return {
        success: true,
        data: {shipping: JSON.parse(JSON.stringify(shipping))},
        message: "shipping address has been updated successfuly"
    }
  } catch (error) {
     return handleError(error) as ErrorResponse;
  }
}
export async function getSingleShipping (params:GetSingleShippingParams): Promise<ActionResponse<{shipping:IShipping}>> {
    const validatedResult = await action({params,schema:GetSingleShippingSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { id } = validatedResult.params!

  try {
     const shipping = await Shipping.findById(id)
     if(!shipping) throw new Error('Shipping Address not found')
        return {
          success: true,
          data: {shipping: JSON.parse(JSON.stringify(shipping))}
       }
  } catch (error) {
     return handleError(error) as ErrorResponse;
  }
}