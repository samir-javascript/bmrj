"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";

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

import { ROUTES } from "@/constants/routes";
import { IShipping } from "@/database/models/shippingAdress.model";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import  { setShippingAddress } from "@/lib/store/shippingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux";
import { useToast } from "@/hooks/use-toast";



interface Props<T>{
  schema: ZodType<T>;
  defaultValues: T,
  onSubmit: (data:T) => Promise<ActionResponse<{shipping:IShipping}>>;
  type: "EDIT" | "CREATE";
  address?: IShipping;
  isModal?:boolean
}
const ShippingForm =  <T extends FieldValues> ({schema,defaultValues,onSubmit,type,isModal,address}:Props<T>)=> {

  const [checked,setChecked] = useState(false)
 
 const dispatch = useAppDispatch()

  const { toast} = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver (schema),
    defaultValues: defaultValues as DefaultValues<T>
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
      try {
         if(type === "CREATE") {
           const { success, data:result, error } = await onSubmit(data)
           if(success) {
              if(checked || isModal) {
                 dispatch(setShippingAddress(result?.shipping))
              }
              if(!isModal) {
                router.push(ROUTES.shipping)
              }
             
           }else {
             return toast({
                 title:"Error",
                 description: error?.message,
                 variant:"destructive"
              })
           }
           
         }
      } catch (error) {
         console.log(error)
      }
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`flex flex-col space-y-5 mt-7 ${isModal ? "lg:w-full" : "lg:w-[60%] "}`}
      >
        {Object.keys(defaultValues).map((field,index) => (
            <FormField
            key={index}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                   {field.name}
                </FormLabel>
                <FormControl>
                  <Input className="input-css" placeholder={`Enter ${field.name}`} {...field} />
                </FormControl>
                <FormMessage  />
              </FormItem>
            )}
          />
        ))}
        

        <div className="flex items-center space-x-2">
        <Checkbox
  checked={checked}
  onCheckedChange={(value) => setChecked(value === true)}
  className="text-white"
  id="save_shipping"
/>
      <label
        htmlFor="save shipping"
        className="text-[15px] text-[#888] font-normal"
      >
        Adresse de livraison par défaut
      </label>
    </div>
        

       

        <Button
         disabled={form.formState.isSubmitting}
          type="submit"
          className="min-w-fit sm:w-[150px] font-semibold my-4 hover:shadow-md hover:bg-light_blue bg-black text-white rounded-lg"
        >
          {form.formState.isSubmitting ? "Loading..." : "Valider"}
        </Button>
      </form>
    </Form>
  );
};

export default ShippingForm;
