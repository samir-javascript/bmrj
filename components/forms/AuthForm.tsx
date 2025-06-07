// "use client"
// // implement shadcn form and zod validation;
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// import Link from "next/link"

// import { SignUpValidationSchema } from "@/lib/zod"
// import { useRouter, useSearchParams } from "next/navigation"
// import { signUpWithCredentials } from "@/actions/auth.actions"
// import { useEffect, useState } from "react"
// import { OptVerification } from "../shared/OptVerification"
// import AuthFormBtns from "../btns/AuthFormBtns"

// import { useSession } from "next-auth/react"
// import { useToast } from "@/hooks/use-toast"
// import AlertMessage from "../shared/AlertMessage"
// import { useAppDispatch } from "@/hooks/user-redux"
// import { syncWithUser } from "@/lib/store/cartSlice"
// import { ROUTES } from "@/constants/routes"


// const AuthForm = () => {
//   const [openOpt,setOpenOpt] = useState<boolean>(false)
 
//   const [error,setError] = useState<string | undefined>(undefined)
//   const searchParams = useSearchParams()
//   const isShipping = searchParams.get("shipping")
//   const redirect = isShipping ? "/checkout/shipping" : "/"
//   const {toast} = useToast()
//   const form = useForm<z.infer<typeof SignUpValidationSchema>>({
//     resolver: zodResolver(SignUpValidationSchema),
//     defaultValues: {
//       name: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       gender: "male",
//       password: ""
//     },
//   })
//   const router = useRouter()

  
 
//   const session = useSession()
//   const dispatch = useAppDispatch()
//   const isSubmitting = form.formState.isSubmitting === true
//   async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
//      try {
//         const { success , message, error } = await signUpWithCredentials({
//            gender: values.gender,
//            email: values.email,
//            password: values.password,
//            phoneNumber: values.phoneNumber,
//            name: values.name,
//            lastName: values.lastName
//         })
//         if(success) {
//          setOpenOpt(true)
//           form.reset()
          
//           toast({
//               title: "account created successfully",
//               description: message
//             })
           
//           //  return router.push(redirect)
//              return
//         }else {
//           setError(error?.message)
//            return  toast({
//             title: "Error",
//             description: error?.message,
//             variant: "destructive"
//           })
//         }
//      } catch (error) {
//         console.log(error)
//      }
       
//   }
//   return  (
//     <div>
//        {error && (
//           <AlertMessage isAuth message={error} variant="destructive"  />
//        )}
//   <Form {...form}>

//       <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 flex flex-col space-y-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">User Name</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your name" {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="lastName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">Last Name</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your lastName" {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} type="email" className="admin-input no-focus"
//                  placeholder="Enter your valid email address" {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">Password</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} type="password" className="admin-input no-focus" placeholder="Enter a strong password please" {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">Phone Number</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="Enter your valid phone number" {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//          <FormField
//           control={form.control}
//           name="gender"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-sm font-medium text-white">User Gender</FormLabel>
//               <FormControl>
//                 <Input disabled={isSubmitting} className="admin-input no-focus" placeholder="what is your gender..." {...field} />
//               </FormControl>
              
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//         <Button disabled={isSubmitting} className="bg-light_blue text-white" type="submit">
//            {form.formState.isSubmitting ? "Loading" : "Sign up"} 
//         </Button>
//       </form>
//       <div className="my-5">
//          <p className="text-sm font-normal text-gray-100 ">By creating an account, you agree to Marjanemall's Conditions of Use and Privacy Notice.</p>
//       </div>
//       <div className="mt-3 flex items-center justify-between">
//          <p className="text-[#fff] font-medium text-[15px] ">Already have an account? <span className="underline text-light_blue"><Link href={isShipping ? `${ROUTES.signin}?shipping=true` : ROUTES.signin}>LogIn</Link> </span> </p>
//           <p className="text-[#fff] font-medium text-[15px] ">Forgot password? <span className="underline text-light_blue"><Link href={"/forgot-password"}>Reset</Link> </span> </p>
//       </div>
//     </Form>
//      <AuthFormBtns />
//     <OptVerification open={openOpt} setOpen={setOpenOpt} />
//     </div>
  
//   )
// }

// export default AuthForm
"use client"

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
import { ROUTES } from "@/constants/routes"

const AuthForm = () => {
  const [openOpt, setOpenOpt] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const searchParams = useSearchParams()
  const isShipping = searchParams.get("shipping")
  const redirect = isShipping ? "/checkout/shipping" : "/"

  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const session = useSession()
  const router = useRouter()

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

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
    try {
      const { success, message, error } = await signUpWithCredentials(values)
      if (success) {
        setOpenOpt(true)
        form.reset()
        toast({ title: "Account created", description: message })
        return
      } else {
        setError(error?.message)
        return toast({
          title: "Error",
          description: error?.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="w-full max-w-md mx-auto mt-10 px-6 py-8 bg-white/5 rounded-2xl shadow-lg backdrop-blur-sm border border-white/10">
        {error && (
          <AlertMessage isAuth message={error} variant="destructive" />
        )}

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create your account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {["name", "lastName", "email", "password", "phoneNumber", "gender"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof SignUpValidationSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white capitalize">
                      {fieldName === "phoneNumber" ? "Phone Number" : fieldName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={fieldName === "password" ? "password" : "text"}
                        placeholder={`Enter your ${fieldName}`}
                        disabled={isSubmitting}
                        className="admin-input no-focus"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-light_blue text-white hover:bg-blue-600 transition"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-center my-5 text-gray-100 dark:text-gray-400">
          By creating an account, you agree to Marjanemall's{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="text-sm text-center text-white  space-y-2">
          <p>
            Already have an account?{" "}
            <Link
              href={isShipping ? `${ROUTES.signin}?shipping=true` : ROUTES.signin}
              className="text-light_blue underline"
            >
              Log in
            </Link>
          </p>
          <p>
            Forgot password?{" "}
            <Link href="/forgot-password" className="text-light_blue underline">
              Reset
            </Link>
          </p>
        </div>
      </div>
 <div className="flex items-center gap-2 my-5">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-xs text-white/60">or</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>
      <AuthFormBtns />
      <OptVerification open={openOpt} setOpen={setOpenOpt} />
    </div>
  )
}

export default AuthForm

// 15 23 42