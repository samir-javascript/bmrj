"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Select = () => {
     const searchParams = useSearchParams();
     const router = useRouter()
    
      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('pageSize', e.target.value);
        params.set('page', '1'); // Optionally reset to first page
        router.push(`?${params.toString()}`);
      };
  return (
    <div>
               <p><span  className="text-white font-medium text-sm">Rows per page</span>: <select  
                 value={searchParams.get('pageSize') || '5'} // default to 10
                 onChange={handleChange}
                className="bg-gray-500
                text-white rounded-lg outline-none no-focus w-[40px] " name="" id="">
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="25">25</option>
                     <option value="50">50</option>
                  </select></p>
                
           </div>
  )
}

export default Select