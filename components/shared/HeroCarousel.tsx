"use client"
import * as React from "react"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useMobile from "@/hooks/use-mobile"
import Image from "next/image"
import { CldImage } from "next-cloudinary"
import { IHero } from "@/database/models/heroImages.model"


export function HeroCarousel({items}: {
   items: IHero[]
}) {
  const isMobile = useMobile()

  return (
    <Carousel className="relative w-full overflow-hidden">
      <div className="absolute bottom-0 right-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent z-10 " />
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem className="w-full h-full" key={item._id}>
              {/* <CldImage priority loading="eager" alt={item.title}
              
               quality={1000}
               format="webp"
               src={isMobile ? item.imgUrl.mobile : item.imgUrl.desktop}
              fill className="object-cover h-full w-full" /> */}
               <img className="w-full h-full" loading="eager" src={isMobile ?
                 item.imgUrl.mobile : item.imgUrl.desktop} alt={item.title} />
            </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
    </Carousel>
  )
}
