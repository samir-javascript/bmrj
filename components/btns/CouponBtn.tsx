"use client"

import { createCoupon } from "@/actions/coupon.actions"
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux"
import {  getTotalItems } from "@/lib/store/cartSlice"
import { FormEvent, useState } from "react"

const CouponBtn = ({userId}: {
  userId:string
 
}) => {
  const [coupon,setCoupon] = useState<string>("")
  const dispatch = useAppDispatch()
  const [error,setError] = useState<string | null>()

  const [Loading,setLoading] = useState<boolean>(false)
  
  const [textMessage,setTextMessage] = useState("")
  const handleApplyCoupon = async(e:FormEvent)=> {
    e.preventDefault()
      setLoading(true)
    try {
      const { success, error, data } =  await createCoupon({code:coupon.toUpperCase(), userId})
      if(success) {
        setCoupon("")
        setLoading(false)
        // dispatch(applyCoupon({code: coupon, discountAmount: data?.coupon.discount!}))
        setTextMessage("coupon code has been applied")
      }else {
         setError(error?.message)
      }
    } catch (error) {
       console.log(error)
    }finally {
      setLoading(false)
    }
  }
  return (
   <div className="flex flex-col gap-4">
  <h2 className="text-lg font-semibold text-gray-800">Do you have a coupon code?</h2>

  <form
    onSubmit={handleApplyCoupon}
    className="relative flex items-center overflow-hidden rounded-xl border-2 border-blue-100 shadow-sm focus-within:ring-2 focus-within:ring-blue-200 transition-all"
  >
    <input
      value={coupon.toUpperCase()}
      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
      type="text"
      name="code"
      id="code"
      placeholder="Enter your promo code"
      className="w-full px-5 py-3 text-sm font-medium text-gray-800 placeholder-gray-400 bg-white outline-none border-none"
    />

    <button
      type="submit"
      disabled={!coupon}
      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:to-yellow-600 disabled:from-gray-200 disabled:to-gray-200 text-white text-sm font-semibold px-5 transition-all duration-200 disabled:cursor-not-allowed"
    >
      {Loading ? (
        <div className="flex items-center gap-1">
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          Loading
        </div>
      ) : (
        "Apply"
      )}
    </button>
  </form>

  {textMessage && !error && (
    <p className="text-green-500 text-sm font-medium animate-fade-in">{textMessage}</p>
  )}
  {error && (
    <p className="text-red-500 text-sm font-medium animate-fade-in">{error}</p>
  )}
</div>

  )
}

export default CouponBtn