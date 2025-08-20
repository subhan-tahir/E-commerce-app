"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "@/app/lib/schemas/auth-schema";
import { ForgetPasswordFormTypes } from "@/app/types";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<ForgetPasswordFormTypes>({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordFormTypes) => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await axios.post("/api/auth/forget-password", { email: data.email });
      if (res.data.success) {
        setSuccess(true);
        toast.success("Reset link sent to your email.");
        form.reset();
      } else {
        toast.error(res.data.message || "Failed to send reset link.");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="w-1/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full  mt-8 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
          <p className="text-center text-textColor ">Enter your email we will send you a link for get back into your account.</p>
          {success && <div className="text-green-600 text-center">Check your email for a reset link.</div>}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
