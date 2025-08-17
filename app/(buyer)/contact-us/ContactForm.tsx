"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactFormSchema } from "@/app/lib/schemas/auth-schema";
import { ContactFormTypes } from "@/app/types";
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
import { useState } from "react";
import { api } from "@/app/lib/api";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactFormTypes>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormTypes) => {
    console.log("Form data submitted:", data);
    setLoading(true); 
    setSubmitted(false);
    try {
      const res = await api.contactUs(data);
      console.log("Response from contact API:", res);
      if (res.status === 200) {
        toast.success("✅ Contact form submitted successfully");
        setSubmitted(true);
        form.reset();
      } else {
        console.error("Failed to submit contact form:", res);
        throw new Error(res.message || "Failed to submit contact form");
      }
    }
    catch (error) {
      console.error("Error submitting contact form:", error);
      throw new Error("Failed to submit contact form");
    }
    finally {
      setLoading(false);
    }
    setSubmitted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {submitted && (
          <div className="text-green-600 text-sm mb-2 p-2 border border-green-500 rounded-md bg-green-100">Thank you for contacting us! We will get back to you soon.</div>
        )}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <textarea
                  className="border rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-purple-400 hover:bg-purple-500 text-white rounded-md mt-2" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
