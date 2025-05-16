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
  const isSubmitting = form.formState.isSubmitting === true
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
     try {
        const { success , message, error } = await signUpWithCredentials({
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
              title: "account created successfully",
              description: message
            })
            setOpen(true)
          //  return router.push(redirect)

        }else {
          setError(error?.message)
           return  toast({
            title: "Error",
            description: error?.message,
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
              <FormLabel className="text-sm font-medium text-white">User Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your name" {...field} />
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
              <FormLabel className="text-sm font-medium text-white">Last Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your lastName" {...field} />
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
              <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} type="email" className="admin-input no-focus" placeholder="Enter your valid email address" {...field} />
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
                <Input disabled={isSubmitting} type="password" className="admin-input no-focus" placeholder="Enter a strong password please" {...field} />
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
              <FormLabel className="text-sm font-medium text-white">Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your valid phone number" {...field} />
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
              <FormLabel className="text-sm font-medium text-white">User Gender</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="what is your gender..." {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} className="bg-light_blue text-white" type="submit">
           {form.formState.isSubmitting ? "Loading" : "Sign up"} 
        </Button>
      </form>
      <div className="mt-3">
         <p className="text-[#fff] font-medium text-[15px] ">Already have an account? <span className="underline text-light_blue"><Link href={isShipping ? `${ROUTES.signin}?shipping=true` : ROUTES.signin}>LogIn</Link> </span> </p>
      </div>
    </Form>
     <AuthFormBtns />
    <OptVerification open={open} setOpen={setOpen} />
    </div>
  
  )
}

export default AuthForm