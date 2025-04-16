"use client"
import { useState } from "react"
import { toggleSaveCollection } from "@/actions/collection.actions"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { AuthModal } from "../modals/AuthModal"
import { useToast } from "@/hooks/use-toast"
import LoadingAppState from "../Loaders/LoadingAppState"


const HeartCart = ({hasSaved,productId}:{hasSaved:boolean,productId:string}) => {
  const [open,setOpen] = useState<boolean>(false)
  const [loading,setLoading] = useState(false)
  const session = useSession()
  const {toast} = useToast()
      const handleToggleSaveProduct = async()=> {
        if(session.status !== "loading" && session.status !== "authenticated") {
            setOpen(true)
            return;
        }
        setLoading(true)
          try {
          const {success,error} = await toggleSaveCollection({productId})
          if(success) {
            return toast({
                 title: "success",
                 description: `${hasSaved ? "product has been added to your wishlist" : "product has been removed from your wishlist"}`
               })
            
          }
            else  {
            return toast({
                title: "Error",
                description: error?.message,
                variant: "destructive"
             })
           
            }
          } catch (error) {
             console.log(error)
          }finally {
            setLoading(false)
          }
      }
  return (  
     <div onClick={handleToggleSaveProduct} className="absolute w-[35px] h-[35px]
      right-0 bottom-0 m-3 bg-white rounded-full flex items-center justify-center ">
         {loading  && (
          <LoadingAppState />
         )}
               {hasSaved === true ? <img className='w-[24px] h-[24px] cursor-pointer ' src="/red-heart.png" alt="" /> :  <Heart size={24} className='text-secondary cursor-pointer' />} 
               <AuthModal open={open} setOpen={() => setOpen} />
            </div>
  )
}

export default HeartCart