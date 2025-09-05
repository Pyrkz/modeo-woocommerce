'use client';

import { memo } from 'react';

interface ReviewListSkeletonProps {
  count?: number;
}

export const ReviewListSkeleton = memo(function ReviewListSkeleton({
  count = 3
}: ReviewListSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
          
          {/* Actions skeleton */}
          <div className="pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
});

ReviewListSkeleton.displayName = 'ReviewListSkeleton';