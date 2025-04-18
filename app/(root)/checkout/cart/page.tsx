export const dynamic = 'force-dynamic';

import React from 'react'
import CartItems from '../_components/CartItems'
import { getAuthenticatedUserCart } from '@/actions/cart.actions'
import { auth } from '@/auth'
import { UserCartElement } from '@/types/Elements'

const page = async() => {
     const session = await auth()
    
     
     const userId = session?.user.id || "";

     const result = await getAuthenticatedUserCart({userId})
  return (
    <div className='w-full max-w-7xl mx-auto my-5 '>
         <h1 className='lg:text-4xl text-2xl leading-3 font-bold mb-5 max-lg:text-center w-full max-lg:p-3 '>Mon panier</h1>
        
    <CartItems userId={session?.user.id || ""} 
    isAuthenticated={session?.user.id !== ""}
     data={result.data as unknown as  UserCartElement || undefined} />
       
      
    </div>
  )
}

export default page