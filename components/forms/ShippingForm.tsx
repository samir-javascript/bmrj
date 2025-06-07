// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
// import { z, ZodType } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import { ROUTES } from "@/constants/routes";
// import { IShipping } from "@/database/models/shippingAdress.model";
// import { useRouter } from "next/navigation";
// import { Checkbox } from "../ui/checkbox";
// import { useState } from "react";
// import  { setShippingAddress } from "@/lib/store/shippingSlice";
// import { useAppDispatch, useAppSelector } from "@/hooks/user-redux";
// import { useToast } from "@/hooks/use-toast";



// interface Props<T>{
//   schema: ZodType<T>;
//   defaultValues: T,
//   onSubmit: (data:T) => Promise<ActionResponse<{shipping:IShipping}>>;
//   type: "EDIT" | "CREATE";
//   address?: IShipping;
//   isModal?:boolean
// }
// const ShippingForm =  <T extends FieldValues> ({schema,defaultValues,onSubmit,type,isModal,address}:Props<T>)=> {

//   const [checked,setChecked] = useState(false)
 
//  const dispatch = useAppDispatch()

//   const { toast} = useToast()
//   const router = useRouter()
//   const form = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver (schema),
//     defaultValues: defaultValues as DefaultValues<T>
//   });
//   const isSubmitting = form.formState.isSubmitting === true
//   const handleSubmit: SubmitHandler<T> = async (data) => {
//       try {
//          if(type === "CREATE") {
//            const { success, data:result, error } = await onSubmit(data)
//            if(success) {
//               if(checked || isModal) {
//                  dispatch(setShippingAddress(result?.shipping))
//               }
//               if(!isModal) {
//                 router.push(ROUTES.shipping)
//               }
             
//            }else {
//              return toast({
//                  title:"Error",
//                  description: error?.message,
//                  variant:"destructive"
//               })
//            }
           
//          }
//       } catch (error) {
//          console.log(error)
//       }
//   };
  
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleSubmit)}
//         className={`flex flex-col space-y-5 mt-7 ${isModal ? "lg:w-full" : "lg:w-[60%] "}`}
//       >
//         {Object.keys(defaultValues).map((field,index) => (
//             <FormField
//             key={index}
//             control={form.control}
//             name={field as Path<T>}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                    {field.name}
//                 </FormLabel>
//                 <FormControl>
//                   <Input disabled={isSubmitting} className="input-css" placeholder={`Enter ${field.name}`} {...field} />
//                 </FormControl>
//                 <FormMessage  />
//               </FormItem>
//             )}
//           />
//         ))}
        

//         <div className="flex items-center space-x-2">
//         <Checkbox
//   checked={checked}
//   disabled={isSubmitting}
//   onCheckedChange={(value) => setChecked(value === true)}
//   className="text-white"
//   id="save_shipping"
// />
//       <label
//         htmlFor="save shipping"
//         className="text-[15px] text-[#888] font-normal"
//       >
//         Adresse de livraison par défaut
//       </label>
//     </div>
        

       

//         <Button
//          disabled={isSubmitting}
//           type="submit"
//           className="min-w-fit sm:w-[150px] font-semibold my-4 hover:shadow-md hover:bg-light_blue bg-black text-white rounded-lg"
//         >
//           {form.formState.isSubmitting ? "Loading..." : "Valider"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ShippingForm;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
import { setShippingAddress } from "@/lib/store/shippingSlice";
import { useAppDispatch } from "@/hooks/user-redux";
import { useToast } from "@/hooks/use-toast";

interface Props<T> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse<{ shipping: IShipping }>>;
  type: "EDIT" | "CREATE";
  address?: IShipping;
  isModal?: boolean;
}

const ShippingForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  type,
  isModal,
}: Props<T>) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      if (type === "CREATE") {
        const { success, data: result, error } = await onSubmit(data);
        if (success) {
          if (checked || isModal) {
            dispatch(setShippingAddress(result?.shipping));
          }
          if (!isModal) {
            router.push(ROUTES.shipping);
          }
        } else {
          return toast({
            title: "Error",
            description: error?.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`w-full max-w-2xl mx-auto mt-10 bg-white p-6 sm:p-8 rounded-xl shadow-md ${
          isModal ? "lg:w-full" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {type === "CREATE" ? "Add Shipping Address" : "Edit Shipping Address"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Object.keys(defaultValues).map((field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium capitalize text-gray-700">
                    {field.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition rounded-md"
                      placeholder={`Enter ${field.name}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <Checkbox
            checked={checked}
            disabled={isSubmitting}
            onCheckedChange={(value) => setChecked(value === true)}
            id="save_shipping"
          />
          <label
            htmlFor="save_shipping"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Set as default shipping address
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 w-full sm:w-48 bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-md transition"
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ShippingForm;
