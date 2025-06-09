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
import { cn } from "@/lib/utils"; // utility for conditional classNames

const FilterColumn = () => {
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");

  const generateSearchParams = (
    colors: string[],
    categories: string[],
    sort: string,
    sizes: string[]
  ) => {
    const params = new URLSearchParams();
    colors.forEach((color) => params.append("color", color));
    categories.forEach((category) => params.append("category", category));
    sizes.forEach((size) => params.append("size", size));
    if (sort) params.append("sort", sort);
    return params.toString();
  };

  const [searchParams, setSearchParams] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = generateSearchParams(
      checkedColors,
      checkedCategories,
      sortOrder,
      checkedSizes
    );
    setSearchParams(params);
  }, [checkedColors, checkedCategories, sortOrder, checkedSizes]);

  useEffect(() => {
    if (searchParams) router.push(`?${searchParams}`);
  }, [searchParams, router]);

  const handleToggle = (
    item: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <aside className="w-[360px] max-lg:hidden space-y-4">
      <Accordion type="multiple" className="space-y-3">
        {/* SIZE */}
        <AccordionItem value="size">
          <AccordionTrigger className="rounded-md px-3 py-2 bg-muted font-semibold">
            Size
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2">
            <div className="grid grid-cols-3 gap-3 max-h-[240px] overflow-y-auto">
              {sizes.map(({ size }) => (
                <label
                  key={size}
                  className={cn(
                    "cursor-pointer py-1.5 px-3 text-center rounded-md border text-sm capitalize transition-all",
                    checkedSizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-700 hover:border-black"
                  )}
                  onClick={() =>
                    handleToggle(size, checkedSizes, setCheckedSizes)
                  }
                >
                  {size}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* COLOR */}
        <AccordionItem value="color">
          <AccordionTrigger className="rounded-md px-3 py-2 bg-muted font-semibold">
            Color
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2">
            <div className="flex flex-wrap gap-3 max-h-[240px] overflow-y-auto">
              {colorsFilter.map(({ name, color }) => (
                <div
                  key={name}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    handleToggle(name, checkedColors, setCheckedColors)
                  }
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 transition-all",
                      checkedColors.includes(name)
                        ? "border-black scale-105"
                        : "border-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                  <span className="text-sm capitalize">{name}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* CATEGORY */}
        <AccordionItem value="category">
          <AccordionTrigger className="rounded-md px-3 py-2 bg-muted font-semibold">
            Category
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2">
            <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto">
             {[...new Set(categories.map(item => item.name))].map((name) => (
  <label
    key={name}
    className="flex items-center gap-2 cursor-pointer text-sm"
    onClick={() =>
      handleToggle(name, checkedCategories, setCheckedCategories)
    }
  >
    <input
      type="checkbox"
      checked={checkedCategories.includes(name)}
      onChange={() => {}}
      className="accent-black"
    />
    <span className="capitalize">{name}</span>
  </label>
))}

            </div>
          </AccordionContent>
        </AccordionItem>

        {/* SORT BY */}
        <AccordionItem value="sort">
          <AccordionTrigger className="rounded-md px-3 py-2 bg-muted font-semibold">
            Sort By
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2">
            <div className="flex flex-col gap-2">
              {[
                { label: "price - low to high", value: "asc" },
                { label: "price - high to low", value: "desc" },
              ].map((sort) => (
                <label
                  key={sort.value}
                  className={cn(
                    "cursor-pointer px-3 py-1.5 rounded-full border text-sm text-center transition-all",
                    sortOrder === sort.value
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  )}
                  onClick={() => setSortOrder(sort.value)}
                >
                  {sort.label}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterColumn;

