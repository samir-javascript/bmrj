"use client"
// implement shadcn form and zod validation;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginValidationSchema, SignUpValidationSchema } from "@/lib/zod"
import Link from "next/link"
 

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      
      email: "",
     
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return  (
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
                <Input className="input_styles no-focus" placeholder="Enter a strong password please" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        
         
        <Button className="bg-light_blue text-white" type="submit">
           Sign in
        </Button>
      </form>
      <div>
         <p className="text-[#333] font-medium text-[15px] ">Don't have an account? <span className="underline text-light_blue"><Link href="/customer/account/sign-up">Sign up</Link> </span> </p>
      </div>
    </Form>
  )
}

export default LoginForm