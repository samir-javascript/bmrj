"use client"
// order status : annuler en preparation confirmee delivrer,
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"


const CancelOrderModal = ({open,setOpen}: {
    open:boolean;
    setOpen: (v:boolean) => void;
}) => {
  return (
    <Dialog open={open} defaultOpen={false}  onOpenChange={()=> setOpen(false)}>
     
    <DialogContent className="sm:max-w-[425px] bg-white  flex flex-col space-y-2 items-center justify-center text-center">
      <DialogHeader>
        <DialogTitle></DialogTitle>
         
          <DialogDescription className="font-bold text-[#222] text-[18px] text-center ">
              Êtes-vous sûr(e) de vouloir annuler cette commande ?
          </DialogDescription>
      </DialogHeader>
      
       <div className="flex justify-end items-center gap-3">
     
       <Button onClick={() => setOpen(false)} className="text-black border border-light_blue w-[150px] hover:bg-transparent bg-transparent  rounded-2xl">
           Annuler
       </Button>
       <Button className="text-white w-[150px] bg-light_blue rounded-2xl">
           Valider
       </Button>
       </div>
     
    </DialogContent>
  </Dialog>
  )
}

export default CancelOrderModal