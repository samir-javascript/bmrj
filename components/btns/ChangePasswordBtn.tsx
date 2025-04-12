"use client"
import React, { useState } from 'react'
import SetPasswordModal from '../modals/SetPasswordModal'

const ChangePasswordBtn = ({email,text}: {email:string, text:string}) => {
    const [open,setOpen] = useState<boolean>(false)
  return (
     <div>
<button onClick={() => setOpen(true)} className='underline whitespace-nowrap paragraph-semibold text-light_blue'
 type="button">
    {text}
 </button>
   <SetPasswordModal email={email} open={open} setOpen={setOpen} />
     </div>
    
  )
}

export default ChangePasswordBtn