import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import emptycart from "@/public/auth/empty-card.webp";
import { title } from 'process';
interface  EmptyCardProps  {
title:String,
description:String,
btnText:String
}
const EmptyCard = ({title,description,btnText}:EmptyCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      {

        <Image src={emptycart} alt="empty cart" width={400} height={400} className="mx-auto" />
      }
      <p>{description}</p>
      <Button className="mt-4">{btnText}</Button>
    </div>
  )
}

export default EmptyCard
