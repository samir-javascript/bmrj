import { Skeleton } from "@/components/ui/skeleton"

export default function OrderDetailsSidebarSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 bg-gray-200 w-[250px]" />
        <Skeleton className="h-4 bg-gray-200 w-[200px]" />
      {[0,1,2].map((_,index)=> (
  <div className="gap-3 flex items-start mt-4" key={index}>
  <Skeleton className="h-[125px] bg-gray-200 w-[125px] rounded-xl" />
  <div className="space-y-3">
  <Skeleton className="h-4 bg-gray-200 w-[250px]" />
  <Skeleton className="h-4 bg-gray-200 w-[200px]" />
  <Skeleton className="h-4 bg-gray-200 w-[120px]" />
  <div className="flex items-center justify-between">
  <Skeleton className="h-4 bg-gray-200 w-[100px]" />
  <Skeleton className="h-4 bg-gray-200 w-[50px]" />
  </div>
  </div>
   
  </div>
      ) )}
    
    </div>
  )
}
