'use client';

import { memo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import DzienBabciEmptyState from './DzienBabciEmptyState';
import { Product } from '../types';

interface DzienBabciGiftsGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  onRetry?: () => void;
  className?: string;
}

const DzienBabciGiftsGrid = memo(({
  products,
  loading = false,
  error = null,
  onAddToCart,
  onRetry,
  className = ''
}: DzienBabciGiftsGridProps) => {
  
  // Loading State
  if (loading && products.length === 0) {
    return (
      <div className={className}>
        {/* Loading Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading Message */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full">
            <svg className="w-5 h-5 mr-3 text-purple-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-700">💐 Wczytujemy prezenty dla babci...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error && products.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Wystąpił problem
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Spróbuj ponownie
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty State
  if (products.length === 0 && !loading) {
    return (
      <div className={className}>
        <DzienBabciEmptyState onRetry={onRetry} />
      </div>
    );
  }

  // Success State - Products Grid
  return (
    <div className={className}>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            priority={index < 4} // Prioritize first 4 images for LCP
            className="transform hover:-translate-y-1 transition-transform duration-200"
          />
        ))}
      </div>

      {/* Loading More State */}
      {loading && products.length > 0 && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full">
            <svg className="w-4 h-4 mr-3 text-purple-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-700">Wczytywanie kolejnych produktów...</span>
          </div>
        </div>
      )}

      {/* Error Loading More */}
      {error && products.length > 0 && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full border border-red-200">
            <span className="text-sm text-red-600 mr-3">{error}</span>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Spróbuj ponownie
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

DzienBabciGiftsGrid.displayName = 'DzienBabciGiftsGrid';

export default DzienBabciGiftsGrid;