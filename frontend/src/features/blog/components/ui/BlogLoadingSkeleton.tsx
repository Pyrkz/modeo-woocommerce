'use client';

import { memo } from 'react';

interface BlogLoadingSkeletonProps {
  variant?: 'featured' | 'list';
  className?: string;
}

const BlogLoadingSkeleton = memo(({ 
  variant = 'featured',
  className = '' 
}: BlogLoadingSkeletonProps) => {
  if (variant === 'featured') {
    return (
      <div className={`animate-pulse ${className}`}>
        {/* Image skeleton */}
        <div className="h-72 sm:h-96 lg:h-[500px] bg-gray-200 rounded-2xl mb-6" />
        
        {/* Content skeleton */}
        <div className="space-y-4">
          {/* Category */}
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          
          {/* Meta */}
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div className={`animate-pulse flex gap-4 p-4 ${className}`}>
      {/* Small image skeleton */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-2">
        {/* Category */}
        <div className="h-4 bg-gray-200 rounded-full w-16" />
        
        {/* Title */}
        <div className="space-y-1">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Date */}
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
});

BlogLoadingSkeleton.displayName = 'BlogLoadingSkeleton';

export { BlogLoadingSkeleton };