"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "@/app/lib/schemas/auth-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { api } from "@/app/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import UploadForm from "@/components/UploadForm";
import { UpdateUser, User } from "@/app/types";


const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, status, update } = useSession();

  const form = useForm({
    resolver: yupResolver(updateProfileSchema),
    shouldUnregister: true,
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      profileImage: "",
    },
  });



  // ✅ Submit handler
  const handleSave = async (data: Partial<User>) => {
    console.log("Form data:", data);
    try {
      const updateData = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        // accessToken: (session as any)?.accessToken,
        profileImage: (session?.user as User)?.profileImage,
      };

      const response = await api.updateUser(updateData as UpdateUser);
      console.log("Update response:", response);
      if (response.status === 200) {
        toast.success(response.message || "Profile updated successfully");
      }
      if (response.status === 400) {
        toast.error("Failed to update profile: " + response.message);
      };

      // const userData = await api.getProfile((session as any)?.accessToken);
      // if (!userData) throw new Error("Failed to retrieve updated profile");

      await update({
        name: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        profileImage: data.profileImage,
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update profile");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
  };

  const isGithubLogin = session?.provider === "github";
  // ✅ Prefill form when session changes
  useEffect(() => {
    if (session?.user) {
      form.reset({
        username: session.user.username || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
        profileImage: session.user.profileImage || "",
      });
    }
  }, [session, form]);//session mount when component mounts
  return (
    <>
      <Form {...form}>
        {/* ✅ The real form tag */}
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Information</CardTitle>
                 { !isGithubLogin && <CardDescription>Update your personal information</CardDescription>} 
                </div>
                {
                  isGithubLogin ? null : 
                 <>
                    {!isEditing ? (
                      <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="text-[#7837ff] border-[#7837ff] hover:bg-[#7837ff] hover:text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        {/* ✅ Submit works now */}
                        <Button type="submit" className="bg-[#7837ff] hover:bg-[#6636c7]">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button type="button" onClick={handleCancel} variant="outline">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </>
                }
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {status === "loading" ? (
                  <Skeleton className="h-8 w-full" />
                ) : (
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={!isEditing} className="bg-gray-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {status === "loading" ? (
                  <Skeleton className="h-8 w-full" />
                ) : (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            disabled={!isEditing}
                            className="bg-gray-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          disabled={!isEditing}
                          className="bg-gray-50"
                          {...field}
                          value={field.value || ""}
                        />
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
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your address"
                          disabled={!isEditing}
                          className="bg-gray-50"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* ✅ Upload form stays outside */}
      <UploadForm />
    </>
  );
};

export default ProfileForm;
