"use client"
import { Button } from "@/components/ui/button"

import {
  InputOTP,
  InputOTPGroup,
 
  InputOTPSlot,
} from "@/components/ui/input-otp"
 
import {
  Dialog,
  DialogContent,
 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog"

import { Loader, RotateCw, X } from "lucide-react";
import { useState } from "react";
import { VerifyEmail } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";



export function OptVerification({open,setOpen}: {

     open:boolean;
    
     setOpen: (value:boolean)=> void,
}) {
  const router = useRouter()
  const [value,setValue] = useState("")
  console.log(value, "input values here")
  const handleOtpChange = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setValue(numericValue);
  };
  const [isLoading,setLoading] = useState<boolean>(false)
  const handleEmailVerification = async()=> {
    setLoading(true)
      try {
         const { success } =  await VerifyEmail({token: value})
         if(!success) throw new Error('Email verification failed')
          setOpen(false)
        setValue("")
        alert('you made it')
       
        setLoading(false)
        router.push("/")
      } catch (error) {
         console.log(error)
      }finally{
         setLoading(false)}
      
  }
  return (
    <Dialog open={open} onOpenChange={()=> setOpen(false)} >
     
      <DialogContent className="bg-white p-0 no-focus sm:max-w-[425px]">
       
       
         <div className="flex items-center p-5 justify-center">
             <img className="invert-[100%]" src="https://www.marjanemall.ma/static/version1739434205/frontend/Marjane/default/fr_FR/images/marjane-logo.svg" alt="" />
         </div>
         <DialogHeader className="mt-5">
              <DialogTitle className="text-center text-sm text-gray-600 font-semibold ">Renseignez le code que vous avez reçu par email</DialogTitle>
         </DialogHeader>
         <div className="flex justify-center">
  <InputOTP  className="flex items-center justify-center" value={value} onChange={handleOtpChange} maxLength={4}>
    <InputOTPGroup>
      <InputOTPSlot  className="mx-1 rounded-lg border border-gray-300 w-[60px] text-[20px] font-medium h-[60px] " index={0} />
      <InputOTPSlot  className="mx-1 rounded-lg border border-gray-300 w-[60px] text-[20px] font-medium h-[60px] " index={1} />
    </InputOTPGroup>

    <InputOTPGroup>
      <InputOTPSlot className="mx-1 rounded-lg border border-gray-300 w-[60px] text-[20px] font-medium h-[60px] " index={2} />
      <InputOTPSlot  className="mx-1 rounded-lg border border-gray-300 w-[60px] text-[20px] font-medium h-[60px] " index={3} />
    </InputOTPGroup>
  </InputOTP>
</div>

     <button type="button" className="flex w-fit mx-auto items-center gap-2 group justify-center ">
        <p className="text-center font-medium text-light_blue group-hover:underline text-[16px] ">Renvoyer le code  </p>
        <RotateCw size={16} className="text-light_blue cursor-pointer" />
     </button>
     <DialogFooter className="border-t w-full  border-gray-200">
           <div className="flex flex-col p-5 justify-center w-full gap-3">
              <Button onClick={handleEmailVerification} className="w-full text-white bg-light_blue rounded-xl" type="button">
                {isLoading ? "Loading..." : "Valider"}  
              </Button>
              <Button className=" text-[#333] text-[16px] underline font-semibold hover:bg-transparent bg-transparent " type="button">
                  Change Email address
              </Button>
           </div>
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )
}
