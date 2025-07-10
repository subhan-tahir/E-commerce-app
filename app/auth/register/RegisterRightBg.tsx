"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import registerImage from '@/public/auth/register.svg';
import { Skeleton } from '@/components/ui/skeleton';

const RegisterRightBg = () => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            {
                loading &&
                <Skeleton className="w-full h-full" />
            }
            <Image onLoad={() => setLoading(false)} src={registerImage} alt="Login" fill priority={true} sizes="(max-width: 768px) 100vw, 33vw" objectFit="cover" className="rounded-md" />

        </>
    )
}

export default RegisterRightBg
