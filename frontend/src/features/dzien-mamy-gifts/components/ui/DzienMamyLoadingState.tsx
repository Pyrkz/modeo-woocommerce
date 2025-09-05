'use client';

import React from 'react';
import { HeartIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

export const DzienMamyLoadingState = React.memo(() => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Loading Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <HeartIcon className="w-6 h-6 text-green-500 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-emerald-500 animate-spin" />
            <StarIcon className="w-6 h-6 text-green-600 animate-bounce" />
            <SparklesIcon className="w-5 h-5 text-emerald-500 animate-spin" />
            <HeartIcon className="w-6 h-6 text-green-500 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ładowanie prezentów dla mamy...
          </h2>
          <p className="text-xl text-gray-600">
            Przygotowujemy wyjątkowe prezenty pełne miłości dla najlepszych mam
          </p>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-200"></div>
              
              {/* Content Placeholder */}
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-green-50 rounded-lg p-6 text-center animate-pulse">
              <div className="w-12 h-12 bg-green-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-green-200 rounded mb-2"></div>
              <div className="h-4 bg-green-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

DzienMamyLoadingState.displayName = 'DzienMamyLoadingState';