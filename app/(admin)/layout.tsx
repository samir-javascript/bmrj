import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


const AdminLayout = async({children}: {children: React.ReactNode}) => {
  const session = await auth()
   if(!session) redirect("/")
  if(session?.user?.isAdmin === false) redirect("/")
  return (
    <main className=''>
        <Navbar />
        <div style={{background: "rgb(49, 49, 49)"}} className='flex lg:gap-5 min-h-[100vh] w-full'>
          <Sidebar />
           {children}
        </div>
         
    </main>
  )
}

export default AdminLayout