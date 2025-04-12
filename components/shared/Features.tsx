import { features } from '@/constants'
import React from 'react'

const Features = () => {
  return (
     <div className="rounded-lg bg-secondary lg:py-7 py-3 lg:px-5 px-3 flex max-lg:justify-between lg:flex-col max-lg:items-center space-y-3 ">
                  {
                    features.map((item,index) => (
                        <div key={index} className={` max-lg:${!item.show && "hidden"}  flex lg:flex-row flex-col   items-center gap-2`}>
                            <div className='rounded-full w-[45px] h-[45px] bg-primary flex items-center justify-center '>
                               <item.icon size={26}  color="white" />
                            </div>
                           
                            <p className='text-white max-sm:text-[12px] font-semibold leading-4 text-center '>{item.title} </p>
                        </div>
                    ))
                  }
             </div>
  )
}

export default Features