import { getAuthenticatedUserCart } from '@/actions/cart.actions'
import { auth } from '@/auth'
import HomeNavbar from '@/components/navbar/HomeNavbar'
import TopBar from '@/components/navbar/TopBar'
import Footer from '@/components/shared/Footer'
import MobileFooter from '@/components/shared/MobileFooter'
import React from 'react'

const RootLayout = async({children}: {children: React.ReactNode}) => {
  const session = await auth()
  const result = await getAuthenticatedUserCart({userId:session?.user.id!})

  return (
    <main className='min-h-screen w-full'>

       <div className='max-lg:hidden flex'>
      <TopBar />
    </div>
        <HomeNavbar qty={result?.data?.qty || 0} />
        {children}
      <Footer />
      <MobileFooter />
    </main>
  )
}

export default RootLayout