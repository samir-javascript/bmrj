"use client"
// implement shadcn form and zod validation;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginValidationSchema } from "@/lib/zod"
import Link from "next/link"
import { OptVerification } from "../shared/OptVerification"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithCredentials } from "@/actions/auth.actions"
import AuthFormBtns from "../btns/AuthFormBtns"

import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import AlertMessage from "../shared/AlertMessage"
import { useAppDispatch } from "@/hooks/user-redux"
import { syncWithUser } from "@/lib/store/cartSlice"
import { ROUTES } from "@/constants/routes"
 

const LoginForm = () => {
  const [openOpt,setOpenOpt] = useState<boolean>(false)
  const [error,setError] = useState<string | undefined>(undefined)
  const [verificationError,setVerificationError] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const isShipping = searchParams.get("shipping")
  const redirect = isShipping ? "/checkout/shipping" : "/"
  const {toast} = useToast()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      
      email: "",
     
      password: ""
    },
  }) 
  
  const session = useSession()
  const isSubmitting = form.formState.isSubmitting === true
  // 2. Define a submit handler.
  useEffect(() => {
    if (session?.data?.user) { // Check if session exists
      // @ts-ignore
       dispatch(syncWithUser());
    }
}, [session, syncWithUser]); 
   async function onSubmit(values: z.infer<typeof LoginValidationSchema>) {
      try {
         const { success , error } = await signInWithCredentials({
             email: values.email,
             password: values.password
         })
         if(success) {
       
           form.reset()
            toast({
              title: "success",
              description: "you've been logged in successfuly"
            })
            return router.push(redirect)
 
         }else if(error) {
           if(error.message.includes("before logging in.")) {
               setOpenOpt(true)
               setVerificationError(error.message)
               return
           }else {
              setError(error.message)
           }
              
           }
           
          
         
      } catch (error) {
         console.log(error)
      }
        
   }
  return  (
    <div>
       {verificationError && <OptVerification open={openOpt} setOpen={setOpenOpt} />}
{error && <AlertMessage isAuth message={error} variant="destructive" />}

 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 flex flex-col space-y-6">
       
       
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
              <FormControl>
                <Input
                 className="admin-input no-focus"
                 disabled={isSubmitting}
                  placeholder="Enter your valid email address"
                   {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">Password</FormLabel>
              <FormControl>
                <Input type="password"
                 className="admin-input no-focus"
                 disabled={isSubmitting}
                  placeholder="Enter a strong password please" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
         
        <Button disabled={isSubmitting} className="bg-light_blue text-white" type="submit">
            {isSubmitting ? "Loading..." : "Sign in"} 
        </Button>
      </form>
      <div className="mt-3">
         <p className="text-[#fff] font-medium text-[15px] ">Don't have an account? <span className="underline text-light_blue"><Link href={isShipping ? `${ROUTES.signup}?shipping=true` : ROUTES.signup}>Sign up</Link> </span> </p>
      </div>
     
    </Form>
    <AuthFormBtns />
  
    </div>
   
  )
}

export default LoginForm