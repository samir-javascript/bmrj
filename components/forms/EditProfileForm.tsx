
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { editProfileSchema } from "@/lib/zod";
import { ROUTES } from "@/constants/routes";
import { IUser } from "@/database/models/user.model";
import { editProfile } from "@/actions/user.actions";
import SetPasswordModal from "../modals/SetPasswordModal";
import { useToast } from "@/hooks/use-toast";
import AlertMessage from "../shared/AlertMessage";

const EditProfileForm = ({
  user,
  canChangePasswordPromise,
}: {
  user: IUser;
  canChangePasswordPromise: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      gender: user.gender || undefined,
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      password: "",
      currentPassword: "",
      confirmPassword: "",
      name: user.name || "",
      lastName: user.lastName || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    try {
      const { success, error } = await editProfile(values);
      if (success) {
        form.reset();
        toast({
          title: "Success",
          description: "Your profile has been updated successfully",
        });
        router.push(ROUTES.userProfile);
      } else {
        setError(error?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 mx-auto w-full max-w-3xl bg-white shadow-sm p-6 sm:p-8 rounded-xl space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Profile
          </h2>

          {error && <AlertMessage variant="destructive" message={error} />}

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row gap-6"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="male" id="male" />
                      </FormControl>
                      <FormLabel htmlFor="male">Male</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="female" id="female" />
                      </FormControl>
                      <FormLabel htmlFor="female">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {["name", "lastName", "email", "phoneNumber"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof editProfileSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {fieldName === "lastName" ? "Last Name" : fieldName}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={fieldName === "phoneNumber" ? "tel" : "text"}
                        placeholder={`Enter your ${fieldName}`}
                        disabled={isSubmitting}
                        className="no-focus"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Password Fields */}
          {canChangePasswordPromise ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["currentPassword", "password", "confirmPassword"].map(
                (fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as keyof z.infer<typeof editProfileSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {fieldName === "confirmPassword"
                            ? "Confirm New Password"
                            : fieldName === "password"
                            ? "New Password"
                            : "Current Password"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={`Enter ${fieldName}`}
                            disabled={isSubmitting}
                            className="no-focus"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </div>
          ) : (
            <div>
              <Button
                type="button"
                onClick={() => setOpen(true)}
                disabled={isSubmitting}
                className="bg-gray-100 text-black hover:bg-gray-200 rounded-md"
              >
                Set Password
              </Button>
            </div>
          )}

          {/* Submit */}
          <SetPasswordModal
            open={open}
            setOpen={setOpen}
            email={user.email}
          />

          <div className="pt-4">
            <Button
              type="submit"
              disabled={open || isSubmitting}
              className="w-full md:w-40 bg-black text-white hover:bg-gray-900"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
