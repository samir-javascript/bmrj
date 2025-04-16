"use client"
import LoadingAppState from '@/components/Loaders/LoadingAppState'
import { Button } from '@/components/ui/button'
import { IProduct } from '@/database/models/product.model'
import { useAppDispatch, useAppSelector } from '@/hooks/user-redux'
import { open } from '@/lib/store/cartSlice'
import { Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CartQtyMobile = ({product}:  {
     product: IProduct
}) => {
    const [qty,setQty] = useState<number>(1)
    const router = useRouter()
        const dispatch = useAppDispatch()
        const [loading,setLoading] = useState<boolean>(false)
     const { isOpen } = useAppSelector((state) => state.cart)
        console.log(isOpen, "isOpen boolean")
        const increaseQty = ()=> {
            setQty(prev => prev + 1)
        }
       
    
     
      
        const decreaseQty = ()=> {
           if(qty === 1) return;
           setQty(prev => prev - 1)
        }
        const handleAddToCart = async () => {
            setLoading(true);
            const data = {
              image: product.images[0].url,
              brand: product.brand,
              prevPrice: product.prevPrice,
              price: product.price,
              title: product.name,
              quantity: qty,
              _id: product._id,
            };
          
           
            await new Promise((resolve) => setTimeout(resolve, 1000));
          
            // Dispatch the async action correctly
            // @ts-ignore
            dispatch(addItemAsync(data)); // Pass `data` directly, not `{data}`
          
            setLoading(false);
            router.refresh()
            dispatch(open());
          };
          
  return (
    <div className={`lg:hidden flex p-3 items-center gap-2 shadow-xl  bg-white z-50 fixed bottom-0 w-full ${isOpen && "z-[1]"}`}>
          {loading && (
          <LoadingAppState />
      )}
               <div className="border  flex  justify-between items-center rounded-lg border-gray-300">
      <span className="border-r flex items-center py-2 px-2 justify-center text-center flex-1 border-gray-300">
          <Minus onClick={decreaseQty} size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
       <span className="flex-1 px-5 text-center py-2 font-semibold">
          {qty}
       </span>
       <span onClick={increaseQty} className="flex-1 flex py-2 px-2 items-center justify-center text-center border-l border-gray-300">
          <Plus size={18} className="text-light_blue cursor-pointer text-center" />
       </span>
 </div>
 <Button 
 disabled={loading}
  onClick={() => handleAddToCart()}
 className="w-full flex-1 bg-light_blue hover:bg-light_blue text-white rounded-xl" type='button'>
      Ajouter au panier
 </Button>
        </div>
  )
}

export default CartQtyMobile