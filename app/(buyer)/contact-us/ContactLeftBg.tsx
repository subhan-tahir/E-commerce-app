"use client"
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React, { useState } from 'react'
import loginImage from '@/public/auth/contact-bg.avif';
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
