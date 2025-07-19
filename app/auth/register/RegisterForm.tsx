"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/lib/schemas/auth-schema";
import { RegisterFormTypes } from "@/app/types";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { routes } from "@/app/lib/routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "@/app/lib/api";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/messages/ErrorMessage";
import { useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  console.log("email", email);
  const form = useForm<RegisterFormTypes>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: email || "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });
  const remember = form.watch("remember");
  console.log(process.env.MongoDB_URL);
  const onSubmit = async (data: RegisterFormTypes) => {
    try {
      setLoading(true)
      const response = await api.createUser(data);
      if (response?.success) {
        toast.success("Registration successful");
        form.reset();
        navigate.push(`${routes.verifyEmail}?email=${encodeURIComponent(data.email)}`);
      }
      else if (response?.status === 400) {
        console.log('running')
        setErrorMessage(response.message || "User already exist");
      }
      else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error: any) {

      console.log('Register error:', error.response);
      toast.error("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };





  return (
    <Form {...form}>
      {
        errorMessage && <ErrorMessage message={errorMessage} setErrorMessage={setErrorMessage} className="mb-2" />
      }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-label-color">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
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
                <Input type="password" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 ">
              <Checkbox
                id="remember"
                checked={field.value}
                onCheckedChange={field.onChange}
                defaultChecked={false}
              />
              <FormLabel htmlFor="remember" className="!cussor-pointer">Remember me</FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!remember || loading}
          className={`w-full mt-2 transition-colors ease duration-500 ${!remember ? "opacity-50 !cursor-not-allowed" : "hover:bg-secondary hover:opacity-60 cursor-pointer"
            }`}
            
        >
          {loading ? 'Sign up...':"Sign up"}
        </Button>


        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href={routes.login} className="text-primary font-medium hover:underline">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
