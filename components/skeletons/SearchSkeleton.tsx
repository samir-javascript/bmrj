import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SearchSkeleton = () => {
  return (
   <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 bg-gray-200 w-[350px]" />
        <Skeleton className="h-4 bg-gray-200 w-[300px]" />
    <div className=' w-full '>
        
 <div className="flex items-center mx-auto flex-wrap max-sm:gap-1 gap-3">
                      {[0,1,2,3,4,5,6,7,8,9,10,11,22,58,67].map((_,index) => (
                         <div key={index}>
                               <Skeleton className='w-[180px] max-sm:w-[165px] h-[330px] rounded-lg ' />
                         </div>
                     ))}
                     </div>
         
          {/* {result.data?.collection.length! > 0 && <Pagination page={Number(page) || 1} isNext={result.data?.isNext as boolean} />} */}
        </div>
    
    </div>
  )
}

export default SearchSkeleton