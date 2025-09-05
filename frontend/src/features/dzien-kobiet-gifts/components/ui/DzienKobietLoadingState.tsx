'use client';

import { memo } from 'react';

interface LoadingStateProps {
  message?: string;
  showProductsGrid?: boolean;
}

export const DzienKobietLoadingState = memo(({ 
  message = "Ładowanie prezentów na Dzień Kobiet...",
  showProductsGrid = true 
}: LoadingStateProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 max-w-md mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2 max-w-sm mx-auto animate-pulse"></div>
        </div>

        {/* Products Grid Skeleton */}
        {showProductsGrid && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`skeleton-${i}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Message */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full">
            <svg className="w-5 h-5 mr-3 text-purple-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-700">🌸 {message}</span>
          </div>
        </div>
      </div>
    </section>
  );
});

DzienKobietLoadingState.displayName = 'DzienKobietLoadingState';