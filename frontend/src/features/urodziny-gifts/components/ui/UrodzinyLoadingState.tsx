'use client';

import React from 'react';

export const UrodzinyLoadingState = React.memo(() => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mr-3"></div>
            <span className="text-lg text-gray-600">Ładowanie prezentów urodzinowych...</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Przygotowujemy najlepsze produkty na urodziny</p>
        </div>
        
        {/* Loading skeleton */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

UrodzinyLoadingState.displayName = 'UrodzinyLoadingState';