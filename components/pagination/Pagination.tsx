"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  page: number | undefined | string;
  isNext: boolean;
}

const Pagination = ({ page = 1, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    let currentPage = typeof page === "string" ? parseInt(page) : page;
    if (isNaN(currentPage)) currentPage = 1;

    const newPage = type === "prev" ? currentPage - 1 : currentPage + 1;
    if (newPage < 1) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("flex w-full items-center justify-center gap-2 mt-5")}>
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
        className="  bg-light_blue flex disabled:bg-[#333] min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-white">Prev</p>
      </Button>

      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{page}</p>
      </div>

      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="bg-light_blue  flex disabled:bg-[#333] min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-white">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
