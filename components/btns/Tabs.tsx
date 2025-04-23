"use client"
import React, { useState } from 'react'

const Tabs = () => {
   

const [activeTab, setActiveTab] = useState<'ordered' | 'delivered' | 'canceled'>('ordered');

const tabs = [
  { label: "Ordered", value: "ordered", ItemsN: 30 },
  { label: "Delivered", value: "delivered", ItemsN: 52 },
  { label: "Canceled", value: "canceled", ItemsN: 12 },
];

  return (
    <div style={{background: 'rgb(18,18,18)'}} className="flex gap-5 w-full
     border-b rounded-tr-lg justify-center  rounded-tl-lg items-center  border-gray-700  mt-6">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => setActiveTab(tab.value as any)}
        className={` font-medium  w-full uppercase flex-1 tracking-wide transition-all duration-200 ${
          activeTab === tab.value
            ? "border-b-2 border-light_blue text-light_blue mt-auto"
            : "border-b-2 border-transparent mt-auto text-white hover:border-light_blue/50"
        }`}
      >
         {tab.label} ({(tab.ItemsN)})
      </button>
    ))}
  </div>
  
  )
}

export default Tabs