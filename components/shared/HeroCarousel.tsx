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
import { IHero } from "@/database/models/heroImages.model"

export function HeroCarousel({ items }: { items: IHero[] }) {
  const isMobile = useMobile()
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Auto-scroll every 5 seconds
  React.useEffect(() => {
    if (!items || items.length <= 1) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000) // change slide every 5s

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [items])

  // Scroll to the correct item
  React.useEffect(() => {
    const container = carouselRef.current?.querySelector(
      "[data-carousel-content]"
    ) as HTMLDivElement

    if (container) {
      const slideWidth = container.clientWidth
      container.scrollTo({
        left: slideWidth * currentIndex,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <Carousel className="relative w-full overflow-hidden" ref={carouselRef}>
      <div className="absolute bottom-0 right-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent z-10" />

      <CarouselContent data-carousel-content>
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
