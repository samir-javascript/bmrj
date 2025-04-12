"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z  } from "zod";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { MDXEditorMethods } from "@mdxeditor/editor"
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
import { ProductSchemaValidation } from "@/lib/zod";
import { createProduct } from "@/actions/product.actions";

import { ROUTES } from "@/constants/routes";
import { CldUploadWidget } from "next-cloudinary";
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";

const Editor = dynamic(() => import("@/components/forms/editor/Editor"), {
  ssr: false,
});


const ProductForm = () => {
  const router = useRouter();
  const { toast } = useToast()
   // This ref holds the most up-to-date image array
   const uploadedImagesRef = useRef<{ url: string; public_id: string }[]>([]);
  const [images, setImages] = useState<[{url:string;public_id:string}]>();
  const removeImage = (urlToRemove: string) => {
    const updated = uploadedImagesRef.current.filter(img => img.url !== urlToRemove);
    uploadedImagesRef.current = updated;
    form.setValue("productImages", updated, { shouldValidate: true });
  };
  
  const editorRef = useRef<MDXEditorMethods>(null);


  const form = useForm<z.infer<typeof ProductSchemaValidation>>({
    resolver: zodResolver(ProductSchemaValidation),
    defaultValues: {productName: "",
    productDescription: "",
    productPrice: "",
    productPrevPrice: "",
    productCategory: "",
    productBrand: "",
    qty: "",
    productPosition: "",
    productImages: []
   }, 
  });
  const handleUpload = (result: any) => {
    if (
      typeof result.info === "object" &&
      "secure_url" in result.info &&
      "public_id" in result.info
    ) {
      const newImage = {
        url: result.info.secure_url,
        public_id: result.info.public_id,
      };
      
      // Update ref and form value
      uploadedImagesRef.current = [...uploadedImagesRef.current, newImage];
      form.setValue("productImages", uploadedImagesRef.current, { shouldValidate: true });
      form.trigger("productImages");
    }
  };
  const handleSubmit = async (data:z.infer<typeof ProductSchemaValidation>) => {
    const { success, error } = await createProduct(data);
    if (success) {
      form.reset()
      editorRef.current?.setMarkdown("")
      toast({
        title: "success",
        description: "Product has been created successfully",
        variant: "default"
      })
     router.push(ROUTES.products)
     
    } else {
       return toast({
        title: "Error",
        description: error?.message,
        variant: "destructive"
       })
    }
  };
   
 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-5 mt-7 lg:w-[60%]"
      >
        {/* Product Name */}
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product Name" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Product Description */}
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
              <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Price and Previous Price */}
        <div className="flex max-sm:flex-col gap-5">
          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Product Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productPrevPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Product Previous Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Previous Price"
                    {...field}
                  />
                </FormControl>
                 <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Product Category */}
        <FormField
          control={form.control}
          name="productCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product Category" {...field} />
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Product Brand */}
        <FormField
          control={form.control}
          name="productBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Brand</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product Brand" {...field} />
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Product Position */}
        <FormField
          control={form.control}
          name="productPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product UI Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product Position" {...field} />
              </FormControl>
               <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Product Quantity */}
        <FormField
          control={form.control}
          name="qty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Product Quantity"
                  {...field}
                />
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
       
          {/* <CldUploadWidget
  uploadPreset="marjana_e-commerce"
  options={{multiple: true }}
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
        className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
        type="button"
      >
        Upload images <Upload />
      </Button>
    );
  }}
</CldUploadWidget> */}
<CldUploadWidget
  uploadPreset="marjana_e-commerce"
  options={{ multiple: true }}
  onUpload={handleUpload}
>
  {({ open }) => (
    <Button
      onClick={() => open()}
      className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
      type="button"
    >
      Upload images <Upload />
    </Button>
  )}
</CldUploadWidget>

      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>


       

        <Button
          type="submit"
          className="min-w-fit sm:w-[150px] font-semibold hover:shadow-md hover:bg-light_blue bg-black text-white rounded-lg"
        >
          {form.formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
        {/* Display Uploaded Images */}
        {form.watch("productImages").map((img, index) => (
  <div key={index} className="flex relative items-center gap-2 ">
    <img src={img.url} alt={`Uploaded ${index + 1}`} className=" w-32 relative h-32 object-contain rounded-lg border" />
    <button
      type="button"
      onClick={() => removeImage(img.url)}
      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
    >
      X
    </button>
  </div>
))}


      </form>

    </Form>
  );
};

export default ProductForm;
