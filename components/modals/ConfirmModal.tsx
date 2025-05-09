"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"


import Alert from "../shared/Alert";
import { LoaderIcon } from "lucide-react";


const ConfirmModal = ({open,setOpen,message,handleClick,loading,error}: {
    open:boolean;
    handleClick:() => void;
   
    setOpen: (v:boolean) => void;
    message:string;
    error?: string;
    loading:boolean
}) => {
//   const [error,setError] = useState<null | string>()
//   const {toast} = useToast()
//   const [loading,setLoading] = useState(false)

  return (
    <Dialog open={open} defaultOpen={false}  onOpenChange={()=> setOpen(false)}>
     
    <DialogContent className="sm:max-w-[425px] w-[95%] bg-white  flex flex-col space-y-2 items-center justify-center text-center">
      <DialogHeader>
        <DialogTitle></DialogTitle>
          {error && (
             <Alert message={error} />
          )}
          <DialogDescription className="font-bold text-[#222] text-[18px] text-center ">
               {message}
          </DialogDescription>
      </DialogHeader>
      
       <div className="flex justify-end items-center gap-3">
     
       <Button onClick={() => setOpen(false)} className="text-black border border-light_blue w-[150px] hover:bg-transparent bg-transparent  rounded-2xl">
           Annuler
       </Button>
       <Button onClick={() => handleClick()} className="text-white  w-[150px] bg-light_blue rounded-2xl">
           {loading ? <><LoaderIcon className="text-white  animate-spin" /> Pending...</> : "Valider"}
       </Button>
       </div>
     
    </DialogContent>
  </Dialog>
  )
}

export default ConfirmModal