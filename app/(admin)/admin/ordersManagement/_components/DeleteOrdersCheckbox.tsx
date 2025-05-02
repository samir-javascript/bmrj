"use client"
import { deleteSelectedOrders } from '@/actions/orders.actions'
import Tabs from '@/components/btns/Tabs'
import LoadingAppState from '@/components/Loaders/LoadingAppState'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { formatFullDateTime, formatPrice } from '@/lib/utils'
import { Order } from '@/types/Elements'
import { ArrowDown, Trash, X } from 'lucide-react'
import React, {useState} from 'react'

const DeleteOrdersCheckbox = ({data}: {
    data: {
        orders: Order[];
        isNext: boolean;
    }
}) => {
  const {toast} = useToast()
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [selectAll, setSelectAll] = useState(false)
    const [loading,setLoading] = useState<boolean>(false)
     const handleDeleteOrder = async()=> {
      setLoading(true)
        try {
            const {error,success, message} = await deleteSelectedOrders({ordersId:selectedOrders})
            if(error) {
               return toast({
                 title: "Error occured",
                 description: error.message,
                 variant: "destructive"
               })
            }else if(success){
              setSelectedOrders([])
              return toast({
                title: "Success",
                description: message
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
         {selectedOrders.length > 0 && (
  <div className="bg-light_blue py-3 px-4 rounded-tr-lg rounded-tl-lg flex items-center justify-between ">
  <div className='flex items-center gap-2.5'>
    <div
      onClick={() => setSelectedOrders([])}
      className='w-[30px] h-[30px] rounded-full transition-all duration-200 flex items-center justify-center hover:bg-secondary cursor-pointer'>
      <X color="gray" size={20} />
    </div>
    <p className='text-white font-medium text-[16px] tracking-wide'>
      {selectedOrders.length} item{selectedOrders.length > 1 ? 's' : ''} selected
    </p>
  </div>
  <Button
    onClick={() => handleDeleteOrder()}
    className='bg-transparent w-fit h-fit hover:bg-red-300 '>
    <Trash color="red" />
    <p className='text-red-500 uppercase font-medium text-[15px] '>Delete</p>
  </Button>
</div>
         )}
         <Tabs />
         <table className="min-w-full divide-y max-sm:hidden divide-gray-600 text-sm text-left">
  <thead className=" text-white bg-black font-semibold">
    <tr>
      <th className="px-4 py-3">
      <Checkbox
  checked={selectAll}
  onCheckedChange={(checked) => {
    if (checked) {
      const allOrderIds = data.orders.map(order => order._id)
      setSelectedOrders(allOrderIds)
    } else {
      setSelectedOrders([])
    }
    setSelectAll(!!checked)
  }}
/>

      </th>
      <th className="px-4 py-3 flex items-center gap-2">
         <span>Date</span>
         <ArrowDown color="gray"/>
      </th>
      <th className="px-4 py-3">
         Reference
      </th>
      <th className="px-4 py-3">
         Customer
      </th>
      <th className="px-4 py-3">
         Address
      </th>
      <th className="px-4 py-3 lg:whitespace-nowrap">
         NB items
      </th>
      <th className="px-4 py-3 lg:whitespace-nowrap">
         Payment Method
      </th>
      <th className="px-4 py-3">
         Total
      </th>
    </tr>
  </thead>
  <tbody style={{background: "rgb(30,30,30)"}} className="divide-y  divide-gray-600">
    {/* Example row — map through your data here */}
    {data && data.orders.length > 0 ? data?.orders?.map((order,index)=> (
        <tr className='hover:bg-gray-900 cursor-pointer' key={index}>
        <td className="px-4 py-3 text-white">
        <Checkbox 
  checked={selectedOrders.includes(order._id)}
  onCheckedChange={(checked) => {
    let updated: string[]
    if (checked) {
      updated = [...selectedOrders, order._id]
    } else {
      updated = selectedOrders.filter(id => id !== order._id)
    }
    setSelectedOrders(updated)
    setSelectAll(updated.length === data.orders.length)
  }}
  
  // onCheckedChange={(checked) => {
  //   if (checked) {
  //     setSelectedOrders((prev) => [...prev, order._id])
  //   } else {
  //     setSelectedOrders((prev) => prev.filter(id => id !== order._id))
  //   }
  // }}
/>
        </td>
        <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>
           {formatFullDateTime(new Date(order.createdAt))}
           </span>
        </td>
        <td className="px-4 py-3">
          <span className='text-white font-medium text-normal '>
            {order._id}
          </span>
          </td>
        <td className="px-4 py-3 flex mx-auto items-center gap-2 h-full text-center  font-medium">
            <img className='w-[30px] h-[30px] object-contain rounded-full'
             src={order?.user?.image || "https://marmelab.com/posters/avatar-58.jpeg?size=25x25"} alt={order?.user?.name} />
            <p className='text-light_blue text-sm  underline '>
                {order?.user?.name} 
            </p>
        </td>
        <td className="px-4 py-3 ">
          <p className="text-sm text-white font-medium ">
             {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}, <span className='underline text-light_blue'>+212 {order.shippingAddress.phoneNumber} </span>
          </p>
        </td>
        <td className="px-4 py-3">
          <span className="text-white font-medium text-normal">
             {order.orderItems.reduce((acc,x) => acc + x.qty, 0 )}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-white font-medium text-normal">
             {order.paymentMethod}
          </span>
        </td>
        <td className="px-4 py-3">
          <p className='font-bold text-white text-[16px] '>
             {formatPrice(order.totalPrice)}
          </p>
        </td>
      </tr>
    ) ): (
       <div>
          no orders shiit
       </div>
    )}
   
    {/* Repeat rows */}
  </tbody>
         </table>
     </div>
  )
}
export default DeleteOrdersCheckbox