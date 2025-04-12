
import { auth } from '@/auth'
import LoginForm from '@/components/forms/LoginForm'
import { User } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
  const session = await auth()
  if(session) redirect("/")
  return (
    <div className='flex items-center justify-center w-full py-10'>
        <div className='sm:shadow-md shadow-none rounded-lg px-5 py-4 flex flex-col gap-3 mx-auto lg:min-w-[600px] '>
            <div className='w-[60px] h-[60px] flex mx-auto text-center items-center justify-center border-2 border-light_blue rounded-full '>
                <User className='text-light_blue' size={30} />
            </div>
            <p className="font-bold text-[18px] text-[#333] text-center max-w-[350px] mx-auto">Connectez-vous ou créez votre compte en toute simplicité!</p>
            <LoginForm />

        </div>
    </div>
  )
}

export default page