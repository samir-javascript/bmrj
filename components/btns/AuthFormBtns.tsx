"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
const AuthFormBtns = () => {
   const searchParams = useSearchParams()
   const route = searchParams.get("shipping")
   const navigate = route ? "/checkout/shipping" : "/"
     const className="px-4 py-3.5 rounded-2xl flex-1 bg-[#212734]  text-white body-medium  min-h-12";
    const handleSignIn = async(provider:"google" | "github")=> {
      try {
         await signIn(provider, {redirect: false, redirectTo: navigate})
      } catch (error) {
         console.log(error)
      }
    }
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2.5">
         <Button  onClick={() => handleSignIn("google")} className={className}>
             <Image width={20} height={20} src="/google.svg"
             className="invert-colors mr-2.5 object-contain"
             alt="google" />
             <span>Log In with Google</span>
         </Button>
         <Button  onClick={() => handleSignIn("github")} className={className}> 
             <Image width={20} height={20} src="/github.png" alt="github"
             className="invert-colors mr-2.5 object-contain"
             />
              <span>Log In with Github</span>
         </Button>
    </div>
  )
}

export default AuthFormBtns