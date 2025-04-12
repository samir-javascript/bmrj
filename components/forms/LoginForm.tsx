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
import { useRouter } from "next/navigation"
import { signInWithCredentials } from "@/actions/auth.actions"
import AuthFormBtns from "../btns/AuthFormBtns"
import { useCartStore } from "@/lib/store/cartStore"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import AlertMessage from "../shared/AlertMessage"
import { useAppDispatch } from "@/hooks/user-redux"
import { syncWithUser } from "@/lib/store/cartSlice"
 

const LoginForm = () => {
  const [open,setOpen] = useState<boolean>(false)
  const [error,setError] = useState<string | undefined>(undefined)
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
  // 2. Define a submit handler.
  useEffect(() => {
    if (session?.data?.user) { // Check if session exists
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
            return router.push("/")
 
         }else {
             setError(error?.message)
         }
      } catch (error) {
         console.log(error)
      }
        
   }
  return  (
    <div>
       {error && (
          <AlertMessage message={error} variant="destructive" />
       )}
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 flex flex-col space-y-6">
       
       
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="Enter your valid email address" {...field} />
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
        
         
        <Button className="bg-light_blue text-white" type="submit">
            {form.formState.isSubmitting ? "Loading..." : "Sign in"} 
        </Button>
      </form>
      <div className="mt-3">
         <p className="text-[#333] font-medium text-[15px] ">Don't have an account? <span className="underline text-light_blue"><Link href="/customer/account/sign-up">Sign up</Link> </span> </p>
      </div>
     
    </Form>
    <AuthFormBtns />
    <OptVerification open={open} setOpen={setOpen} />
    </div>
   
  )
}

export default LoginForm