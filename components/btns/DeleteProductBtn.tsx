"use client"
import { createProduct, deleteProduct } from '@/actions/product.actions'
import { TrashIcon } from 'lucide-react'
import React, { useActionState }  from 'react'
// TODOS: 
// email verification
// upload image
// protect admin routes
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const DeleteProductBtn = ({productId}: {productId:string}) => {
  const initialState = {
     success: false,
     message: ""
  }
  const [state, formAction,isPending] = useActionState(deleteProduct,initialState);
  console.log(state.message, "state MESSAGE HERE")
  return (
    <form action={formAction}>
    <input type="hidden" name="productId" value={productId} />
  
    <button disabled={isPending} type="submit">
      <TrashIcon className={`${isPending && "opacity-50"}`} color="red" />
    </button>
  
    {/* Success message */}
    {state.success && (
      <Alert variant="default" className="bg-green-500 text-white">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{state.message || "Product has been deleted successfuly"}</AlertDescription>
      </Alert>
    )}
  
    {/* Error message */}
    {!state.success && state.message &&  (
      <Alert variant="destructive" className="bg-red-500 text-white">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{state.message || "Failed to delete Product"}</AlertDescription>
      </Alert>
    )}
    {/* <form action={async(formData)=> {
        await createProduct(formData)
    }}>
       <input name="address" type="text" />
       <input name='country' type="text" />
       <input name="postalCode" type="text" />
       <input name='city' type="text" />
       <button type="submit">submit</button>
    </form> */}
  </form>
  
  )
}

export default DeleteProductBtn
