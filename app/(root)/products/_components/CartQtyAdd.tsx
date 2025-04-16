"use client"
import LoadingAppState from '@/components/Loaders/LoadingAppState'
import { Button } from '@/components/ui/button'

import { IProduct } from '@/database/models/product.model'
import { useAppDispatch } from '@/hooks/user-redux'
import { addItemAsync, open } from '@/lib/store/cartSlice'

//import {  getOrCreateGuestId, useCartStore } from '@/lib/store/cartStore'
import { Loader, Minus, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CartQtyAdd = ({item}: {
    item: IProduct
}) => {
    const [qty,setQty] = useState<number>(1)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [loading,setLoading] = useState<boolean>(false)
    // const removeItem = useCartStore((state) => state.removeItem);
   

    // const addItemLocal = useCartStore((state) => state.addItem);
    const increaseQty = ()=> {
        setQty(prev => prev + 1)
    }
    // const setGuestId = useCartStore((state) => state.setGuestId);

 
  
    const decreaseQty = ()=> {
       if(qty === 1) return;
       setQty(prev => prev - 1)
    }
    const handleAddToCart = async () => {
        setLoading(true);
        const data = {
          image: item.images[0].url,
          brand: item.brand,
          prevPrice: item.prevPrice,
          price: item.price,
          title: item.name,
          quantity: qty,
          _id: item._id,
        };
      
       
        await new Promise((resolve) => setTimeout(resolve, 1000));
      
        // Dispatch the async action correctly
       
        dispatch(addItemAsync(data) as any); // Pass `data` directly, not `{data}`
        router.refresh()
        setLoading(false);
        dispatch(open());
      };
      
    
    
  return (
    <div className='w-full flex flex-col gap-3 py-3'>
      {loading && (
          <LoadingAppState />
      )}
                  <div className="border  flex  justify-between items-center rounded-lg border-gray-300">
      <span onClick={decreaseQty} className="border-r flex items-center py-2 px-2 justify-center text-center flex-1 border-gray-300">
          <Minus size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
       <span className="flex-1 px-5 text-center py-2 font-semibold">
        {qty}
       </span>
       <span onClick={increaseQty} className="flex-1 flex py-2 px-2 items-center justify-center text-center border-l border-gray-300">
          <Plus size={18} className="text-light_blue cursor-pointer text-center" />
       </span>
 </div>
                      <Button disabled={loading}
                      onClick={() => handleAddToCart()}
                        className="rounded-2xl bg-light_blue text-white hover:bg-light_blue ">
                           Ajouter au panier
                      </Button>
                      <Button className='rounded-2xl bg-transparent border border-light_blue  text-light_blue hover:bg-transparent'>
                          Acheter maintenant
                      </Button>
                     
                   </div>
   
  )
}

export default CartQtyAdd