
import React from 'react'
import PaymentComponent from '../../_components/PaymentComponent';

const page = () => {
  return (
    <section className='w-full max-w-[1500px] mx-auto py-8'>
      <h2 className='h1-bold text-primary w-full text-center mb-4 mx-auto'>Mode de paiement</h2>
      <PaymentComponent />
    </section>
  )
}

export default page;
