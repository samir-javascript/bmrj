import { getShippingAddress } from '@/actions/shipping.actions'

import React from 'react'
import ShippingCheckout from './_components/ShippingCheckout'

const ShippingPage = async() => {
     const { data } = await getShippingAddress()
    
  return (
    <section className="py-7 max-w-[1500px] mx-auto px-3 ">
       <ShippingCheckout data={data?.shippingAddresses || []} />    
    </section>
  )
}

export default ShippingPage