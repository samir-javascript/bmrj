import React from 'react'
import UserDetailsForm from '../../_components/UserDetailsForm';
import { IUser } from '@/database/models/user.model';
import { getUserWithShipping } from '@/actions/user.actions';
import Alert from '@/components/shared/Alert';

const page = async({params}: {params:Promise<{id:string}>}) => {
    const { id } = await params;
    const { error, data } = await getUserWithShipping({userId:id})
    if(!data || error) {
       return (
        <div className='my-5 w-[80%] '>
<Alert message={error?.message || "Something went wrong"} />

        </div>
       )
    }
  return (
    <div className='w-full py-8 max-lg:px-3 '>
        <div className="flex w-full flex-row items-start gap-5">
             <div style={{background: "rgb(18,18,18)"}} className="rounded-lg w-full flex flex-col px-4 py-3 flex-1">
                 <h3 className='text-gray-100 font-medium text-[18px] tracking-wide '>Identity</h3>
                 <UserDetailsForm canChangePasswordPromise userWithShipping={data} />
             </div>
             <div className="lg:flex hidden">
                  end side
             </div>
        </div>
    </div>
  )
}

export default page