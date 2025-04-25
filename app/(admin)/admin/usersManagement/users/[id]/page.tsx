import React from 'react'
import UserDetailsForm from '../../_components/UserDetailsForm';
import { IUser } from '@/database/models/user.model';

const page = async({params}: {params:Promise<{id:string}>}) => {
    const { id } = await params;
  return (
    <div className='w-full py-8 max-lg:px-3 '>
        <div className="flex w-full flex-row items-start gap-5">
             <div style={{background: "rgb(18,18,18)"}} className="rounded-lg w-full flex flex-col px-4 py-3 flex-1">
                 <h3 className='text-gray-100 font-medium text-[18px] tracking-wide '>Identity</h3>
                 <UserDetailsForm canChangePasswordPromise user={{} as IUser} />
             </div>
             <div className="lg:flex hidden">
                  end side
             </div>
        </div>
    </div>
  )
}

export default page