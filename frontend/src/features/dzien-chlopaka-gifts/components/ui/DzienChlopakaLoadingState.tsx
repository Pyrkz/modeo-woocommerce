'use client';

import React from 'react';

export const DzienChlopakaLoadingState = React.memo(() => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Loading skeleton for product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              {/* Image placeholder */}
              <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
              
              {/* Title placeholder */}
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              
              {/* Price placeholder */}
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center text-blue-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ładowanie prezentów na Dzień Chłopaka...
          </div>
        </div>
      </div>
    </section>
  );
});

DzienChlopakaLoadingState.displayName = 'DzienChlopakaLoadingState';