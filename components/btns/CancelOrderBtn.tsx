"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import ConfirmModal from "../modals/ConfirmModal"
import { useToast } from "@/hooks/use-toast"
import { cancelOrder } from "@/actions/orders.actions"
const CancelOrderBtn = ({orderId}: {
  orderId:string
}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [error,setError] = useState<null | string>()
    const {toast} = useToast()
    const [loading,setLoading] = useState(false)
    const handleCancelOrder = async()=> {
       try {
        setLoading(true)
         const { success, error } = await cancelOrder({orderId})
         if(success) {
            setOpen(false)
            return toast({
              title: "success",
              description: "order has been canceled",
            })
         }else {
            setError(error?.message)
         }
       } catch (error) {
         console.log(error)
       }finally {
        setLoading(false)
       }
    }
  return (
    <>
         <Button onClick={() => setOpen(true)} className="h-fit  py-1.5 flex-1 border border-light_blue bg-transparent
                      hover:bg-transparent text-light_blue max-sm:w-fit rounded-full text-xs font-bold">
                        annuler <br className=" hidden" /> la commande
         </Button>
         {/* <CancelOrderModal orderId={orderId} open={open} setOpen={setOpen} /> */}
         <ConfirmModal loading={loading}
          handleClick={handleCancelOrder}
          error={error || ""}
           message="Are you sure you want to delete this order ?"
            open={open} setOpen={setOpen} />
    </>
  )
}

export default CancelOrderBtn