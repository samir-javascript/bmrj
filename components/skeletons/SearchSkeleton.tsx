import React from 'react';
import { Skeleton } from '../ui/skeleton';

const SearchSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Heading skeletons */}
      <Skeleton className="h-4 w-[350px] bg-gray-200" />
      <Skeleton className="h-4 w-[300px] bg-gray-200" />

      {/* Product cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[280px] w-full bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default SearchSkeleton;
