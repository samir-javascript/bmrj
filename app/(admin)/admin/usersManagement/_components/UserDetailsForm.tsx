"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editProfileSchema, UpdateUserDetailsSchema } from "@/lib/zod"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { deleteUser, editProfile, editUserProfileByAdmin } from "@/actions/user.actions"
import { ROUTES } from "@/constants/routes"
import { IUser } from "@/database/models/user.model"

import { useToast } from "@/hooks/use-toast"
import SetPasswordModal from "@/components/modals/SetPasswordModal"
import AlertMessage from "@/components/shared/AlertMessage"
import { Loader, Save, TrashIcon } from "lucide-react"
import ConfirmModal from "@/components/modals/ConfirmModal"
import { useCellValues } from "@mdxeditor/editor"
import { IUserWithShipping } from "@/types/action"
import Alert from "@/components/shared/Alert"

const UserDetailsForm = ({
  userWithShipping,
  id
}: {
  userWithShipping: IUserWithShipping
  id:string
 
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const [openConfirmModal,setOpenConfirmModel] = useState(false)
  const [pending,setPending] = useState<boolean>(false)
 
  const [error, setError] = useState<string | undefined>(undefined)
   const [err, setErr] = useState<string | undefined>(undefined)
   
  const form = useForm<z.infer<typeof UpdateUserDetailsSchema>>({
    resolver: zodResolver(UpdateUserDetailsSchema),
    defaultValues: {
      gender: userWithShipping?.user.gender || "male",
      email: userWithShipping?.user.email || "",
      phoneNumber: userWithShipping?.user.phoneNumber || "",
      isAdmin: userWithShipping?.user.isAdmin,
      userId: id,
      firstName: userWithShipping?.user.name || "",
      lastName: userWithShipping?.user.lastName || "",
      address: userWithShipping?.shippingAddresses[0]?.address || "",
      postalCode: userWithShipping?.shippingAddresses[0]?.postalCode || "",
      city: userWithShipping?.shippingAddresses[0]?.city ||  "",
      country: userWithShipping?.shippingAddresses[0]?.country || ""
    },
  })
 const formLoading = form.formState.isSubmitting === true
  const onSubmit = async (values: z.infer<typeof UpdateUserDetailsSchema>) => {
  
     try {
        const { error, success , message} = await editUserProfileByAdmin({
           userId: id ,
           firstName: values.firstName,
           lastName: values.lastName,
           isAdmin: values.isAdmin,
           email: values.email,
           phoneNumber: values.phoneNumber as string,
           gender: values.gender,
           address: values.address,
           city: values.city,
           country: values.country,
           postalCode: values.postalCode,
           
        })
        if(error) {
           setErr(error.message)
           return
        }else if(success) {
           return toast({
             title: "Success",
             description: "profile has been updated"
           })
        }
     } catch (error) {
       console.log(error)
     }
  }
  const handleDeleteUser = async()=> {
    setPending(true)
     try {
        const { error, success, message} = await deleteUser({userId: userWithShipping.user._id})
        if(error) {
          setError(error.message)
           return toast({
             title: "Error occured",
             description: error.message,
             variant: "destructive"
           })
        }else if(success) {
          toast({
            title: "Success",
            description: message,
          })
          setOpenConfirmModel(false)
          router.push(ROUTES.adminUsersList)
          return
        }
     } catch (error) {
        console.log(error)
     }finally {
        setPending(false)
     }
  }
  console.log(form.formState.errors,  "errors")
  console.log(form.watch(), "watch")
  return (
    <div className="w-full">
       {err && (
         <div className="my-5">
            <Alert message={err} />
         </div>
       )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-7 flex w-full flex-col space-y-6"
        >
          {error && (
            <AlertMessage variant="destructive" message={error} />
          )}

          <div className="flex items-center !w-full gap-2 max-lg:flex-wrap">
            <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-200 font-medium "
                    >Gender</FormLabel>
                    <Select
                     disabled={formLoading}
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="no-focus bg-[rgb(46,46,46)] w-full rounded-lg font-medium text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm ">First Name</FormLabel>
                    <FormControl>
                      <Input
                       disabled={formLoading}
                        className="admin-input no-focus w-full"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 text-sm font-medium">Last Name</FormLabel>
                    <FormControl>
                      <Input
                       disabled={formLoading}
                        className="admin-input no-focus w-full"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center w-full gap-2 flex-wrap">
            <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm ">Email Address</FormLabel>
                    <FormControl>
                      <Input
                       disabled={formLoading}
                        className="admin-input !bg-[(rgb(46,46,46))] no-focus w-full flex-1"
                        placeholder="Enter your valid email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div  className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
       <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 font-medium text-sm">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                     disabled={formLoading}
                    className="admin-input  no-focus"
                    placeholder="Enter Your Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
       </div>
            <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
            <FormField
  control={form.control}
  name="isAdmin"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-200">isAdmin</FormLabel>
      <Select
       disabled={formLoading}
        onValueChange={(value) => field.onChange(value === "true")}
        defaultValue={String(field.value)}
      >
        <FormControl>
          <SelectTrigger  disabled={formLoading} className="no-focus flex-1 w-full bg-[rgb(46,46,46)] rounded-lg font-medium text-white">
            <SelectValue placeholder="is Admin" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-white">
          <SelectItem value="true" className="hover:bg-blue-800 hover:text-white text-sm">
            Yes
          </SelectItem>
          <SelectItem value="false" className="hover:bg-blue-800 hover:text-white text-sm">
            No
          </SelectItem>
        </SelectContent>
      </Select>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>

            </div>
          </div>
 
        <>
        <h3 className="text-white font-medium text-[18px] tracking-wide ">Address</h3>
        <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm">Address</FormLabel>
                    <FormControl>
                      <Input
                       disabled={formLoading}
                        type="text"
                        className="admin-input lg:w-[70%] no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex lg:w-[70%] items-center gap-2 flex-wrap">
                 <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
                 <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm">City</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                         disabled={formLoading}
                        className="admin-input  no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
                 </div>
                 <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
                 <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm">Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                         disabled={formLoading}
                        className="admin-input no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
                 </div>
                 <div className="flex-1 min-w-full lg:min-w-[calc(33.33%-0.5rem)]">
                 <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-medium text-sm">Country</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                         disabled={formLoading}
                        className="admin-input  no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
                 </div>

              </div>
        </>
        

          {/* <SetPasswordModal open={open} setOpen={setOpen} email={userWithShipping.user.email} /> */}
    <div className="w-full p-4 bg-[#333] flex  rounded-lg items-center justify-between ">
         <Button disabled={open || formLoading} className="bg-light_blue text-white" type="submit">
            {formLoading ? "Loading..." : <><Save /> Save</>}
          </Button>
          <Button onClick={() => setOpenConfirmModel(true)} disabled={open || pending || formLoading} className="bg-red-500 max-sm:bg-transparent
           max-sm:w-fit max-sm:hover:bg-transparent hover:bg-red-600 text-white" type="button">
            
               <>
                  <TrashIcon className="max-sm:text-red-500 cursor-pointer max-sm:text-[25px] " /> <span className="max-sm:hidden">DELETE</span>
               </>
            
          </Button>
    </div>
         
        </form>
      </Form>
      <ConfirmModal message="Are you sure you want to delete this user ?" handleClick={handleDeleteUser} error={error} 
        loading={pending} open={openConfirmModal} setOpen={setOpenConfirmModel} />
    </div>
  )
}

export default UserDetailsForm
