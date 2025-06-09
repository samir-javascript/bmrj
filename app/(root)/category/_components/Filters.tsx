"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categories, colorsFilter, sizes } from "@/constants";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const FilterColumn = () => {
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");

  // Function to generate search parameters
  const generateSearchParams = (colors: string[], categories: string[], sort: string,sizes: string[]) => {
    const params = new URLSearchParams();
    colors.forEach((color) => {
      params.append("color", color);
    });
    categories.forEach((category) => {
      params.append("category", category);
    });
    sizes.forEach((size) => {
       params.append("size", size)
    })

    if (sort) {
      params.append("sort", sort);
    }
    return params.toString();
  };

  // State to hold the current search parameters
  const [searchParams, setSearchParams] = useState("");
  const router = useRouter();

  // Effect to update searchParams whenever colors, categories, or sort order change
  useEffect(() => {
    const paramsString = generateSearchParams(checkedColors, checkedCategories, sortOrder, checkedSizes);
    setSearchParams(paramsString);
  }, [checkedColors, checkedCategories, sortOrder,checkedSizes]);

  const handleColorChange = (color: string) => {
    if (checkedColors.includes(color)) {
      setCheckedColors(checkedColors.filter((c) => c !== color));
    } else {
      setCheckedColors([...checkedColors, color]);
    }
  };

  const handleCategoryChange = (category: string) => {
    if (checkedCategories.includes(category)) {
      setCheckedCategories(checkedCategories.filter((c) => c !== category));
    } else {
      setCheckedCategories([...checkedCategories, category]);
    }
  };
  const handleSizeChange = (size: string) => {
    if (checkedSizes.includes(size)) {
      setCheckedSizes(checkedSizes.filter((s) => s !== size));
    } else {
      setCheckedSizes([...checkedSizes, size]);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

  useEffect(() => {
    if (searchParams) {
      router.push(`/all-articles?${searchParams}`);
    }
  }, [searchParams, router]);

  return (
    <div className="w-[400px] max-lg:hidden">
      <Accordion type="multiple">
        <AccordionItem value={`item 1`}>
          <AccordionTrigger className="bg-gray-100 flex items-center justify-between w-full rounded-lg px-3 font-bold">
            <p> Size</p>
            <ChevronDown size={16} color="gray" />
          </AccordionTrigger>
          <AccordionContent className="px-3 py-1.5">
            <div className="h-[300px] overflow-y-auto flex flex-col gap-3">
              {sizes.map((item) => (
                <div
                  className="flex items-center border-b border-gray-300 pb-3 gap-1.5"
                  key={item.size}
                >
                  <input type="checkbox" 
                  checked={checkedSizes.includes(item.size)}
                  onChange={() => handleSizeChange(item.size)}
                  />
                  <p className="whitespace-nowrap text-sm text-[#111] capitalize font-normal">
                    {item.size}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`item 2`}>
         <AccordionTrigger className="bg-gray-100 flex items-center justify-between w-full rounded-lg px-3 font-bold">
            <p>Color</p>
            <ChevronDown size={16} color="gray" />
          </AccordionTrigger>
          <AccordionContent className="py-1.5 px-3">
            <div className="h-[300px] overflow-y-auto flex flex-col gap-3">
              {colorsFilter.map((item) => (
                <div
                  className="flex items-center border-b border-gray-300 pb-3 gap-1.5"
                  key={item.color}
                >
                  <input
                    type="checkbox"
                    checked={checkedColors.includes(item.name)}
                    onChange={() => handleColorChange(item.name)}
                  />
                  <div className="flex items-center justify-center rounded-full w-[28px] h-[28px] p-[1px] border-2 border-gray-300">
                    <div
                      style={{ backgroundColor: item.color }}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <p className="whitespace-nowrap text-sm text-[#111] capitalize font-normal">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`item 3`}>
           <AccordionTrigger className="bg-gray-100 flex items-center justify-between w-full rounded-lg px-3 font-bold">
            <p>Category</p>
            <ChevronDown size={16} color="gray" />
          </AccordionTrigger>
          <AccordionContent className="px-3 py-1.5">
            <div className="h-[300px] overflow-y-auto flex flex-col gap-3">
              {categories.map((item,index) => (
                <div
                  className="flex items-center border-b border-gray-300 pb-3 gap-1.5"
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={checkedCategories.includes(item.name)}
                    onChange={() => handleCategoryChange(item.name)}
                  />
                  <p className="whitespace-nowrap text-sm text-[#111] capitalize font-normal">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`item 4`}>
          <AccordionTrigger className="bg-gray-100 flex items-center justify-between w-full rounded-lg px-3 font-bold">
            <p>Sort By</p>
            <ChevronDown size={16} color="gray" />
          </AccordionTrigger>
          <AccordionContent className="px-3 py-1.5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center border-b border-gray-300 pb-3 gap-1.5">
                <input 
                  type="radio" 
                  name="sort" 
                  value="asc"
                  checked={sortOrder === "asc"}
                  onChange={() => handleSortChange("asc")}
                />
                <p className="whitespace-nowrap text-sm text-[#111] capitalize font-normal">
                  price - low to high
                </p>
              </div>
              <div className="flex items-center pb-3 gap-1.5">
                <input 
                  type="radio" 
                  name="sort" 
                  value="desc"
                  checked={sortOrder === "desc"}
                  onChange={() => handleSortChange("desc")}
                />
                <p className="whitespace-nowrap text-sm text-[#111] capitalize font-normal">
                  price - high to low
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterColumn;
