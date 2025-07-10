"use client"
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React, { useState } from 'react'
import loginImage from '@/public/auth/login.png';
const LoginRightBg = () => {
    const [loading,setLoading] = useState(true);
  return (
   <>
    {
        loading && (
            <Skeleton className="w-full h-full" />
        )
    }
        <Image onLoad={() => setLoading(false)} src={loginImage} alt="Login" fill priority={true} sizes="(max-width: 768px) 100vw, 33vw" objectFit="cover" className="rounded-md" />
   
   </>
  )
}

export default LoginRightBg
