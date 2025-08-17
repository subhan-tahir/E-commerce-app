import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import emptycart from "@/public/auth/empty-card.webp";
import { title } from 'process';
import { routes } from '@/app/lib/routes';
import Link from 'next/link';
interface  EmptyCardProps  {
title:String,
description:String,
btnText:String
}
const EmptyCard = ({title,description,btnText}:EmptyCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-4xl font-semibold text-center">{title}</h2>
      {

        <Image src={emptycart} alt="empty cart" width={400}  className="mx-auto h-auto" />
      }
      <p className='text-gray-500 text-xl'>{description}</p>
     <Link href={routes.products}> <Button className="mt-4">{btnText}</Button></Link>
    </div>
  )
}

export default EmptyCard
