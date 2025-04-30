'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Tabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('orderStatus') as 'in preparation' | 'delivered' | 'canceled' | "confirmed") || 'in preparation';

  const tabs = [
    { label: 'In preparation', value: 'in preparation', ItemsN: 30 },
    { label: 'Confirmed', value: 'confirmed', ItemsN: 12 },
    { label: 'Delivered', value: 'delivered', ItemsN: 52 },
    { label: 'Canceled', value: 'canceled', ItemsN: 12 },
  ];

  const handleTabClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('orderStatus', value);
    params.set('page', '1'); // Optional: reset to page 1 when tab changes
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      style={{ background: 'rgb(18,18,18)' }}
      className="flex max-sm:hidden gap-5 w-full border-b rounded-tr-lg justify-center rounded-tl-lg items-center border-gray-700 mt-6"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`font-medium w-full uppercase flex-1 tracking-wide transition-all duration-200 ${
            activeTab === tab.value
              ? 'border-b-2 border-light_blue text-light_blue mt-auto'
              : 'border-b-2 border-transparent mt-auto text-white hover:border-light_blue/50'
          }`}
        >
          {tab.label} ({tab.ItemsN})
        </button>
      ))}
    </div>
  );
};

export default Tabs;
