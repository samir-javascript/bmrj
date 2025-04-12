"use client"


import { openOrderDetails } from "@/lib/store/cartSlice"
import { Button } from "../ui/button"
import { useAppDispatch } from "@/hooks/user-redux"

const OpenOrderDetailsBtn = () => {
 const dispatch = useAppDispatch()
  return (
    <>
         <Button onClick={()=> dispatch(openOrderDetails())} className='max-sm:rounded-lg max-sm:h-[40px] rounded-full h-fit bg-light_blue text-white text-xs lg:text-sm font-bold ' type="button">
                          Details de la <br className="max-sm:flex hidden" /> commande
         </Button>
    </>
  )
}

export default OpenOrderDetailsBtn