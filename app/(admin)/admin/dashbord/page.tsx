import { Button } from '@/components/ui/button'
import { DollarSign, Plus, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Chart } from '../../_components/Chart'
import { formatFullDateTime, formatPrice } from '@/lib/utils'
import { getUsers, getUserStats } from '@/actions/user.actions'
import { ROUTES } from '@/constants/routes'
import { getOrders } from '@/actions/orders.actions'

// Reusable Box component
const StatBox = ({
   label,
   value,
   icon: Icon,
   blobColor
  
 }: {
   label: string
   value: number | string
   icon: React.ElementType
   blobColor?:string
  
 }) => {
   return (
     <div
       style={{
         boxShadow:
           '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
       }}
       className="relative flex items-center w-full bg-[rgb(18,18,18)] p-4 rounded-lg justify-between overflow-hidden"
     >
       {/* Background Circle */}
       <div
         className="absolute top-1/2 left-0 block h-[200%] aspect-square
          -translate-x-[30%] -translate-y-[60%] rounded-full opacity-8 z-0 bg-light_blue"
        //style={{ backgroundColor: blobColor }}
       />
 
       {/* Icon */}
       <div className="z-10">
         <Icon className="text-[rgb(49,17,54)]" />
       </div>
 
       {/* Text */}
       <div className="flex flex-col text-right text-white z-10">
         <p>{label}</p>
         <p>{value}</p>
       </div>
     </div>
   )
 }
 
 

const Page = async() => {
   const {data,error,success} = await getUsers({})
  const { data:dashboardOrders, error:dashboardOrdersError} = await getOrders({})
  const result = await getUserStats()
  
  return (
    <div className="w-full px-3 py-8">
      {/* Welcome Section */}
      <div
        style={{
          background:
            'linear-gradient(45deg, rgb(171, 71, 188) 0%, rgb(243, 229, 245) 50%, rgb(100, 141, 174) 100%)',
        }}
        className="p-5 rounded-lg flex items-start justify-between"
      >
        <div className="flex flex-col space-y-2 max-w-[550px]">
          <h3 className="lg:text-[22px] text-[18px] font-medium">
            Welcome to the React Admin E-Commerce Demo
          </h3>
          <p className="text-sm font-medium leading-[1.8]">
            This is the admin of an imaginary poster shop. Feel free to explore and modify the data – it's local to your computer and will reset each time you reload.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link href={ROUTES.createProduct}>
             <Button className="text-white bg-light_blue">
              <Plus className="mr-1" />
              Add NEW Products
            </Button>
            </Link>
            <Link href={ROUTES.adminUsersList}>
             <Button className="bg-light_blue text-white">
              <User className="mr-1" />
              Check Users
            </Button>
            </Link>
           
          </div>
        </div>

        <img
          className="w-[150px] object-contain rounded-lg lg:block hidden"
          src="https://img.freepik.com/free-vector/flat-customer-service-week-illustration_23-2149644201.jpg?semt=ais_hybrid&w=740"
          alt="Dashboard Illustration"
        />
      </div>

      {/* Dashboard Content */}
      <div className="flex lg:flex-row flex-col mt-6 gap-3 w-full">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row gap-3">
          <StatBox label="Monthly Revenue" value={formatPrice(dashboardOrders?.monthlyRevenue as number)} icon={DollarSign} blobColor="rgb(206,147,216)" />
<StatBox label="New Orders" value={dashboardOrders?.ordersCount as number} icon={User} blobColor="rgb(255,138,101)" />

          </div>
          <div style={{background: "rgb(18,18,18)"}} className="bg-[(rgb(18,18,18))] rounded-lg p-4 shadow mt-3">
            {/* <h4 className="text-lg font-semibold mb-2">Revenue Chart</h4> */}
            {/* Add a chart component here */}
            <div className="h-auto flex items-center justify-center text-gray-400">
                <Chart data={result.data!} />
            </div>
          </div>
          <div style={{background: "rgb(18,18,18)"}} className="rounded-lg  shadow mt-3">
            <h4 className="text-lg font-semibold p-3 text-white mb-4">Pending Orders</h4>
            {/* Add order summary here */}
            <div className="flex flex-col space-y-3">
                {dashboardOrders?.orders.map((order,index) => (
                   <Link href="/" className='flex items-center px-2.5 py-1.5 hover:bg-gray-800 justify-between w-full' key={index}>
                        <div className='flex items-center lg:gap-3 gap-2'>
                           <img className='rounded-full w-[45px] h-[45px] object-contain '
                            src={order?.user?.image || "https://marmelab.com/posters/avatar-98.jpeg?size=32x32"} alt={order?.user?.name || ""} />
                            <div className='flex flex-col'>
                                <p className='text-white font-medium text-sm '>
                                   {formatFullDateTime(new Date(order.createdAt))}
                                </p>
                                <p className='text-gray-400 font-medium text-sm '>by {order?.user?.name} {" "} {order?.user?.lastName || ""}, {order.orderItems.length} items</p>
                            </div>
                        </div>
                        <div>
                           <p className='text-white font-semibold text-sm '>
                             {formatPrice(order.totalPrice)}
                           </p>
                        </div>
                   </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col w-full">
          <StatBox label="Pending Reviews" value="12 430 $US" icon={DollarSign} blobColor="rgb(100,171,285)" />
          <div style={{
         boxShadow:
           '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
       }}
        className="border-t flex flex-col bg-[rgb(18,18,18)] ">
           
               {[0,1,2,3,4,5,6,7].map((_,index)=> (
                   <Link href="/" className='flex items-start lg:gap-3 gap-2 py-3  px-3 hover:bg-[rgb(30,30,30)]' key={index}>
                        <img className='w-[35px] h-[35px] rounded-full'
                         src="https://marmelab.com/posters/avatar-98.jpeg?size=32x32" alt="" />
                         <p className='text-white font-medium text-sm line-clamp-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam odit ducimus libero corrupti explicabo ex suscipit ut error amet illo.</p>
                   </Link>
               ))}
            </div>
          </div>
          <div className="flex flex-col w-full">
          <StatBox label="New Customers" value={formatPrice(data?.totalSpent as number)} icon={User} blobColor="rgb(100,181,200)" />
            <div style={{
         boxShadow:
           '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
       }}
        className="border-t flex flex-col bg-[rgb(18,18,18)] ">
           
               {data && !error ? data?.users.map((user,index)=> (
                   <Link href={ROUTES.adminUserDetails(user._id)} className='flex items-center lg:gap-3 gap-2 py-2  px-3 hover:bg-[rgb(30,30,30)]' key={index}>
                        <img className='w-[35px] h-[35px] rounded-full'
                         src={user?.image || "https://marmelab.com/posters/avatar-98.jpeg?size=32x32"} alt={user.name} />
                         <p className='text-white font-medium text-sm lg:text-[16px] '>
                           {user.name} {" "} {user.lastName}
                         </p>
                   </Link>
               )): (
                   <p className='text-red-500 font-semibold text-sm '>
                      {error?.message}
                   </p>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
