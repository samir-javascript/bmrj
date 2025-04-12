"use client"
import { useState } from "react"
import { toggleSaveCollection } from "@/actions/collection.actions"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { AuthModal } from "../modals/AuthModal"


const HeartCart = ({hasSaved,productId}:{hasSaved:boolean,productId:string}) => {
  const [open,setOpen] = useState<boolean>(false)
  const session = useSession()
      const handleToggleSaveProduct = async()=> {
        if(session.status !== "loading" && session.status !== "authenticated") {
            setOpen(true)
            return;
        }
          try {
          const {success,data} = await toggleSaveCollection({productId})
          if(success) alert("it went throught")
            else alert('ERROR')
          } catch (error) {
             console.log(error)
          }
      }
  return (  
     <div onClick={handleToggleSaveProduct} className="absolute w-[35px] h-[35px] right-0 bottom-0 m-3 bg-white rounded-full flex items-center justify-center ">
               {hasSaved ? <img className='w-[24px] h-[24px] cursor-pointer ' src="/red-heart.png" alt="" /> :  <Heart size={24} className='text-secondary cursor-pointer' />} 
               <AuthModal open={open} setOpen={() => setOpen} />
            </div>
  )
}

export default HeartCart