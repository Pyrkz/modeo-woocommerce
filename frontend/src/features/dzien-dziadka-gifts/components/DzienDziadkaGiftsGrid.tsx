'use client';

/**
 * Dzień Dziadka Gifts Grid Component
 * Responsive product grid for Grandfather's Day gifts
 */

import { memo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/features/shop/types';
import { DZIEN_DZIADKA_COLORS } from '../types';

interface DzienDziadkaGiftsGridProps {
  products: Product[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

function DzienDziadkaGiftsGrid({
  products,
  loading = false,
  hasMore = false,
  onLoadMore,
  className = ''
}: DzienDziadkaGiftsGridProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={`dzien-dziadka-${product.id}`}
            product={product}
            priority={index < 4} // Prioritize first 4 products
            className="h-full"
          />
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className={`w-5 h-5 border-2 border-${DZIEN_DZIADKA_COLORS.primary} border-t-transparent rounded-full animate-spin`}></div>
            <span className="text-gray-600">Ładowanie prezentów...</span>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && onLoadMore && (
        <div className="mt-12 text-center">
          <button
            onClick={onLoadMore}
            className={`
              bg-${DZIEN_DZIADKA_COLORS.primary} 
              hover:bg-${DZIEN_DZIADKA_COLORS.accent} 
              text-white font-medium py-3 px-6 rounded-md 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-${DZIEN_DZIADKA_COLORS.primary} focus:ring-offset-2
            `}
          >
            Pokaż więcej prezentów
          </button>
        </div>
      )}

      {/* Products Count */}
      {products.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Wyświetlono {products.length} {products.length === 1 ? 'prezent' : 'prezentów'}
            {hasMore && ' - więcej dostępnych'}
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(DzienDziadkaGiftsGrid);