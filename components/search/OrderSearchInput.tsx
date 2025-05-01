"use client"
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { Loader, Search , X} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, {useEffect, useState} from 'react'

const OrderSearchInput = () => {
   
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const query = searchParams.get('query')
  
    const [value,setValue] = useState(query || "")
    useEffect(() => {
      
      const delayDebounceFn = setTimeout(()=> {
           if(value) {
              const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'query',
                value: value
              })
              router.push(newUrl, {scroll: false})
           }else {
             if(query)  {
                const newUrl = removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ['query']
                })
                router.push(newUrl, {scroll: false})
             }
           }
         
      },500)
      
      return ()=> clearTimeout(delayDebounceFn)
      
  }, [router, value, pathname, query, searchParams])

  
  return (
    <div style={{background:'rgb(58,58,58)'}} className='flex max-sm:ml-2 max-sm:w-[90%] px-3 shadow-lg w-[300px] 
        lg:w-[500px] py-1.5 rounded-tr-lg rounded-tl-lg items-center justify-between relative'>
            <input value={value}
              type="text"
              onChange={(e) => setValue(e.target.value)}
               className='flex-1 text-white placeholder:text-gray-200 outline-none no-focus bg-transparent' placeholder='Search' />
           {value ? <X size={20} onClick={()=> setValue("")} className='text-gray-400 cursor-pointer' /> : <Search className='text-gray-400' />   } 
        
        </div>
  )
}

export default OrderSearchInput