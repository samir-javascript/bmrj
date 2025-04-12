"use client"

import { createCoupon } from "@/actions/coupon.actions"
import { FormEvent, useState } from "react"

const CouponBtn = () => {
  const [coupon,setCoupon] = useState<string>("")
  const [Loading,setLoading] = useState<boolean>(false)
  const handleApplyCoupon = async(e:FormEvent)=> {
    e.preventDefault()
      setLoading(true)
    try {
      const { success } =  await createCoupon({code:coupon.toUpperCase()})
      if(success) {
        setCoupon("")
        setLoading(false)
        // todo: some toast
      }
    } catch (error) {
       console.log(error)
    }finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col space-y-3">
        <h2 className="h2-bold !text-[18px]">Do you have a coupon code ?</h2>
        <form onSubmit={handleApplyCoupon} className="flex items-center h-[50px] py-2.5 rounded-xl border-2 border-light_blue justify-between">
             <input value={coupon.toUpperCase()} onChange={(e)=> setCoupon(e.target.value)} className="flex-1 text-semibold placeholder:text-normal text-gray-700  no-focus outline-none border-none indent-5 " type="text" name="code" id="code" placeholder="code promo" />
             <button type="submit" disabled={!coupon}  className="bg-yellow-400 disabled:bg-gray-200 text-white rounded-lg h-[40px] px-4 text-[17px] font-medium py-2.5 ">
                {Loading ? "Loading" : "Valider"}
             </button>
        </form>
    </div>
  )
}

export default CouponBtn