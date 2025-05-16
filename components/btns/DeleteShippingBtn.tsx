"use client"
import { deleteShipping } from '@/actions/shipping.actions'
import { useToast } from '@/hooks/use-toast'
import { useAppDispatch } from '@/hooks/user-redux'
import  { clearShippingAddress } from '@/lib/store/shippingSlice'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import LoadingAppState from '../Loaders/LoadingAppState'

const  DeleteShippingBtn = ({id}: {id:string}) => {
   const [loading,setLoading] = useState<boolean>(false)
   const{ toast} = useToast()
  
   const dispatch = useAppDispatch()
    const handleDeleteShipping = async() => {
       setLoading(true)
        try {
          const {error,success} =   await deleteShipping({id})
          if(success) {
         
            dispatch(clearShippingAddress())
            return toast({
              title: "Success",
              description: "shipping address has been removed "
            })
          }else {
            toast({
              title: "Error",
              description: error?.message,
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
    <div>
       {loading && (
         <LoadingAppState />
       )}
   <button disabled={loading} className='w-fit' type='button'>
        <Trash onClick={handleDeleteShipping} className={`${loading && "opacity-50"} cursor-pointer`} color='red' />
    </button>
    </div>
 
  )
}

export default DeleteShippingBtn