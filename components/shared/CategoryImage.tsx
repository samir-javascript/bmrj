"use client"
import { useCategoryNames } from '@/constants'
import Image from 'next/image'
import React from 'react'

const CategoryImage = ({categoryName}: {categoryName:string}) => {
       const categoryNames = useCategoryNames()
 

  
  const categoryBanner  = categoryNames.find((item) => item.name.toLowerCase() === categoryName.toLowerCase())
  return (
    <div className="w-full mt-5">
           
             <img  alt={categoryBanner?.name || ""} loading="eager"
               src={categoryBanner?.imageBanner || ""} className="w-full h-full object-contain" />
         </div>
  )
}

export default CategoryImage