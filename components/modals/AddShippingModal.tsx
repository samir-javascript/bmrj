"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"

import ShippingForm from "../forms/ShippingForm";
import { createShippingAddress, editShippingAddress } from "@/actions/shipping.actions";
import { editShippingSchema, ShippingSchemaValidation } from "@/lib/zod";
import { ChevronLeft } from "lucide-react";
import EditShippingForm from "../forms/EditShippingForm";
import { IShipping } from "@/database/models/shippingAdress.model";


interface Props  {
    open:boolean;
    setOpen: (open: boolean)=> void;
    SetOpenShippingFirstModal?: (open:boolean)=> void;
    type: "createModal" | "editModal";
    id:string;
    shipping:IShipping
}
export function AddShippingsModal({open,setOpen,type,id,shipping, SetOpenShippingFirstModal}:Props) {
 
  return (
    <Dialog open={open} defaultOpen={false}  onOpenChange={()=> setOpen(false)}>
     
      <DialogContent className="sm:max-w-[500px] px-2 bg-white   flex flex-col
       space-y-4  ">
        <DialogHeader className=" w-full">
          <DialogTitle></DialogTitle>
            
            <DialogDescription className="font-bold   text-[#222] text-[22px] text-center ">
                 {type === "createModal" ? "Ajouter une adresse de livraison": "Modifier votre addresse de livraison"}
            </DialogDescription>
        </DialogHeader>
        {SetOpenShippingFirstModal && (
          <div onClick={()=> {
           setOpen(false)
           SetOpenShippingFirstModal(true)
        } } className="flex items-center gap-2 cursor-pointer">
            <ChevronLeft className="text-primary" />
            <p className="font-semibold text-primary text-sm ">Retour aux adresses</p>
        </div>
        )}
        
       
       <div className="w-full h-[450px] overflow-y-auto px-4 py-6 space-y-6">
         {type === "createModal" ? (
          <ShippingForm type={"CREATE"}
       isModal={true}
        defaultValues={{
        name: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        postalCode: ""
      }} onSubmit={createShippingAddress}
         schema={ShippingSchemaValidation} />
         ): (
          <EditShippingForm shipping={shipping} closeModal={()=> setOpen(false)} id={id} isModal />           
         )}
       
       </div>

      </DialogContent>
    </Dialog>
  )
}
