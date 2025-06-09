"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { brands, categories, colorsFilter, sizes } from "@/constants";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileFilterColumn = () => {
  const [open, setOpen] = useState(false);
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedBrands,setCheckedBrands] = useState<string[]>([]);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");

  const router = useRouter();

  const generateSearchParams = (
    colors: string[],
    categories: string[],
    brands: string[],
    sort: string,
    sizes: string[]
  ) => {
    const params = new URLSearchParams();
    colors.forEach((c) => params.append("color", c));
    categories.forEach((c) => params.append("category", c));
    brands.forEach((b) => params.append("category", b));
    sizes.forEach((s) => params.append("size", s));
    if (sort) params.append("sort", sort);
    return params.toString();
  };

  const applyFilters = () => {
    const query = generateSearchParams(
      checkedColors,
      checkedCategories,
      checkedBrands,
      sortOrder,
      checkedSizes
    );
    router.push(`?${query}`);
    setOpen(false); // close sheet after apply
  };

  const clearFilters = () => {
    setCheckedColors([]);
    setCheckedCategories([]);
    setCheckedSizes([]);
    setSortOrder("");
  };

  const toggle = (
    val: string,
    arr: string[],
    set: (val: string[]) => void
  ) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="lg:hidden w-full">
      <Sheet open={open} onOpenChange={setOpen}>
       <div className="fixed bottom-0 left-0 w-full  border-t border-gray-200  z-[40] lg:hidden">
    <SheetTrigger asChild>
      <Button variant="outline" className="w-full bg-light_blue text-white !rounded-none ">
        Filter
      </Button>
    </SheetTrigger>
  </div>

        <SheetContent side="right" className="w-[90vw] z-[50] bg-white overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl">Filters</SheetTitle>
          </SheetHeader>

          <Accordion type="multiple" className="space-y-3">
            {/* Size Filter */}
            <AccordionItem value="size">
              <AccordionTrigger className="text-base font-semibold">Size</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(({ size }) => (
                    <button
                      key={size}
                      onClick={() => toggle(size, checkedSizes, setCheckedSizes)}
                      className={cn(
                        "text-sm rounded-md border px-3 py-1.5 capitalize transition",
                        checkedSizes.includes(size)
                          ? "bg-black text-white border-black"
                          : "border-gray-300 text-gray-700"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Color Filter */}
            <AccordionItem value="color">
              <AccordionTrigger className="text-base font-semibold">Color</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-3">
                  {colorsFilter.map(({ name, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-2"
                      onClick={() => toggle(name, checkedColors, setCheckedColors)}
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
                      <span className="capitalize text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Category Filter */}
            <AccordionItem value="category">
              <AccordionTrigger className="text-base font-semibold">Category</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                   {[...new Set(categories.map((item)=> item.name ))].map(( name ) => (
                    <label
                      key={name}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                      onClick={() =>
                        toggle(name, checkedCategories, setCheckedCategories)
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
 {/** BRAND */}
         <AccordionItem value="brand">
          <AccordionTrigger className="rounded-md px-3 py-2 bg-muted font-semibold">
            Brand
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2">
            <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto">
             {brands.map((brandName,index) => (
  <label
    key={index}
    className="flex items-center gap-2 cursor-pointer text-sm"
    onClick={() =>
      toggle(brandName, checkedBrands, setCheckedBrands)
    }
  >
    <input
      type="checkbox"
      checked={checkedCategories.includes(brandName)}
      onChange={() => {}}
      className="accent-black"
    />
    <span className="capitalize">{brandName}</span>
  </label>
))}

            </div>
          </AccordionContent>
        </AccordionItem>
            {/* Sort Filter */}
            <AccordionItem value="sort">
              <AccordionTrigger className="text-base font-semibold">Sort By</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Price - Low to High", value: "asc" },
                    { label: "Price - High to Low", value: "desc" },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSortOrder(s.value)}
                      className={cn(
                        "text-sm rounded-full border px-3 py-1.5 capitalize transition",
                        sortOrder === s.value
                          ? "bg-black text-white border-black"
                          : "border-gray-300 text-gray-700"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Footer Actions */}
          <SheetFooter className="mt-6 flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Clear All
            </Button>
            <SheetClose asChild>
              <Button onClick={applyFilters} className="w-full text-white bg-light_blue">
                Apply Filters
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilterColumn;
