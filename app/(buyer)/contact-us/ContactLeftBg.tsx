"use client"
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React, { useState } from 'react'
import loginImage from '@/public/auth/contact-bg.avif';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Contact Us",
    description: "Get in touch with E-store for any inquiries, support, or feedback. We're here to help you with your shopping experience. Contact us today!",
}
const ContactLeftBg = () => {
    const [loading,setLoading] = useState(true);
  return (
   <>
    {
        loading && (
            <Skeleton className="w-full h-full" />
        )
    }
        <Image onLoad={() => setLoading(false)} src={loginImage} alt="Login" fill priority={true} sizes="(max-width: 768px) 100vw, 33vw" objectFit="contain" className="rounded-md" />
   
   </>
  )
}

export default ContactLeftBg
