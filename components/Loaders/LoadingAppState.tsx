import React from 'react'

const LoadingAppState = () => {
  return (
    <div style={{backgroundColor: "rgba(255, 255, 255, .5)"}} className="flex items-center m-auto justify-center fixed z-[999] inset-0  ">
         <div className="flex items-center justify-center">
            <img className="object-contain lg:w-[200px] w-[150px] lg:h-[200px] h-[150px] " src="/loadere.gif" alt="Loading..." />
         </div>
    </div>
  )
}

export default LoadingAppState