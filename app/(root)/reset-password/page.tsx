import ResetAccountPassword from '@/components/forms/ResetAccountPassword'

import { User } from 'lucide-react'
import React from 'react'

const page = async({searchParams}: {searchParams: Promise<{code:string}>}) => {
  const { code } = await searchParams
  return (
    <div  className='w-full h-full py-10 flex items-center justify-center'>
        <div className='shadow-xl lg:w-[500px] w-[95%] mx-auto rounded-lg
         items-center
         gap-3
           text-center px-4 pt-3 pb-7 flex flex-col '>
              <div className='rounded-full border-[3px] border-light_blue
               flex items-center justify-center
               p-3 

              '>
                   <User size={22} className='text-light_blue font-bold' />
              </div>
              <p className='font-bold text-black text-[18px] '>Reset account password</p>
             <ResetAccountPassword code={code} />
        </div>
    </div>
  )
}

export default page