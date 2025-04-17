import React from 'react';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';
import SelectItems from './_components/Select';
import { getSavedProducts } from '@/actions/collection.actions';
import ProductCard from '@/components/cards/ProductCard';
import { Button } from '@/components/ui/button';
import Alert from '@/components/shared/Alert';

const Page = async () => {
  const result = await getSavedProducts({});
  console.log(result, "result")
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 max-sm:pb-5 lg:py-8 gap-5'>
      <ProfileItems />
      <RightSidebar />

      {/* Separator for small screens */}
      <div className='w-full lg:hidden h-[10px] bg-gray-100' />

      {/* Main content */}
      <div className='flex flex-col flex-1 max-sm:px-2 px-3'>
        <div className='flex items-center mb-10 justify-between gap-3'>
          <h2 className='h2-bold max-sm:!text-[15px] whitespace-nowrap'>Ma liste d'envies</h2>
          {result.data?.collection.length! > 0 && (
 <Button type='button' className='rounded-2xl max-sm:text-xs bg-light_blue text-white hover:bg-light_blue '>
 Ajouter tous les produits au panier
</Button>
          )}
           
        </div>
       

        <div className='flex justify-end w-full mb-4'>
          <SelectItems />
        </div>

        <div>
          {result.data?.collection.length! > 0 ? (
           <div className="flex items-center  flex-wrap max-sm:gap-1 gap-3">
                     {result.data?.collection.map((product,index) => (
                         <div key={index}>
                               <ProductCard product={product.productId} />
                         </div>
                     ))}
                     </div>
          ) : (
            <Alert message="Il n’y a aucun article dans votre liste d’envies." />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
