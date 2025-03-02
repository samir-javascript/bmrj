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
import { SignUpValidationSchema } from "@/lib/zod"
import Link from "next/link"
import { SignUpAction } from "@/actions/user.actions"
 

const AuthForm = () => {
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
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
     try {
       const result = await SignUpAction({
         name: values.name,
         lastName: values.lastName,
         email: values.email,
         phoneNumber: values.phoneNumber,
         password: values.password,
         gender: values.gender
       })
       if(!result.success) {
          // toast task
         console.log(result.error, "error here")
       }
       form.reset()
     } catch (error) {
        console.log(error)
     }
  }
  return  (
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
      <div>
         <p className="text-[#333] font-medium text-[15px] ">Already have an account? <span className="underline text-light_blue"><Link href="/customer/account/login">LogIn</Link> </span> </p>
      </div>
    </Form>
  )
}

export default AuthForm