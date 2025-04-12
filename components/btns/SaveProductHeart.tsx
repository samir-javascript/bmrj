"use client"

import { toggleSaveCollection } from "@/actions/collection.actions";

import { Heart } from "lucide-react"
import { useSession } from "next-auth/react";
import { startTransition, use, useOptimistic, useState } from "react";
import { AuthModal } from "../modals/AuthModal";
import useMobile from "@/hooks/use-mobile";

import { useToast } from "@/hooks/use-toast";

const SaveProductHeart = ({className,productId,hasSavedProductPromise}: {
    className?:string;
    
    productId:string
    hasSavedProductPromise: ActionResponse<{saved:boolean}>
}) => {
   const [optimisticSaved, toggleOptimisticSaved] = useOptimistic(
      hasSavedProductPromise.data?.saved ?? false,
      (state, newSavedState: boolean) => newSavedState
    )
    
    const [open,setOpen] = useState<boolean>(false)
    const isMobile = useMobile()
   
    const session = useSession()
    const {toast} = useToast()
   //  const handleToggleSaveProduct = async()=> {
   //    if(session.status !== "loading" && session.status !== "authenticated") {
   //        setOpen(true)
   //        return;
   //    }
   //    setLoading(true)
   //      try {
   //      const {success,error} = await toggleSaveCollection({productId})
   //      if(success)  {
   //         return toast({
   //          title: "success",
   //          description: hasSavedProductPromise.data?.saved  ? "item has been removed from your wishlist" : "item has been added to your wishlist"
   //         })
   //      }
   //        else  return toast({
   //          title: "Error",
   //          description:  error?.message,
   //          variant: "destructive"
   //         })
   //      } catch (error) {
   //         console.log(error)
   //      }finally {
   //         setLoading(false)
   //      }
   //  }
   const handleToggleSaveProduct = async () => {
      if (session.status !== "loading" && session.status !== "authenticated") {
        setOpen(true)
        return
      }
    
      // ✅ Optimistically update in a transition
      startTransition(() => {
        toggleOptimisticSaved(!optimisticSaved)
      })
    
     
    
      try {
        const { success, error } = await toggleSaveCollection({ productId })
    
        if (success) {
         //  toast({
         //    title: "Success",
         //    description: optimisticSaved
         //      ? "Item has been removed from your wishlist"
         //      : "Item has been added to your wishlist",
         //  })
        } else {
          toast({
            title: "Error",
            description: error?.message,
            variant: "destructive",
          })
    
          // ⛔ Revert if failed
          startTransition(() => {
            toggleOptimisticSaved(optimisticSaved)
          })
        }
      } catch (error) {
        console.error(error)
        startTransition(() => {
          toggleOptimisticSaved(optimisticSaved)
        })
      }
    }
    
    console.log(hasSavedProductPromise, "over here")
  return (
    <div onClick={handleToggleSaveProduct} className={`rounded-full ${isMobile ? "hidden" : "flex"}  w-[45px] h-[45px] bg-gray-100  items-center justify-center ${className}`}>
                  {optimisticSaved ? (
  <img className="w-[30px] cursor-pointer object-contain" src="/red-heart.png" />
) : (
  <Heart className="object-contain cursor-pointer" color="black" />
)}

                    <AuthModal open={open} setOpen={setOpen} />
                    </div> 
  )
}

export default SaveProductHeart