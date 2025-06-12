"use client"
import { X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
 
} from "../ui/alert-dialog" 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { IProduct } from "@/database/models/product.model"
import { useState, useActionState, useEffect } from "react"
import { addProductReview } from "@/actions/product.actions"
import { useSession } from "next-auth/react"
import { ReviewSchemaValidation } from "@/lib/zod"
import { Textarea } from "../ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Props  {
 open:boolean;
 setOpen: (v:boolean) => void;
 product:IProduct
 userId:string
}
const ReviewModal = ({open,setOpen,product,userId}:Props) => {
  const [error,setError] = useState("")
  const {toast} = useToast()
  const form = useForm<z.infer<typeof ReviewSchemaValidation>>({
      resolver: zodResolver(ReviewSchemaValidation),
      defaultValues: {
         user: userId,
         title: "",
         comment: "",
         rating: undefined,
         productId: product._id
      },
    });
    const isSubmitting = form.formState.isSubmitting
  const ratingValues = [
    {
       text: "i don't recommend",
       value: 1
    },
    {
      text: "Weak",
      value: 2
    },
    {
      text: "Acceptable",
      value: 3
    },
    {
      text: "Good",
      value: 4
    },
    {
      text: "Excelent",
      value: 5
    },
  ]


  

  const handleSubmit = async (values:z.infer<typeof ReviewSchemaValidation>) => {
      try {
         const {error, success} = await addProductReview({
           title: values.title,
           productId: values.productId,
           user: values.user,
           comment: values.comment,
           rating: values.rating
         })
         if(error) {
            setError(error.message)
            return
         }else if(success) {
            setOpen(false)
            form.reset()
           return toast({
              title: "Success",
              description: "review has been added"
            })
         }
      } catch (error) {
         console.log(error)
      }
  }
  
  
  
 
 
  return (
     <AlertDialog open={open} onOpenChange={()=> setOpen(false)} >
    
    <AlertDialogContent className='bg-white h-[95%] !p-0 !m-0 !rounded-[15px] '>
      <AlertDialogTitle className="!hidden !p-0 !m-0 !w-0 !h-0"></AlertDialogTitle>
      <div className="shadow-md h-fit p-4 ">
     
            <X color="gray" cursor="pointer" onClick={()=> setOpen(false) } />
     
      </div>
     
         <div className='flex px-4  overflow-y-scroll shadow-md py-2.5 flex-col'>
              <h2 className='text-[#000] font-bold text-[24px]  mb-3'>I`m writing a review</h2>
              <div className='flex flex-col  w-full'>
            <div className='flex items-center gap-2'>
                  <img className='lg:w-[90px] w-[70px]  object-cover '
                   src={product.images[0].url || ""} alt={product.name || ""} />
                        <p className='text-base text-black-1'>Item code: {product._id}</p>
             </div>
              <div className='mt-5'>
                    <Form {...form}>
                  <form   onSubmit={form.handleSubmit(handleSubmit)}>
                  <div className='flex flex-col gap-2'>
                          <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-css">Choose a rating</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full focus-visible:ring-offset-0 focus-visible:ring-offset-transparent text-[#000]">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#fff] text-black-1">
                    {ratingValues.map((item) => (
                      <SelectItem
                        key={item.text}
                        value={item.value.toString()}
                        className="hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-1">
                          <p>{item.text}</p>
                          <span>-</span>
                          {[...Array(item.value)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="input_styles no-focus"
                 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  className="input_styles no-focus"
                 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
                      </div>
                      
                     
                      <Button 
                       disabled={isSubmitting}
                       type="submit" className='bg-light_blue hover:bg-secondary mt-5
                       hover:opacity-[0.8]   w-full flex items-center justify-center gap-2
                         rounded-[25px] tracking-wider shadow-md
                         text-white uppercase font-bold h-[45px]  ' >
                        { isSubmitting ? "Loading..." : <> <p>Valider </p> 
                         </> }
                      </Button>
                     
                      {error && (
                         <p className="bg-red-500 py-[5px] px-[8px] rounded-md text-white  mt-3 font-medium text-sm ">
                           Error: {error}.
                         </p>
                      )}
                  </form>
                  </Form>
              </div>
            </div>
         </div>
        
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ReviewModal