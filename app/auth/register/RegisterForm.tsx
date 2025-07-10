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

export default function RegisterForm() {
  const form = useForm<RegisterFormTypes>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });
  const remember = form.watch("remember");
console.log(process.env.MongoDB_URL);
  const  onSubmit = async (data: RegisterFormTypes) => {
    const response = await axios.post("/api/auth/register", data);
    console.log('response...',response);
  };

  return (
    <Form {...form}>
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
          disabled={!remember}
          className={`w-full mt-2 transition-colors ease duration-500 ${!remember ? "opacity-50 !cursor-not-allowed" : "hover:bg-secondary hover:opacity-60 cursor-pointer"
            }`}
        >
          Sign Up
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
