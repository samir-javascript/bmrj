"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";

const SelectItems = () => {
  const content = [
    { name: "10 articles page page", id: 1 },
    { name: "20 articles page page", id: 2 },
    { name: "50 articles page page", id: 3 },
  ];

  const [selectedValue, setSelectedValue] = useState(content[0].name); // Set the default value

  return (
    <div className="w-[200px]">
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="no-focus bg-gray-100 rounded-lg font-medium text-black">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="bg-white">
          {content.map((item) => (
            <SelectItem  className="hover:bg-blue-800 hover:text-white text-sm" value={item.name} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectItems;
