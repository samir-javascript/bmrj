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

import Link from "next/link"

import { SignUpValidationSchema } from "@/lib/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signUpWithCredentials } from "@/actions/auth.actions"
import { useEffect, useState } from "react"
import { OptVerification } from "../shared/OptVerification"
import AuthFormBtns from "../btns/AuthFormBtns"

import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import AlertMessage from "../shared/AlertMessage"
import { useAppDispatch } from "@/hooks/user-redux"
import { syncWithUser } from "@/lib/store/cartSlice"
import { ROUTES } from "@/constants/routes"


const AuthForm = () => {
  const [open,setOpen] = useState<boolean>(false)
 
  const [error,setError] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const isShipping = searchParams.get("shipping")
  const redirect = isShipping ? "/checkout/shipping" : "/"
  const {toast} = useToast()
  const form = useForm<z.infer<typeof SignUpValidationSchema>>({
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "male",
      password: ""
    },
  })
  const router = useRouter()

  
 
  const session = useSession()
  const dispatch = useAppDispatch()
    // 2. Define a submit handler.
  //   useEffect(() => {
  //     if (session?.data?.user) { // Check if session exists
  //         dispatch(syncWithUser());
         
  //     }
  // }, [session, syncWithUser]); 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
     try {
        const { success , data, error } = await signUpWithCredentials({
           gender: values.gender,
           email: values.email,
           password: values.password,
           phoneNumber: values.phoneNumber,
           name: values.name,
           lastName: values.lastName
        })
        if(success) {
         
          form.reset()
            toast({
              title: "success",
              description: "you've have been signed in successfully"
            })
           return router.push(redirect)

        }else {
          setError(error?.message)
           return  toast({
            title: "Error",
            description: "Failed to log you in! try again.",
            variant: "destructive"
          })
        }
     } catch (error) {
        console.log(error)
     }
       
  }
  return  (
    <div>
       {error && (
          <AlertMessage message={error} variant="destructive"  />
       )}
  <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="Enter your name" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="Enter your lastName" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" className="input_styles no-focus" placeholder="Enter your valid email address" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="input_styles no-focus" placeholder="Enter a strong password please" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="Enter your valid phone number" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Gender</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="what is your gender..." {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button className="bg-light_blue text-white" type="submit">
           {form.formState.isSubmitting ? "Loading" : "Sign up"} 
        </Button>
      </form>
      <div className="mt-3">
         <p className="text-[#333] font-medium text-[15px] ">Already have an account? <span className="underline text-light_blue"><Link href={isShipping ? `${ROUTES.signin}?shipping=true` : ROUTES.signin}>LogIn</Link> </span> </p>
      </div>
    </Form>
     <AuthFormBtns />
    <OptVerification open={open} setOpen={setOpen} />
    </div>
  
  )
}

export default AuthForm