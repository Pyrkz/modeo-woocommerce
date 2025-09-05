'use client';

import { memo } from 'react';

const GiftOccasionCardSkeleton = memo(() => (
  <div className="flex flex-col items-center p-6 text-center min-h-[200px] border border-gray-200 rounded-lg animate-pulse">
    {/* Icon skeleton */}
    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
    
    {/* Content skeleton */}
    <div className="flex-1 flex flex-col justify-center w-full">
      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-full mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-1" />
    </div>
    
    {/* Arrow skeleton */}
    <div className="mt-auto pt-4">
      <div className="w-5 h-5 bg-gray-200 rounded" />
    </div>
  </div>
));

GiftOccasionCardSkeleton.displayName = 'GiftOccasionCardSkeleton';

export default GiftOccasionCardSkeleton;