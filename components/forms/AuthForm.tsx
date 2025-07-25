
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
import { signUpWithCredentials, VerifyEmail } from "@/actions/auth.actions"
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
      gender: undefined,
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
  const [value,setValue] = useState("")
  const [isLoading, setLoading] = useState(false);
const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const { success, error } = await VerifyEmail({ token: value });
      if (error) {
        setError(error.message);
        alert(error.message)
        return;
      }
      if (success) {
        toast({ title: "Succès", description: "Email vérifié avec succès." });
        setOpenOpt(false);
        setValue("");
        router.push(ROUTES.signin);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
                        className="admin-input !text-black no-focus"
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
          
        </div>
      </div>
 <div className="flex items-center gap-2 my-5">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-xs text-white/60">or</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>
      <AuthFormBtns />
      <OptVerification
       value={value}
       isLoading={isLoading}
       setValue={setValue}
       handleSubmit={handleEmailVerification}
       open={openOpt}
       setOpen={setOpenOpt} />
 </>
  )
}

export default AuthForm

// 15 23 42