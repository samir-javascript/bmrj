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


export function HeroCarousel() {
  const isMobile = useMobile()
const heroItems = [
    {
        imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_mobile.png" : 'https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_desktop.png',
        alt: "first image carousel"
    },
    {
        imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_mobile.png" : 'https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_desktop.png',
        alt: "first image carousel"
    }
    ,{
        imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_mobile.png" : 'https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_desktop.png',
        alt: "first image carousel"
    },{
        imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_mobile.png" : 'https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/Slider_New/AAANQ74234-_slider_desktop.png',
        alt: "first image carousel"
    }
]
  return (
    <Carousel className="relative w-full overflow-hidden">
      <div className="absolute bottom-0 right-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent z-10 " />
      <CarouselContent>
        {heroItems.map((item,index) => (
          <CarouselItem className="w-full" key={index}>
              <img alt={item.alt} src={item.imgSrc} className="object-cover" />
            </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
    </Carousel>
  )
}
