"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Upload } from "lucide-react"
import { CldUploadWidget, CldImage } from "next-cloudinary"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import Alert from "../shared/Alert"
import { CategorySchemaValidation } from "@/lib/zod"
import { createCategory } from "@/actions/uploads.actions"

const CategoryForm = () => {
  const form = useForm<z.infer<typeof CategorySchemaValidation>>({
    resolver: zodResolver(CategorySchemaValidation),
    defaultValues: {
      name: "",
      image: {
        public_id: "",
        imageUrl: ""
      }
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleUpload = (result: any) => {
    if (
      typeof result.info === "object" &&
      "secure_url" in result.info &&
      "public_id" in result.info
    ) {
      const newImage = {
        imageUrl: result.info.secure_url,
        public_id: result.info.public_id,
      };

      form.setValue("image", newImage, { shouldValidate: true });
      form.trigger("image");
    }
  };

  const handleSubmit = async (data: z.infer<typeof CategorySchemaValidation>) => {
     try {
        const { success, error } = await createCategory({
           name: data.name,
           image: data.image
        })
        if(success) {
           form.reset()
          return toast({
             title: "success",
             description: "category has been created successfuly"
           })
        }else {
          return toast({
            title: "Error",
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
      {error && <Alert message={error} />}

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-7 flex lg:max-w-[500px] flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  className="input_styles no-focus"
                  placeholder="Enter Category Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image.imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Category Image</FormLabel>
              <FormControl>
                <CldUploadWidget
                  uploadPreset="marjana_e-commerce"
                  onUpload={handleUpload}
                >
                  {({ open }) => (
                    <Button
                      onClick={() => open()}
                      className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
                      type="button"
                    >
                      Upload Category Image <Upload className="ml-2" />
                    </Button>
                  )}
                </CldUploadWidget>
              </FormControl>

              {form.watch("image.imageUrl") && (
                <div className="mt-3 border rounded-lg bg-gray-100 w-[150px] h-[150px] flex items-center justify-center">
                  <CldImage
                    alt="Category Image"
                    src={form.watch("image.imageUrl")}
                    crop="auto"
                    quality="auto"
                    width={150}
                    height={150}
                    className="object-contain w-full rounded-lg"
                  />
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-light_blue lg:w-[150px] text-white" type="submit">
          {form.formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
