"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useMobile from "@/hooks/use-mobile"
import { IHero } from "@/database/models/heroImages.model"

export function HeroCarousel({ items }: { items: IHero[] }) {
  const isMobile = useMobile()
 const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 

  return (
    // @ts-ignore
    <Carousel   plugins={[plugin.current]}  onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset} className="relative w-full overflow-hidden" >
      <div className="absolute bottom-0 right-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent z-10" />

      <CarouselContent>
        {items?.map((item) => (
          <CarouselItem className="w-full h-full" key={item._id}>
            <img
              className="w-full h-full object-cover"
              loading="eager"
              src={isMobile ? item.imgUrl.mobile : item.imgUrl.desktop}
              alt={item.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
      <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-80 hover:opacity-100" />
    </Carousel>
  )
}
