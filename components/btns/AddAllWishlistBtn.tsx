"use client"
import { useAppDispatch } from '@/hooks/user-redux'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CollectionElement } from '@/types/Elements'
import { addWishlistToCart } from '@/lib/store/cartSlice'
import LoadingAppState from '../Loaders/LoadingAppState'
import { useToast } from '@/hooks/use-toast'
import { removeAllWishlistItems } from '@/actions/collection.actions'


const AddAllWishlistBtn = ({items,userId}: {
     items: CollectionElement[]
     userId:string
}) => {
    // Explicitly type dispatch to accept thunks
    const dispatch = useAppDispatch()
    const {toast} = useToast()
  
    const [loading,setLoading] = useState(false)
    const handleAddWishlistItemsToCart = async()=> {
        setLoading(true)
        try {
            // @ts-ignore
          dispatch(addWishlistToCart(items));
         // await new Promise((resolve)=> setTimeout(resolve, 3000) )
          const { success, error } = await removeAllWishlistItems({userId})
          if(error) {
             return  toast({
              title: "An Error occured",
              description: error.message,
              variant: "destructive"
             })
          }else if(success) {
           return  toast({
             title: "Success",
             description: "your wishlist items have been added to your cart"
          })
          }
       
        

       
        } catch (error) {
             console.log(error)
        }finally {
            setLoading(false)
        }
    }
  return (
    <>
    {loading && (
         <LoadingAppState />
    )}
    
        <Button
      type='button'

      className='rounded-2xl max-sm:text-xs bg-light_blue text-white hover:bg-light_blue '
      onClick={handleAddWishlistItemsToCart}
    >
      Ajouter tous les produits au panier
    </Button>
    </>
    
  )
}

export default AddAllWishlistBtn