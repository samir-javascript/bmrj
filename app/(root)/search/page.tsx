import { getSuggestionResult } from '@/actions/product.actions'
import ProductCard from '@/components/cards/ProductCard'
import Alert from '@/components/shared/Alert'
import SearchSkeleton from '@/components/skeletons/SearchSkeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async({searchParams}: {searchParams: Promise<{q: string}>}) => {
    const { q } = await searchParams
     const {success, error, data} = await getSuggestionResult({
                  query: q,
                  limit: 20
          })
        
  return (
    <section className="flex flex-col w-full  py-8">
       {error && (
       
         <Alert message={error.message} />
       )}
         <div className="flex flex-col max-w-5xl mx-5 ">
             <div className='lg:flex hidden items-center gap-1'>
                  <Link href="/">
                      <span className="text-sm font-semibold text-light_blue hover:underline ">Accueil</span>
                  </Link>
                  <ChevronRight size={16} />
                  <p className='text-sm font-normal text-[#333] '>Résultats de recherche pour : {q} </p>
             </div>
             <h2 className='mt-3 h2-bold text-black '>Résultats de recherche pour : "{q}"</h2>
              <div className='mt-5 w-full mx-auto'>
          {data?.products.length as number > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                     {data?.products.map((product,index) => (
                         <div key={index}>
                               <ProductCard product={product} />
                         </div>
                     ))}
                     </div>
          ) : (
            <div className='mx-auto w-full'>
               <Alert message="Il n’y a aucun article , try another query." />
            </div>
           
          )}
          {/* {result.data?.collection.length! > 0 && <Pagination page={Number(page) || 1} isNext={result.data?.isNext as boolean} />} */}
        </div>
         </div>
    </section>
  )
}

export default page