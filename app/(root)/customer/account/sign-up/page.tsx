import { getAuthenticatedUserCart } from '@/actions/cart.actions'
import { auth } from '@/auth'

import AuthForm from '@/components/forms/AuthForm'
import { ROUTES } from '@/constants/routes'

import { User } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
   const session = await auth();
  if(session) redirect("/")
 
   
    
    return (
       <div className='relative flex items-center justify-center min-h-screen px-4 py-10 !overflow-x-hidden'>
  {/* Blurred background image */}
  <div className="absolute inset-0 bg-auth-image bg-center bg-cover bg-no-repeat blur-sm scale-105 z-0"></div>
        <div className='sm:shadow-md shadow-none rounded-lg px-5 py-4 flex flex-col gap-3 mx-auto lg:min-w-[600px] '>
            <div className='w-[60px] h-[60px] flex mx-auto text-center
             items-center justify-center border-2 border-light_blue rounded-full '>
                <User className='text-light_blue' size={30} />
            </div>
            <p className="font-bold text-[18px] text-[#fff] text-center
             max-w-[350px] mx-auto">Connectez-vous ou créez votre compte en toute simplicité!</p>
            <AuthForm  />
        </div>
    </div>
    )
   
}

export default page