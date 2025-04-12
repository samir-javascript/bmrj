import { getShippingAddress } from '@/actions/shipping.actions';
import { auth } from '@/auth';
import DeleteShippingBtn from '@/components/btns/DeleteShippingBtn';
import ProfileItems from '@/components/navbar/ProfileItems'
import RightSidebar from '@/components/navbar/RightSidebar'
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from '@/constants/routes'
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import AddressComponent from './_components/AddressComponent';

const page = async () => {
 
  const result = await getShippingAddress()
 
  console.log(result.data)
  return (
     <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5'>
           <ProfileItems  /> 
           <RightSidebar />
           <div className='w-full lg:hidden  h-[10px] bg-gray-100  ' />
           {/* box info */}
           <div className='flex flex-1 flex-col px-3 pt-4 space-y-5'>
             
            
               <div className="border-b border-gray-200 pb-3">
              
                         <h3 className='text-[18px] font-semibold text-[#333] '>Adresses par défaut</h3>
                         
                         
   
                      
             <AddressComponent address={result.data?.shippingAddresses[0]!} />
               </div>
             <div className='py-7'>
             <h3 className='text-[18px] mb-3 font-semibold text-[#333] '>
             Saisies d’adresses supplémentaires
             </h3>
             {result.data?.shippingAddresses.length! > 0 ? (
                 <Table className="rounded-xl border max-sm:hidden shadow-sm overflow-hidden">
                    
                 <TableHeader>
                   <TableRow className="bg-gray-100 hover:bg-gray-100">
                   
                     <TableHead className="font-semibold text-gray-700">Nom</TableHead>
                     <TableHead className="font-semibold text-gray-700">Address</TableHead>
                     <TableHead className="font-semibold text-gray-700">Ville</TableHead>
                     <TableHead className="font-semibold text-gray-700">Code postal</TableHead>
                     <TableHead className="font-semibold text-gray-700 text-center">Téléphone</TableHead>
                     <TableHead className="font-semibold text-gray-700 text-center">
                        Action
                     </TableHead>
                    
                   </TableRow>
                 </TableHeader>
          
                 <TableBody>
                   {result.data?.shippingAddresses.map((item)=> (
<TableRow
   key={item._id} 
className="hover:bg-gray-50 transition-colors duration-200"
>
<TableCell className=" text-gray-600">
{item.name}
</TableCell>
<TableCell className="text-gray-600">
{item.address}
</TableCell>
<TableCell className="text-gray-600">
{item.city}
</TableCell>
<TableCell className="text-gray-600">
{item.postalCode}
</TableCell>
<TableCell className="text-gray-600">
{item.phoneNumber}
</TableCell>


<TableCell className="text-gray-600 flex items-center gap-4">
<Link href={`${ROUTES.editShipping(item._id)}`}>
   <Edit color='green' />
</Link>

   <DeleteShippingBtn id={item._id} />

</TableCell>

</TableRow>
                   ) )}
                    
                
                 </TableBody>
          
                 
               </Table>
             ): (
                <div>
                     <p className='font-normal mb-5 text-[15px] text-[#333] leading-[1.7] '>You don't have any other addresses in your address book.</p>
                </div>
             )}
                 
                  <div className='flex flex-col mt-4 px-3 space-y-1.5 sm:hidden'>
  {result.data?.shippingAddresses.map((item, index) => (
    <div
      className='border-b border-gray-200 pb-3 flex flex-col space-y-1.5'
      key={`${item._id}-${index}`} // unique key for the mapped item
    >
      <div className='flex items-center gap-2'>
        <p className="text-sm text-black font-semibold">Name:</p>
        <p className='text-sm font-normal text-[#333] '>{item.name}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">Address:</p>
        <p className='text-sm font-normal text-[#333] '>{item.address}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">City:</p>
        <p className='text-sm font-normal text-[#333] '>{item.city}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">Country:</p>
        <p className='text-sm font-normal text-[#333] '>{item.country}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">Phone Number:</p>
        <p className='text-sm font-normal text-[#333] '>{item.phoneNumber}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">Postal Code:</p>
        <p className='text-sm font-normal text-[#333] '>{item.postalCode}</p>
      </div>

      <div className='flex items-center gap-1'>
        <p className="text-sm text-black font-semibold">Action:</p>
        <div className='flex items-center gap-2'>
          <Link href={`${ROUTES.editShipping(item._id)}`}>
            <Edit color='green' />
          </Link>
          <span>|</span>
          <DeleteShippingBtn id={item._id} />
        </div>
      </div>
    </div>
  ))}
</div>

                  <Link href={ROUTES.createShipping}>
                  <Button className='rounded-xl bg-light_blue text-white mt-4' type='button'>
                       Ajouter une nouvelle address
                  </Button>
                  </Link>
                 
             </div>
           </div>
       </div>
  )
}

export default page