"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { z,  ZodType } from "zod"
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";
const Editor = dynamic(() => import("@/components/forms/editor/Editor"), {
  ssr: false,
});
import { MDXEditorMethods } from "@mdxeditor/editor"
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

import { EditProductSchema, ProductSchemaValidation } from "@/lib/zod"
import { createProduct, editProduct } from "@/actions/product.actions"
import { useRef, useState } from "react"
import { IProduct } from "@/database/models/product.model"
import { useRouter } from "next/navigation"
import { CldUploadWidget } from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
interface Props<T extends FieldValues>  {
  type: "create" | "edit",
  schema: ZodType<T>,
  defaultValues: T,
  onSubmit: (data:T) => Promise<ActionResponse>
}
 
export default function EditProductForm({productId, product}: {productId:string, product: IProduct}) {
  // 1. Define your form.
  const router = useRouter()
  const {toast} = useToast()
   const editorRef = useRef<MDXEditorMethods>(null);
 const [images,setImages] = useState<string[]>([])
  const form = useForm<z.infer<typeof EditProductSchema>>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      productId,
      productName: product.name || "",
      productDescription: product.description || "",
      productPrice: product.price.toString() || "",
      productPrevPrice: product.prevPrice.toString() || "",
      productCategory: product.category ||  "",
      productBrand: product.brand || "",
      qty: product.countInStock.toString() || "",
      productPosition: product.position || "",
      productImages: product.images ||  []
    },
  })
 
const isSubmitting = form.formState.isSubmitting
 const handleSubmit = async(values: z.infer<typeof EditProductSchema>)=> {
      try {
         const { success } = await editProduct({
            ...values
         })
         if(success) toast({
          title: "success",
          description: "Product has been updated successfully",
          variant: "default"
        })
          router.push('/admin/productsManagement/products')
      } catch (error) {
        console.log(error)
      }
     
 }
  
 
  return (
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-5 mt-7 lg:w-[60%] ">
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Name
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} className="no-focus" placeholder="Enter Product Name" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="productDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Description
            </FormLabel>
            <FormControl>
            <Editor
                  value={field.value}
                  disabled={isSubmitting}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <div className="flex max-sm:items-start items-center  gap-5 max-sm:flex-col flex-row">
      <FormField
        control={form.control}
        name="productPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Price
            </FormLabel>
            <FormControl>
              <Input  
             disabled={isSubmitting}
             type="number"
               className="no-focus" placeholder="Enter Product Price" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
         <FormField
        control={form.control}
        name="productPrevPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product PrevPrice
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} type="number" className="no-focus" placeholder="Enter Product discounted price" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      </div>
        
         <FormField
        control={form.control}
        name="productCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Category
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} className="no-focus" placeholder="Enter Product Category Name" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="productBrand"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product Brand
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} className="no-focus" placeholder="Enter Product Brand Name" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="productPosition"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product UI Podition
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} className="no-focus" placeholder="Enter Product Position" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="qty"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Product QTY
            </FormLabel>
            <FormControl>
              <Input disabled={isSubmitting} type="number" className="no-focus" placeholder="Enter Product Quantity" {...field} />
            </FormControl>
            
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
     <FormField
  control={form.control}
  name="productImages"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Product Images</FormLabel>
      <FormControl>
       
          <CldUploadWidget
  uploadPreset="marjana_e-commerce"
  onUpload={(result, { event }) => {
   
      if (typeof result.info === "object" && "secure_url" in result.info && "public_id" in result.info) {
        const uploadedImage = {
          url: result.info.secure_url,
          public_id: result.info.public_id,
        };
        const updatedImages = [...(field.value || []), uploadedImage];
    
        form.setValue("productImages", updatedImages, { shouldValidate: true });
        form.trigger("productImages");
       
      }
    
  }}
>
  {({ open }) => {
    return (
      <Button
        onClick={() => open()}
        disabled={isSubmitting}
        className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
        type="button"
      >
        Upload images <Upload />
      </Button>
    );
  }}
</CldUploadWidget>

      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>
    
     
      <Button disabled={isSubmitting} className="min-w-fit sm:w-[150px] font-semibold
       hover:shadow-md hover:bg-light_blue bg-black text-white rounded-lg" type="submit">
         {isSubmitting ? "Loading..." : "Valider"} 
      </Button>
    </form>

  </Form>
  )
}

