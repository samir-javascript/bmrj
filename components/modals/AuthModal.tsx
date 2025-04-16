"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"

import { Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
interface Props  {
    open:boolean;
    setOpen: (open: boolean)=> void;
   
}
export function AuthModal({open,setOpen}:Props) {
  return (
    <Dialog open={open}   onOpenChange={()=> setOpen(false)}>
     
      <DialogContent className="sm:max-w-[425px] bg-white  flex flex-col space-y-2 items-center justify-center text-center">
        <DialogHeader>
          <DialogTitle></DialogTitle>
            <div className="border-2 text-light_blue rounded-full mx-auto flex items-center justify-center w-[70px] h-[70px]  ">
                 <User size={28} className="text-light_blue" />
            </div>
            <DialogDescription className="font-bold text-[#222] text-[18px] text-center ">Connectez-vous ou créez votre compte en toute simplicité!</DialogDescription>
        </DialogHeader>
         <Button onClick={() => {
           signIn("google", {redirect:false})
          
         }} className="flex no-focus hover:bg-transparent group w-[90%]
          items-center bg-transparent justify-center rounded-xl border-2 border-gray-300 px-3 py-2.5 h-[50px] ">
               <Image src="/google.svg" alt="Google" width={35} height={35} />
               <p className="group-hover:underline text-gray-600">Countinue with Google</p>
         </Button>
         <div>
         <div className="mb-3">
             <span className="font-normal text-normal text-[#111] ">OR</span>
         </div>
         <Button className="text-white bg-light_blue h-[45px] !w-full rounded-2xl">
         <Mail size={30} />
           <p className="text-[15px] font-medium ">Use your Email Address</p> 
         </Button>
         </div>
       
      </DialogContent>
    </Dialog>
  )
}
