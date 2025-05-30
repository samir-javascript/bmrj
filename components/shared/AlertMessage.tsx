
import React from 'react'
import { TriangleAlert } from "lucide-react"
const AlertMessage = ({message,variant,isAuth,}: {
    message:string;
    variant: "default" | "destructive"
    isAuth?:boolean
   
}) => {
  return (
      <div className={`border-[3px] ${variant === "destructive" ? "border-red-500" : "border-light_blue"}  max-w-[350px] h-auto relative mx-auto rounded-lg px-4 py-3`}>
          <div className={` absolute p-2 top-0 bottom-0 left-0 h-full w-[15px] ${variant === "destructive" ? "bg-red-500" : "bg-light_blue"}`} />
          <div className='flex flex-col ml-6'>
              <div className='flex items-center gap-1.5'>
                <TriangleAlert color={`${variant === "destructive" ? "red" : "yellow"}`} />
                <p className={`${isAuth ? "text-white" : "text-black"} font-bold text-[18px] leading-[1.6]`}>Important Message!</p>
              </div>
              <p className={`mt-3 font-medium text-[14px] leading-[1.7] ${isAuth ? "text-white" : "text-black"} `}>
                 {message}
              </p>
          </div>
      </div>
  )
}

export default AlertMessage