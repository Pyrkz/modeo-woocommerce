'use client';

import React, { memo } from 'react';

const SkeletonItem = () => (
  <div className="flex gap-4 py-4 border-b border-gray-100 animate-pulse">
    {/* Image skeleton */}
    <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
    
    {/* Content skeleton */}
    <div className="flex-1">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    
    {/* Remove button skeleton */}
    <div className="w-5 h-5 bg-gray-200 rounded"></div>
  </div>
);

export const CartLoadingSkeleton = memo(() => {
  return (
    <div className="px-6 py-4">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
});

CartLoadingSkeleton.displayName = 'CartLoadingSkeleton';