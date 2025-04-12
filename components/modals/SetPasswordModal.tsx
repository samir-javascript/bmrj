"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetSetPasswordCodeSchema } from "@/lib/zod";
import { useState } from "react";
import { SendSetPasswordCode, VerifyCodeAndSetPassword } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";

const SetPasswordModal = ({
  open,
  setOpen,
  email,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  email: string;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
   
  const { toast } = useToast()
  const [loading,setLoading] = useState(false)
  // Form to GET code
  const codeForm = useForm<z.infer<typeof GetSetPasswordCodeSchema>>({
    resolver: zodResolver(GetSetPasswordCodeSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: ""
    },
  });

  

  async function onSubmit(values: z.infer<typeof GetSetPasswordCodeSchema>) {
    try {
      
      // TODO: verify code with backend
     const { success, error } =  await VerifyCodeAndSetPassword({
          code: values.code,
          password: values.password,
          confirmPassword: values.confirmPassword
      })
      if(success) {
          codeForm.reset()
          toast({
            title: "success",
            description: "your password has been all set successfuly"
          })
          setOpen(false)
      }else {
         setError(error?.message)
      }
     
    } catch (error) {
      setError("Invalid or expired code.");
      console.log(error)
    }
  }
  async function handleSendSetPasswordCode() {
     setLoading(true)
      try {
        const { success, error } =  await SendSetPasswordCode()
        if(success) {
            toast({
              title: "success",
              description: 'check your email to get set password code.'
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
      }finally {
         setLoading(false)
      }
  }
  

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="sm:max-w-[600px] w-[98%] bg-white flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-7">Set Password</DialogTitle>
          <DialogDescription className="font-medium text-[#222] text-[16px] text-center">
            Establish account access by configuring the necessary details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full">
          <div>
            <span className="text-sm font-medium text-[#222] mb-1.5">Email Address</span>
            <p className="text-gray-500 font-medium text-lg">{email}</p>
          </div>

          <Form {...codeForm}>
          {error && (
                      <div className="flex items-center gap-1">
                        <TriangleAlert color="red" size={16} />
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                      </div>
                    )}
            <form onSubmit={codeForm.handleSubmit(onSubmit)} className="mt-7 flex flex-col space-y-2">
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Click the button Get Code</FormLabel>
                    <FormControl>
                      <Input className="input_styles no-focus" {...field} />
                    </FormControl>
                    <FormDescription className="text-[#222] text-xs font-medium">
                      Check your email and get the verification code
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  
                  </FormItem>
                )}
              />

              <Button onClick={handleSendSetPasswordCode} className="bg-gray-200 hover:bg-gray-300 mt-3 lg:w-[200px] w-fit rounded-lg text-black" type="button">
                 {loading ? "Sending..." : "Get Code"}
              </Button>
              <h4 className="text-lg mt-3 text-gray-500 font-medium">Set New Password</h4>
              <FormField
                control={codeForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        className="input_styles no-focus"
                        type="password"
                        {...field}
                        disabled={!codeForm.watch("code") || codeForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={codeForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        className="input_styles no-focus"
                        type="password"
                        {...field}
                        disabled={!codeForm.watch("code") || codeForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
               <Button
                className="bg-light_blue w-fit rounded-lg text-white"
                type="submit"
                disabled={!codeForm.watch("code") || codeForm.formState.isSubmitting}
              >
                {codeForm.formState.isSubmitting ? "Loading..." : "Set Password"} 
              </Button>
            </form>
          </Form>
        </div>

       
      </DialogContent>
    </Dialog>
  );
};

export default SetPasswordModal;
