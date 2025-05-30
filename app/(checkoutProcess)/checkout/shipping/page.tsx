import { getShippingAddress } from '@/actions/shipping.actions'

import React from 'react'
import ShippingCheckout from './_components/ShippingCheckout'
import { auth } from '@/auth'
import { getAuthenticatedUserCart } from '@/actions/cart.actions'
import { UserCartElement } from '@/types/Elements'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

const ShippingPage = async() => {
  const session = await auth()
  if(!session) redirect(`${ROUTES.signup}?shipping=true`)
     const { data } = await getShippingAddress()
    const result = await getAuthenticatedUserCart({userId: session?.user.id})
  return (
    <section className="py-7 max-w-[1500px] mx-auto px-3 ">
       <ShippingCheckout cartData={result.data as unknown as  UserCartElement || undefined}
         isAuthenticated={session.user.id !== ""} data={data?.shippingAddresses || []} />    
    </section>
  )
}

export default ShippingPage