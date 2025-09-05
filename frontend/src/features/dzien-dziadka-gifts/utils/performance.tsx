/**
 * Performance utilities for Dzień Dziadka gifts feature
 */

import { memo } from 'react';
import { DZIEN_DZIADKA_COLORS } from '../types';

/**
 * Skeleton loader for the main page
 */
export const DzienDziadkaGiftsPageSkeleton = memo(() => (
  <div className="w-full py-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="text-center">
        <div className="h-8 bg-gray-300 rounded mx-auto mb-4 max-w-md"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto mb-2 max-w-2xl"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto max-w-xl"></div>
      </div>
    </div>

    {/* Grid Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <DzienDziadkaProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    </div>
  </div>
));

DzienDziadkaGiftsPageSkeleton.displayName = 'DzienDziadkaGiftsPageSkeleton';

/**
 * Skeleton loader for individual product cards
 */
export const DzienDziadkaProductCardSkeleton = memo(() => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="aspect-square bg-gray-300"></div>
    
    {/* Content Skeleton */}
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded max-w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded max-w-1/2"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-300 rounded max-w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>
));

DzienDziadkaProductCardSkeleton.displayName = 'DzienDziadkaProductCardSkeleton';

/**
 * Loading spinner component
 */
export const DzienDziadkaLoadingSpinner = memo(({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-${DZIEN_DZIADKA_COLORS.primary} border-t-transparent rounded-full animate-spin`}></div>
  );
});

DzienDziadkaLoadingSpinner.displayName = 'DzienDziadkaLoadingSpinner';

/**
 * Error boundary fallback for Dzień Dziadka components
 */
export const DzienDziadkaErrorFallback = memo(({ 
  error, 
  resetError 
}: { 
  error: Error; 
  resetError: () => void;
}) => (
  <div className="w-full py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <div className="text-4xl mb-4">😔</div>
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Coś poszło nie tak
        </h2>
        <p className="text-red-600 mb-4">
          Wystąpił błąd podczas ładowania prezentów na Dzień Dziadka.
        </p>
        <div className="space-y-2 text-sm text-red-500 mb-6">
          <p>Szczegóły błędu: {error.message}</p>
        </div>
        <button
          onClick={resetError}
          className={`
            bg-${DZIEN_DZIADKA_COLORS.primary} 
            hover:bg-${DZIEN_DZIADKA_COLORS.accent} 
            text-white font-medium py-2 px-4 rounded-md 
            transition-colors duration-200
          `}
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  </div>
));

DzienDziadkaErrorFallback.displayName = 'DzienDziadkaErrorFallback';

/**
 * Performance monitoring hook
 */
export const useDzienDziadkaPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const mark = (name: string) => {
      performance.mark(`dzien-dziadka-${name}`);
    };

    const measure = (name: string, startMark: string, endMark: string) => {
      performance.measure(
        `dzien-dziadka-${name}`,
        `dzien-dziadka-${startMark}`,
        `dzien-dziadka-${endMark}`
      );
    };

    return { mark, measure };
  }

  return { 
    mark: () => {}, 
    measure: () => {} 
  };
};