"use client"
// implement shadcn form and zod validation;
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editProfileSchema } from "@/lib/zod"


import { useState } from "react"
import { useRouter } from "next/navigation"

import { editProfile } from "@/actions/user.actions"
import { ROUTES } from "@/constants/routes"
import { IUser } from "@/database/models/user.model"
import SetPasswordModal from "../modals/SetPasswordModal"
import { useToast } from "@/hooks/use-toast"
import AlertMessage from "../shared/AlertMessage"

 

const EditProfileForm = ({user, canChangePasswordPromise}: {
  user: IUser;
  canChangePasswordPromise:boolean
}) => {
 
  const router = useRouter()
  const { toast } = useToast()
  const [open,setOpen] = useState<boolean>(false)
  const [error,setError] = useState<string | undefined>(undefined)
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver (editProfileSchema),
    defaultValues: {
        gender: user.gender || "male",
        email: user.email || "",
        phoneNumber:  user.phoneNumber || "",
        password:  "",
        currentPassword: "",
        confirmPassword: "",
        name: user.name || "",
        lastName: user.lastName || ""
    },
  })
 
  // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof editProfileSchema>) {
   
     
      try {
        const {error, success} =  await editProfile(values);
        if(success) {
           form.reset()
           toast({
              title: "success",
              description: "your profile has been updated successfully"
           })
          return router.push(ROUTES.userProfile)
           
        }else {
           setError(error?.message)
        }
      } catch (error) {
         console.log(error)
      }
        
   }
   
  return  (
    <div>
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 flex lg:max-w-[70%] flex-col space-y-6">
       
        {error && (
           <AlertMessage variant="destructive" message={error} />
        )}
      <FormField
  control={form.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Gender</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-row gap-4"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="male" id="male" />
            </FormControl>
            <FormLabel htmlFor="male">Male</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="female" id="female" />
            </FormControl>
            <FormLabel htmlFor="female">Female</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>

      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="input_styles no-focus" placeholder="Enter your valid email address" {...field} />
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
                <Input className="input_styles no-focus" placeholder="Enter your valid email address" {...field} />
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
                <Input className="input_styles no-focus" placeholder="Enter your valid email address" {...field} />
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
                <Input type="number" className="input_styles no-focus" placeholder="Enter Your Phone Number" {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {canChangePasswordPromise ? (
          <>
            <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" className="input_styles no-focus"  {...field} />
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
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" className="input_styles no-focus"  {...field} />
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
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" className="input_styles no-focus"  {...field} />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        </>
        ): (
       
        <div className="flex flex-col mt-4 space-y-3">
            <Button onClick={() => setOpen(true)} className="bg-gray-200 hover:bg-gray-300 lg:w-[200px] w-fit rounded-lg text-black  " type="button">
                Set Password
            </Button>
        </div>
        )}
         
         <SetPasswordModal open={open} setOpen={setOpen} email={user.email} />
         
        <Button disabled={open} className="bg-light_blue text-white" type="submit">
            {form.formState.isSubmitting ? "Loading..." : "Valider"} 
        </Button>
      </form>
    
     
    </Form>
   
    </div>
   
  )
}

export default EditProfileForm