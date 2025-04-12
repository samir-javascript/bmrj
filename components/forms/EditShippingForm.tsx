"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editShippingSchema } from "@/lib/zod";

import { useRouter } from "next/navigation";
import { IShipping } from "@/database/models/shippingAdress.model";
import { editShippingAddress } from "@/actions/shipping.actions";
import useShippingStore, { setShippingAddress } from "@/lib/store/shippingSlice";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/user-redux";




const EditShippingForm = ({shipping,id,isModal,closeModal}: {
    shipping: IShipping,
    isModal?:boolean
    id:string;

    closeModal?:any
})=> {

 
  const router = useRouter()
  const { toast} = useToast()
  const dispatch = useAppDispatch()
 // const { setShippingAddress , shippingAddress }  = useShippingStore()
  const form = useForm<z.infer<typeof editShippingSchema>>({
    resolver: zodResolver (editShippingSchema),
    defaultValues: {
        name: shipping.name || "",
        postalCode: shipping.postalCode || "",
        city: shipping.city || "",
        country: shipping.country  || "",
        address: shipping.address || "",
        phoneNumber: shipping.phoneNumber || "",
        id: id,
    }
  });

  const handleSubmit = async (values:z.infer<typeof editShippingSchema>) => {
      try {
         const { success, data, error } =  await editShippingAddress(values)
         if(success) {
          form.reset()
          
          if(!isModal) {
             toast({
               title: "success",
               description: "address has been updated successfuly"
             })
            return router.push("/customer/address")
          }else {
              dispatch(setShippingAddress(data?.shipping)) 
              closeModal();
              toast({
                title: "success",
                description: "address has been updated successfuly"
              })
          }
          
         }else { 
          toast({
             title:"Error",
             description: error?.message,
             variant: "destructive"
          })
         }
        
        
      } catch (error) {
         console.log(error)
      }
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex flex-col space-y-5 mt-7 ${isModal ? "w-full" : "lg:w-[60%]"} `}
      >
       
       <FormField
           
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                   Name
                </FormLabel>
                <FormControl>
                  <Input className="input-css" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
           
           control={form.control}
           name="phoneNumber"
           render={({ field }) => (
             <FormItem>
               <FormLabel>
                  Phone Number
               </FormLabel>
               <FormControl>
                 <Input className="input-css"  {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           
           control={form.control}
           name="address"
           render={({ field }) => (
             <FormItem>
               <FormLabel>
                  Address
               </FormLabel>
               <FormControl>
                 <Input className="input-css"  {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
           
           control={form.control}
           name="city"
           render={({ field }) => (
             <FormItem>
               <FormLabel>
                  City
               </FormLabel>
               <FormControl>
                 <Input className="input-css" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        
        <FormField
           
           control={form.control}
           name="country"
           render={({ field }) => (
             <FormItem>
               <FormLabel>
                  Country
               </FormLabel>
               <FormControl>
                 <Input className="input-css" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        
        <FormField
           
           control={form.control}
           name="postalCode"
           render={({ field }) => (
             <FormItem>
               <FormLabel>
                 Postal Code
               </FormLabel>
               <FormControl>
                 <Input className="input-css" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        
       
        

       

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="min-w-fit sm:w-[150px] font-semibold hover:shadow-md
           hover:bg-light_blue bg-black text-white rounded-lg mb-5"
        >
          {form.formState.isSubmitting ? "Loading..." : "Valider"}
        </Button>
      </form>
    </Form>
  );
};

export default EditShippingForm;
