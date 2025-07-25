"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendResetPasswordSchema } from '@/lib/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

const ResetPasswordForm = () => {
     const form = useForm<z.infer<typeof SendResetPasswordSchema>>({
        resolver: zodResolver(SendResetPasswordSchema),
        defaultValues: {
          email: "",
        },
      })
       const isSubmitting = form.formState.isSubmitting === true
        async function onSubmit(values: z.infer<typeof SendResetPasswordSchema>) {
           try {
             
           } catch (error) {
             console.log(error)
           }
         }
  return (
      <Form  {...form}
          
          className='flex flex-1 w-full flex-col gap-5'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-1 w-full flex-col gap-5'>
                 <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-white">Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    disabled={isSubmitting}
                                    className='h-10 px-4 !bg-white/50 border-light_blue border-[2px] no-focus  placeholder:text-gray-500  rounded-lg focus:outline-none    !text-black'
                                    placeholder="Enter your valid email address"
                                    {...field}
                                    name="email"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                
                
                  <Button
                   type="submit"
                   className="text-white rounded-full hover:bg-light_blue ">
                     Reset your password
                  </Button>
            </form>
                  
              </Form>
  )
}

export default ResetPasswordForm