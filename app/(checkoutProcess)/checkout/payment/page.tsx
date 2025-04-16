
import React from 'react'
import PaymentComponent from '../../_components/PaymentComponent';
import { auth } from '@/auth';
import { getAuthenticatedUserCart } from '@/actions/cart.actions';
import { UserCartElement } from '@/types/Elements';

const page = async() => {
  const session = await auth()
  const result = await getAuthenticatedUserCart({userId:session?.user.id!})
  return (
    <section className='w-full max-w-[1500px] mx-auto py-8'>
      <h2 className='h1-bold text-primary w-full text-center mb-4 mx-auto'>Mode de paiement</h2>
      <PaymentComponent userId={session?.user.id!} isAuthenticated={session?.user.id !== ""} data={result.data as unknown as UserCartElement | undefined} />
    </section>
  )
}

export default page;
