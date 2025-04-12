"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Home } from "lucide-react";
import { AddShippingsModal } from "./AddShippingModal";
import { useState } from "react";
import { IShipping } from "@/database/models/shippingAdress.model";
import { useAppDispatch } from "@/hooks/user-redux";
import { setShippingAddress } from "@/lib/store/shippingSlice";
import { resolve } from "path";
import LoadingAppState from "../Loaders/LoadingAppState";
import { useToast } from "@/hooks/use-toast";


interface Props  {
    open:boolean;
    data: IShipping[] | undefined;
    setOpen: (open: boolean)=> void;
   
}

export function ChooseShippingsModal({open,setOpen,data}:Props) {
  const [openAddShippingModal,setAddShippingModal] = useState(false)
  const [modalType,setModalType] = useState<"createModal" | "editModal">("createModal")
  const [selectedShipping, setSelectedShipping] = useState<IShipping | null>(null);
  const [loading,setLoading] = useState<boolean>(false)
  const {toast} = useToast()
  const dispatch = useAppDispatch()
  const handleChooseShippingAddress = async(item:IShipping)=>  {
     setLoading(true)
     await new Promise((resolve) => setTimeout(resolve, 1000));
     dispatch(setShippingAddress(item))
     setLoading(false)
     setOpen(false)
      return toast({
        title: "success",
      })
  }
  return (
    <div>
       {loading && (
          <LoadingAppState />
       )}
  <Dialog open={open} defaultOpen={false}  onOpenChange={()=> setOpen(false)}>
     
     <DialogContent className="sm:max-w-[800px] px-2 bg-white   flex flex-col
      space-y-4 items-center justify-center text-center">
       <DialogHeader className=" w-full">
         <DialogTitle></DialogTitle>
           
           <DialogDescription className="font-bold  text-[#222] text-[18px] text-center ">
                Choix adresse de livraison
           </DialogDescription>
       </DialogHeader>
       
     
      <div className="w-full h-[500px] overflow-y-auto px-4 py-6 space-y-6">
 <div className="flex flex-col items-center space-y-6">
   <Button
   onClick={() => {
      setOpen(false)
      setModalType("createModal")
      setAddShippingModal(true)

   }}
     type="button"
     className="w-[60%] max-lg:w-full bg-transparent hover:bg-transparent
       border-2 border-light_blue rounded-full h-[40px] text-light_blue"
   >
     <Home />
     Ajouter une nouvelle address
   </Button>

   <div className="flex items-center gap-3 max-lg:w-full w-[50%]">
     <div className="w-full border-b border-gray-200"></div>
     <p>ou</p>
     <div className="w-full border-b border-gray-200"></div>
   </div>

   <h2 className="font-bold text-[18px] text-light_blue text-center">
     J'utilise une adresse enregistrée
   </h2>

   {data?.length! > 0 ? data?.map((item, index) => (
     <div
       key={index}
       className="flex flex-col border-b border-gray-200 pb-3 items-start text-left justify-start max-lg:w-full w-[60%]"
     >
       <div className="mb-3">
         <h4 className="font-semibold text-black text-sm">
           Mrs. {item.name}
         </h4>
         <div className="mt-2">
           <p className="text-sm text-gray-700">
             {item.city} {item.address}
           </p>
           <p className="text-sm text-gray-700">{item.city.toUpperCase()}, {item.postalCode}</p>
           <p className="text-sm text-gray-700">+212{item.phoneNumber} </p>
         </div>
       </div>

       <div className="flex items-center justify-between w-full">
         <Button 
           onClick={()=> handleChooseShippingAddress(item)}
           className="text-white w-[100px] h-[35px] bg-light_blue
            hover:bg-light_blue rounded-full font-medium text-sm"
         >
           Choisir
         </Button>
         <Button 
         onClick={() => {
          setOpen(false)
          setModalType("editModal")
          setSelectedShipping(item)
          setAddShippingModal(true)
       }}
           className="text-light_blue underline w-[100px] h-[35px] bg-transparent hover:bg-transparent rounded-full font-semibold text-sm"
         >
           Modifier
         </Button>
       </div>
     </div>
   )): (
      <div>
          no shipping found
      </div>
   )}
 </div>
</div>

     </DialogContent>
   </Dialog>
   <AddShippingsModal  
   id={selectedShipping?._id || ""}
   shipping={selectedShipping || {} as IShipping}
    SetOpenShippingFirstModal={setOpen}
    open={openAddShippingModal} 
    
    setOpen={setAddShippingModal} 
    type={modalType}  />
    </div>
  
  )
}
