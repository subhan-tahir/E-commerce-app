'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { routes } from '@/app/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/messages/ErrorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/app/lib/schemas/auth-schema';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import githubicon from "@/public/icons/github.png";
import googleicon from "@/public/icons/search.png";
import Image from 'next/image';
import { LoginFormTypes } from '@/app/types';
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormTypes) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email.trim().toLowerCase(), // Normalize email
        password: data.password,
        
      });
      
      console.log('Login result:', result);
      if(result?.ok){
        
        toast.success('Login successful');
      }
      if (result?.error) {
        setErrorMessage(result.error); // Display error to user
      } else {
        form.reset();
        router.push(routes.home);
        console.log('Login successful, redirecting to home');
        
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('github', { callbackUrl: '/' }); // Redirect to homepage after sign-in
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
           setErrorMessage={() => setErrorMessage('')}
          className="mb-4"
        />
      )}
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
          <Link href={routes.forgetPassword} className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full mt-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg py-3 text-base shadow-md"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        <Separator className="" />
        <Button
          variant={"outline"}
          type="button"
          className="w-full mt-2  hover:opacity-80  text-black font-semibold rounded-lg py-4 text-base"
          onClick={handleSignIn}
        >

          <div className="flex items-center justify-center gap-2">
            <Image src={githubicon} alt="GitHub Icon" width={20} height={20} />
          {loading ? 'Signing in...' : 'Sign in with GitHub'}
          </div>
        </Button>
        <Button
          variant={"outline"}
          type="button"
          className="w-full mt-2  hover:opacity-80  text-black font-semibold rounded-lg py-4 text-base"
          onClick={() => signIn('google')}
        >

          <div className="flex items-center justify-center gap-2">
            <Image src={googleicon} alt="GitHub Icon" width={20} height={20} />
            Sign in with Google
          </div>
        </Button>
        <div className="text-center text-sm text-muted-foreground mt-4">
          Don&apos;t have an account?{' '}
          <Link href={routes.register} className="text-primary font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}