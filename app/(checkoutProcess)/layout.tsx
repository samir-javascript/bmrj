import React from 'react'
import Navbar from './_components/Navbar'

const CheckoutProcessLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
         <Navbar />
         {children}
    </div>
  )
}

export default CheckoutProcessLayout