"use client"
import React, { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import VerifyForm from './VerifyForm';
import emailbg from '@/public/auth/email-verify.jpg';
import Image from 'next/image';
// import { Metadata } from 'next';

// export const metadata:Metadata = {
//     title: "Verify Email",
//     description: "Access your E-store account to manage orders, track shipments, and enjoy personalized shopping experiences. Log in now to explore exclusive deals and offers!",
// }
export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  useEffect(() => {
    console.log('Email from query params:', email);
  }, [email]);//run only once when component mounts

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f6fa] p-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex overflow-hidden p-2">
        {/* Left: Form */}
        <div className="flex-1 flex flex-col justify-center py-16 px-16">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Finnger
            </span>
            <h2 className="text-4xl font-bold mb-2">Verify Your Email</h2>
            <p className="text-muted-foreground mb-8">Enter the verification code sent to <span className="font-semibold">{email}</span></p>
          </div>
          <VerifyForm />
        </div>
        {/* Right: Illustration */}
        <div className="hidden md:flex flex-1 relative min-w-1/2">
          <Image src={emailbg} alt="email-verify" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
} 