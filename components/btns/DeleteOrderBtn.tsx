"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { TrashIcon } from 'lucide-react'
import LoadingAppState from '../Loaders/LoadingAppState'
import { useToast } from '@/hooks/use-toast'
import { deleteOrderById } from '@/actions/orders.actions'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
const DeleteOrderBtn = ({id}: {
    id:string
}) => {
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const {toast} = useToast()
    const handleDeleteOrder = async()=> {
        setLoading(true)
       try {
          const { error , success, message } = await deleteOrderById({id})
          if(success) {
              toast({
                title: "Success",
                description: message
             })
             router.push(ROUTES.adminOrdersList)
             return
          }else if(error) {
            return toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
             })
          }
       } catch (error) {
          console.log(error)
       }finally {
        setLoading(false)
       }
    }
  return (
    <>
     {loading && (
         <LoadingAppState />
     )}
 <Button onClick={handleDeleteOrder} className="bg-transparent text-red-500 hover:bg-red-200 rounded-xl w-fit h-fit ">
    <TrashIcon /> Delete
  </Button>
    </>
   
  )
}

export default DeleteOrderBtn