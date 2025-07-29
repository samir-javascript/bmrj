'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordClientSideSchema } from '@/lib/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'


import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/actions/auth.actions'
import { ROUTES } from '@/constants/routes'

const ResetAccountPassword = ({code}: {code:string}) => {
  const form = useForm<z.infer<typeof ResetPasswordClientSideSchema>>({
    resolver: zodResolver(ResetPasswordClientSideSchema),
    defaultValues: {
      password: '',
      confirmPassword: ""
    },
  })

  const isSubmitting = form.formState.isSubmitting
 
  const router = useRouter()
  const [error,setError] = useState("")
  const {toast} = useToast()
  async function onSubmit(values: z.infer<typeof ResetPasswordClientSideSchema>) {
    try {
       const {error , success } = await resetPassword({code, password: values.password})
       if(error) {
          toast({
            title: "Something went wrong!",
            description: error.message,
            variant: "destructive"
          })
          return
       }else if(success) {
           toast({
            title: "Success",
            description: "password has been reset successfuly",  
          })
          router.replace(ROUTES.signin)
          return;
       }
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 w-full flex-col gap-5">
 <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium !text-right text-black">New Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                disabled={isSubmitting}
                className="h-10 px-4 !bg-white/50 border-light_blue border-[2px] no-focus placeholder:text-gray-500 rounded-lg focus:outline-none !text-black"
                
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
<FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm !text-right font-medium text-black">Confirm New Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                disabled={isSubmitting}
                className="h-10 px-4 !bg-white/50 border-light_blue border-[2px] no-focus placeholder:text-gray-500 rounded-lg focus:outline-none !text-black"
               
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="text-white rounded-full hover:bg-light_blue"
      >
        Reset your password
      </Button>
      </form>
    
    </Form>
  )
}

export default ResetAccountPassword
