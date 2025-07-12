import Link from 'next/link'
import image404 from '@/public/auth/404-svg.jpg'
import { routes } from './lib/routes'
import Image from 'next/image'
import { Home } from 'lucide-react'
import Navbar from '@/components/ui/Navbar'

export default function NotFound() {
    return (
        <>

            <Navbar />
            <div className='flex flex-col items-center justify-center h-screen max-w-md mx-auto gap-4'>
                <div className='relative w-full h-1/2'>
                    <Image src={image404} alt="404" fill />

                </div>
                <h2 className='text-2xl font-bold'>Not Found</h2>
                <p className='text-gray-500'>Could not find requested resource</p>
                <Link href={routes.home} className=' hover:bg-secondary transition-colors flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md'>Return Home <Home className='w-4 h-4' /></Link>
            </div>

        </>
    )
}