"use client"
import { useState } from "react"
import Features from '@/components/shared/Features'
import { Button } from '@/components/ui/button'
import { CreditCard, HandCoins } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AddShippingsModal } from "@/components/modals/AddShippingModal"
import { IShipping } from "@/database/models/shippingAdress.model"
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux"
import { useRouter } from "next/navigation"
import { setPaymentMethod } from "@/lib/store/PaymentSlice"
import { createCODorder } from "@/actions/orders.actions"
import { useToast } from "@/hooks/use-toast"
import LoadingAppState from "@/components/Loaders/LoadingAppState"
import { createCheckoutSession } from "@/actions/stripe.actions"
import AlertMessage from "@/components/shared/AlertMessage"
import { useCartItems } from "@/hooks/useCartItems"
import { UserCartElement } from "@/types/Elements"
import { formatPrice } from "@/lib/utils"
import { clearUserCart } from "@/actions/cart.actions"
import { clearCart } from "@/lib/store/cartSlice"
import { orderItemParams } from "@/types/action"
interface props {
  isAuthenticated:boolean;
  data: UserCartElement | undefined
  userId:string
}
const PaymentComponent = ({isAuthenticated,data,userId}:props) => {
    const  { shippingAddress } = useAppSelector((state) => state.shipping)
    const [pending,setPending] = useState<boolean>(false)
   
      const cartItems = useCartItems({isAuthenticated,data})
    const dispatch = useAppDispatch()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"stripe" | "COD">("stripe");

    const router = useRouter()
    if(!shippingAddress) {
      router.replace("/checkout/shipping")
      return;
    }
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | undefined>(undefined)
    const totalQty = cartItems?.reduce((acc:any, item:any) => acc + item.quantity, 0);
    const totalPrice = cartItems?.reduce(
      (acc:any, item:any) => acc + item.quantity * item.price,
      0
    );
    const { toast } = useToast()
    interface props {
       title:string;
       price:string;
       quantity:number,
       image: string[]
       _id:string
    }
    const items = cartItems.map((item:props)  => ({
      name: item.title,
      price: item.price,
      qty: item.quantity,
      images: [item.image],
      product: item._id,
    }))
  
       
  

  //  }
    const handleCreateOrder = async () => {
       
        try {
          if (selectedPaymentMethod === "COD") {
             setPending(true)
            const { success, error } = await createCODorder({
              shippingAddress,
              paymentMethod: selectedPaymentMethod,
              orderStatus: "in preparation",
              shippingPrice: 15,
              itemsPrice: totalPrice,
              totalPrice: totalPrice + 15,
              orderItems: items
            });
      
            if (success) {
              setPending(false)
              await clearUserCart({userId})
              dispatch(clearCart())
              toast({
                title: "Succès",
                description: "Votre commande a été reçue. Consultez votre email pour la confirmation.",
              });
              router.replace("/checkout/success");
              return;
            } else {
              setError(error?.message);
              setPending(false)
              return;
            }
          } else {
             setPending(true)
             const { success, error, data} = await createCheckoutSession({
                cart:  items,
                shippingAddress
             })
             if(success) {
               window.location.href = data?.url as string;
               return
             }else {
                setError(error?.message)
                return
             }
          }
        } catch (error:any) {
          console.log("Order error:", error);
          setError(error?.message)
        }finally {
            setPending(false)
        }
      };
      

  return (
    <>
    {error && (
      <div className="mb-7">
         <AlertMessage message={error} variant="destructive" />
      </div>
           
        )}
 <div className='flex lg:flex-row flex-col px-2 lg:px-5 items-start w-full gap-5'>
        {loading  && (
             <LoadingAppState />
        )}
        
           <div className='flex flex-col flex-1 w-full space-y-4'>
             <RadioGroup  onValueChange={async(value:"stripe" | "COD") => {
    setSelectedPaymentMethod(value);
    setLoading(true)
    await new Promise((resolve)  => setTimeout(resolve, 1000))
    dispatch(setPaymentMethod(value));
    setLoading(false)
  }} defaultValue="stripe">
               <div className='border border-gray-200 flex items-start justify-between rounded-lg px-5 py-3'>
                 <div className='flex items-start gap-x-2'>
                   <RadioGroupItem className='mt-[3px]'  value="stripe" id="stripe" />
                   <div className="flex flex-col">
                     <label htmlFor="stripe" className='font-medium cursor-pointer'>Paiement par carte bancaire</label>
                     <p className='text-sm text-gray-500'>CMI, Payer en toute sécurité avec votre carte bancaire marocaine.</p>
                     <img className="w-[200px] object-contain" src="https://www.marjanemall.ma/media/cmiecom/payment_methods/default/logo_methods.png" alt="Modes de paiement" />
                   </div>
                 </div>
                 <CreditCard className="text-light_blue" />
               </div>
   
               <div className='border border-gray-200 flex items-start justify-between rounded-lg px-5 py-3'>
                 <div className='flex items-start gap-x-2'>
                   <RadioGroupItem className='mt-[3px]' value="COD" id="COD" />
                   <div className="flex flex-col">
                     <label htmlFor="COD" className='font-medium cursor-pointer'>Paiement à la livraison</label>
                     <p className='text-sm text-gray-500'>Paiement lors de la livraison de votre commande à l’adresse de votre choix.</p>
                   </div>
                 </div>
                 <HandCoins className='text-light_blue' />
               </div>
             </RadioGroup>
             <div className='lg:mt-10'>
                 <h3  className='text-[18px] font-semibold text-black mb-3 '>Adresse de facturation</h3>
                 <div className='rounded-lg bg-[#f2f2f2] leading-[1.6] px-5 py-3 flex items-start justify-between'>
                 <div className=" space-y-1 text-sm text-gray-700">
  <p className="font-semibold text-base">Mr. {shippingAddress.name}</p>
  <p>{shippingAddress.city}, {shippingAddress.address}</p>
  <p className="uppercase">{shippingAddress.city}, {shippingAddress.postalCode} {shippingAddress.country}</p>
  <p className="text-gray-600">+212 {shippingAddress.phoneNumber}</p>
</div>

                     <Button
                      onClick={()=> setOpen(true)}
                      type='button' 
                      className='underline bg-transparent hover:bg-transparent w-fit text-light_blue'>
                        Modifier
                     </Button>
                 </div>
             </div>
           </div>
   
           <div className='flex flex-col max-lg:w-full space-y-3'>
             <div className='border w-full lg:w-[450px] flex flex-col border-gray-200 rounded-lg px-3 py-10'>
               <div className='flex items-center justify-between border-b border-gray-100 pb-5'>
                 <p className='text-sm text-[14px] text-[#555] font-semibold'>Total articles({totalQty})</p>
                 <p className='text-sm text-[14px] text-[#555] font-semibold'>
                   {formatPrice(totalPrice)}
                 </p>
               </div>
               <div className='flex items-center justify-between w-full border-b border-gray-100 py-2'>
                 <p className='text-[12px] whitespace-nowrap text-[#999] font-normal'>Frais de livraison</p>
                 <p className='text-[12px] text-[#999] font-normal'>
                   {formatPrice(15)}
                 </p>
               </div>
               <div className='flex items-center justify-between w-full pt-3'>
                 <h4 className='text-[18px] whitespace-nowrap text-light_blue font-bold'>Total à payer</h4>
                 <p className='text-[18px] whitespace-nowrap text-light_blue font-bold'>
                   {formatPrice(totalPrice + 15)}
                 </p>
               </div>
             </div>
             <Button onClick={handleCreateOrder}
              className='w-full bg-light_blue text-white rounded-2xl font-bold h-[46px]'
               type='button'>
                {pending ? "Pending..." : "Confirmer la commande"}  
             </Button>
             <Features />
           </div>
           <AddShippingsModal
            id={shippingAddress._id}
            shipping={shippingAddress as IShipping}
            open={open}
            setOpen={setOpen}
            type="editModal" />
         </div>
    </>
   
  )
}

export default PaymentComponent