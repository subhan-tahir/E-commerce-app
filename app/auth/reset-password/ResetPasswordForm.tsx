"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Please enter your new password").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const form = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    console.log("Resetting password with token:", token);
    console.log("Form data:", data);
    if (!token) {
      toast.error("❌ Token is required to reset password.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }
    setLoading(true);
    setSuccess(false);
    try {
      const res = await axios.post("/api/auth/reset-password", { 
        token, 
        newPassword: data.password // Match the key expected by the API
      }, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.data.success) {
        setSuccess(true);
        toast.success("Password reset successful. You can now log in.");
        form.reset();
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {  
        toast.error(res.data.message || "Failed to reset password.");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:w-1/3 w-full  mx-auto mt-8 p-10 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {success && <div className="text-green-600 text-center">Password reset successful!</div>}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
} 