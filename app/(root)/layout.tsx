import HomeNavbar from '@/components/navbar/HomeNavbar'
import TopBar from '@/components/navbar/TopBar'
import React from 'react'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='min-h-screen w-full'>

       <div className='max-lg:hidden flex'>
      <TopBar />
    </div>
        <HomeNavbar />
        {children}
    </main>
  )
}

export default RootLayout