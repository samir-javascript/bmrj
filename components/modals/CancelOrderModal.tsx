"use client"
import { cancelOrder } from "@/actions/orders.actions";
// order status : annuler en preparation confirmee delivrer,
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import Alert from "../shared/Alert";
import { LoaderIcon } from "lucide-react";


const CancelOrderModal = ({open,setOpen,orderId}: {
    open:boolean;
    orderId:string
    setOpen: (v:boolean) => void;
}) => {
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
    <Dialog open={open} defaultOpen={false}  onOpenChange={()=> setOpen(false)}>
     
    <DialogContent className="sm:max-w-[425px] w-[95%] bg-white  flex flex-col space-y-2 items-center justify-center text-center">
      <DialogHeader>
        <DialogTitle></DialogTitle>
          {error && (
             <Alert message={error} />
          )}
          <DialogDescription className="font-bold text-[#222] text-[18px] text-center ">
              Êtes-vous sûr(e) de vouloir annuler cette commande ?
          </DialogDescription>
      </DialogHeader>
      
       <div className="flex justify-end items-center gap-3">
     
       <Button onClick={() => setOpen(false)} className="text-black border border-light_blue w-[150px] hover:bg-transparent bg-transparent  rounded-2xl">
           Annuler
       </Button>
       <Button onClick={() => handleCancelOrder()} className="text-white  w-[150px] bg-light_blue rounded-2xl">
           {loading ? <><LoaderIcon className="text-white  animate-spin" /> Pending...</> : "Valider"}
       </Button>
       </div>
     
    </DialogContent>
  </Dialog>
  )
}

export default CancelOrderModal