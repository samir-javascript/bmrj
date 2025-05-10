import {  getProducts } from "@/actions/product.actions";
import DeleteProductBtn from "@/components/btns/DeleteProductBtn";
import Alert from "@/components/shared/Alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ROUTES } from "@/constants/routes";
import {  Edit, Plus } from "lucide-react";
import Link from "next/link";


export default async function Page() {
  const result = await getProducts({})
  return (
    <div className="mt-10 px-4 w-full">
       
        <div className='flex flex-col-reverse mb-5 justify-between sm:items-center sm:flex-row items-start'>
        <h2 className="text-2xl font-semibold !text-white ">Product List</h2>
           
            <div className='max-sm:w-full justify-end flex max-sm:mb-5 '>
            <Link href={ROUTES.createProduct}>
                <Button type="button" className='paragraph-medium 
                    min-h-[46px] px-4 bg-light_blue text-white  py-3 min-w-[175px]'>
                     <Plus />
                      Add new Product
                  </Button>
                  </Link>
            </div>

       </div>
       {result?.data?.products.length! > 0 ? (
        <>
          <Table className="rounded-xl border shadow-sm overflow-hidden">
       
       <TableHeader>
         <TableRow className="text-white bg-black font-semibold">
           <TableHead className="font-semibold text-gray-700">Name</TableHead>
           <TableHead className="font-semibold text-gray-700">Price</TableHead>
           <TableHead className="font-semibold text-gray-700">Category</TableHead>
           <TableHead className="font-semibold text-gray-700">Brand</TableHead>
           <TableHead className="font-semibold text-gray-700">Qty</TableHead>
           <TableHead className="font-semibold text-gray-700 text-center">Image</TableHead>
           <TableHead className="font-semibold text-gray-700 text-center">
              Edit
           </TableHead>
           <TableHead className="font-semibold text-gray-700 text-center">
               Delete
           </TableHead>
         </TableRow>
       </TableHeader>

       <TableBody>
         {result.data?.products.map((item, index) => (
           <TableRow
             key={index}
             className='hover:bg-gray-900 cursor-pointer'
           >
             <TableCell className="font-medium   text-white">{item.name}</TableCell>
             <TableCell className="text-white">${item.price}</TableCell>
             <TableCell className="text-white">{item.category}</TableCell>
             <TableCell className="text-white">{item.brand}</TableCell>
             <TableCell className="text-white">{item.countInStock}</TableCell>
             <TableCell className="flex justify-center items-center py-4">
               <img
                 className="w-[60px] h-[60px] object-cover rounded-md shadow-sm border"
                 src={item.images[0].url}
                 alt={item.name}
               />
             </TableCell>
             <TableCell className="text-white">
               <Link href={`/admin/productsManagement/edit/${item._id}`}>
                  <Edit color='green' />
               </Link>
              
              </TableCell>
              <TableCell className="text-white">
            <DeleteProductBtn productId={item._id} />
        </TableCell>
           </TableRow>
         ))}
       </TableBody>

       
     </Table>
     <div className=" border-t border-gray-200">
           <article className="flex py-5 items-center gap-3 justify-end">
              <Button type="button" className="border border-gray-200 hover:bg-transparent bg-transparent ">
                  Previous
              </Button>
               <div className="rounded-lg px-4 py-2 bg-light_blue text-white ">
                   <span className="font-medium text-sm">5</span>
               </div>
              <Button type="button" className="border border-gray-200 hover:bg-transparent bg-transparent ">
                  Next
              </Button>
           </article>
       </div>
        </>
       ): (
        <div className="w-full mt-5">
            <Alert message="There's no product found in database. go ahead and create one" />
        </div>
         
       )}
    
    </div>
  );
}
