
import React from 'react'
import CartItems from '../_components/CartItems'

const page = () => {
     
  return (
    <div className='w-full max-w-7xl mx-auto my-5 '>
         <h1 className='lg:text-4xl text-2xl leading-3 font-bold mb-5 max-lg:text-center w-full max-lg:p-3 '>Mon panier</h1>
   
    <CartItems />
       
      
    </div>
  )
}

export default page