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
import { Switch } from "@/components/ui/switch"
import { HeroValidationSchema } from "@/lib/zod"
import { Upload } from "lucide-react"
import { CldUploadWidget, CldImage } from "next-cloudinary"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { addHeroImage } from "@/actions/uploads.actions"
import { useEffect, useState } from "react"
import Alert from "../shared/Alert"

const HeroForm = () => {
  const form = useForm<z.infer<typeof HeroValidationSchema>>({
    resolver: zodResolver(HeroValidationSchema),
    defaultValues: {
      isActive: false,
      title: "",
      imgUrl: {
         mobile: "",
         desktop: ""
      },
    },
  })
  const isSubmitting = form.formState.isSubmitting === true
  const { toast } = useToast()
  const [error,setError] = useState<string | undefined>(undefined)
   console.log(form.watch(), "values")
  



  const handleSubmit = async (data: z.infer<typeof HeroValidationSchema>) => {
     try {
        const { success, error, message } = await addHeroImage({
            isActive: data.isActive,
            imgUrl: data.imgUrl,
            title: data.title
        })
        if(success) {
           form.reset()
          return toast({
            title: "success",
            description: message
           })
          
        }else {
           setError(error?.message) 
        }
     } catch (error) {
        console.log(error)
     }
  }

  

  return (
    <Form {...form}>
       {error && (
         <Alert  message={error}/>
       )}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-7 flex lg:max-w-[500px] flex-col space-y-6"
      >
        {/* ✅ isActive with Switch */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Activate Hero Banner?</FormLabel>
              <FormControl>
                <Switch
                  disabled={isSubmitting}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* title input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image Title</FormLabel>
              <FormControl>
                <Input
                  className="input_styles no-focus"
                  disabled={isSubmitting}
                  placeholder="Enter a strong title please"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
<FormField
  control={form.control}
  name="imgUrl"
  render={() => (
    <FormItem>
      <FormLabel>Mobile Hero Image</FormLabel>
      <FormControl>
        <CldUploadWidget
          uploadPreset="marjana_e-commerce"
          onUpload={(result ) => {
            if (
              typeof result.info === "object" &&
              "secure_url" in result.info
            ) {
              form.setValue("imgUrl.mobile", result.info.secure_url, {
                shouldValidate: true,
              });
            }
          }}
        >
          {({ open }) => (
            <Button
              onClick={() => open()}
              disabled={isSubmitting}
              className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
              type="button"
            >
              Upload Mobile Image <Upload className="ml-2" />
            </Button>
          )}
        </CldUploadWidget>
      </FormControl>
      {form.watch("imgUrl.mobile") && (
        <div className="mt-3 border rounded-lg bg-gray-100 w-[150px] h-[150px] flex items-center justify-center">
          <CldImage
            alt="Mobile Hero"
            src={form.watch("imgUrl.mobile")}
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

<FormField
  control={form.control}
  name="imgUrl"
  render={() => (
    <FormItem>
      <FormLabel>Desktop Hero Image</FormLabel>
      <FormControl>
        <CldUploadWidget
          uploadPreset="marjana_e-commerce"
          onUpload={(result) => {
            if (
              typeof result.info === "object" &&
              "secure_url" in result.info
            ) {
              form.setValue("imgUrl.desktop", result.info.secure_url, {
                shouldValidate: true,
              });
            }
          }}
        >
          {({ open }) => (
            <Button
              onClick={() => open()}
              disabled={isSubmitting}
              className="w-full bg-white shadow-lg text-black border border-gray-200 rounded-lg min-h-[45px] hover:bg-white"
              type="button"
            >
              Upload Desktop Image <Upload className="ml-2" />
            </Button>
          )}
        </CldUploadWidget>
      </FormControl>
      {form.watch("imgUrl.desktop") && (
        <div className="mt-3 border rounded-lg bg-gray-100 w-[150px] h-[150px] flex items-center justify-center">
          <CldImage
            alt="Desktop Hero"
            src={form.watch("imgUrl.desktop")}
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

    
        <Button   disabled={isSubmitting} className="bg-light_blue lg:w-[150px] text-white" type="submit">
          {isSubmitting ? "Loading..." : "Valider"}
        </Button>
      </form>
    </Form>
  )
}

export default HeroForm
