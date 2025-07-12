import { Progress } from '@/components/ui/progress'
import React from 'react'

const loading = () => {
  return (
   <Progress value={50} className='h-1 w-full fixed top-0 left-0 right-0 z-50 bg-primary'/>
  )
}

export default loading