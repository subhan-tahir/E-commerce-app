"use client";

import { useForm } from "react-hook-form";
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
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { routes } from "@/app/lib/routes";
import Link from "next/link";

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = (data: any) => {
        // handle login
        console.log(data);
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="stanley@gmail.com" type="email" {...field} />
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
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between text-sm">
                    <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                            <div className="flex items-center gap-2">
                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <FormLabel>Remember me</FormLabel>
                            </div>
                        )}
                    />
                    <Link href={routes.register} className="text-primary hover:underline">Forgot Password?</Link>
                </div>
                <Button type="submit" className="w-full mt-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg py-3 text-base shadow-md">Sign In</Button>
                <div className="text-center text-sm text-muted-foreground mt-4">
                    Don&apos;t have an account? <Link href={routes.register} className="text-primary font-medium hover:underline">Sign Up</Link>
                </div>
            </form>
        </Form>
    );
} 