"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";

const SelectOrderStatus = ({status}: {
  status:string
}) => {
  const content = [
    { status: "delivered" },
    { status:  "confirmed" },
    { status: "in preparation" },
    {status: "canceled"}
  ];

  const [selectedValue, setSelectedValue] = useState(status || content[0].status); // Set the default value

  return (
    <div className="w-[150px]">
      <Select value={selectedValue} defaultValue={status} onValueChange={setSelectedValue}>
        <SelectTrigger className="no-focus capitalize bg-gray-100 rounded-lg font-medium text-black">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="bg-white">
          {content.map((item,index) => (
            <SelectItem  className="hover:bg-blue-800 capitalize hover:text-white text-sm" defaultValue={status} value={item.status} key={index}>
              {item.status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOrderStatus;