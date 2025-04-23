"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import CancelOrderModal from "../modals/CancelOrderModal"
const CancelOrderBtn = ({orderId}: {
  orderId:string
}) => {
    const [open,setOpen] = useState<boolean>(false)
  return (
    <>
         <Button onClick={() => setOpen(true)} className="h-fit py-1.5 flex-1 border border-light_blue bg-transparent
                      hover:bg-transparent text-light_blue max-sm:w-fit rounded-full text-xs font-bold">
                        annuler <br className="max-sm:block hidden" /> la commande
         </Button>
         <CancelOrderModal orderId={orderId} open={open} setOpen={setOpen} />
    </>
  )
}

export default CancelOrderBtn