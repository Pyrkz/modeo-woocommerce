'use client';

import { memo, useMemo } from 'react';
import { Product } from '@/types/product';
import { BrandingProductCard } from './BrandingProductCard';

interface BrandingProductGridProps {
  products: Product[];
  className?: string;
  loadingMore?: boolean;
  onProductInquiry?: (product: Product) => void;
  onScrollToForm?: () => void;
}

const LoadingCard = memo(() => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
    <div className="bg-gray-200 h-4 rounded mb-3"></div>
    <div className="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
    <div className="bg-gray-200 h-6 rounded w-1/2 mb-3"></div>
    <div className="flex gap-2">
      <div className="bg-gray-200 h-10 rounded-lg flex-1"></div>
      <div className="bg-gray-200 h-10 rounded-lg flex-1"></div>
    </div>
  </div>
));
LoadingCard.displayName = 'LoadingCard';

const LoadingGrid = memo<{ count: number }>(({ count }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 transition-all duration-300 ease-in-out">
    {Array.from({ length: count }).map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
));
LoadingGrid.displayName = 'LoadingGrid';

export const BrandingProductGrid = memo<BrandingProductGridProps>(({
  products,
  className = '',
  loadingMore = false,
  onProductInquiry,
  onScrollToForm,
}) => {
  // Memoize product cards to prevent unnecessary re-renders
  const productCards = useMemo(() => {
    return products.map((product, index) => (
      <BrandingProductCard
        key={product.id}
        product={product}
        onInquiry={onProductInquiry}
        onScrollToForm={onScrollToForm}
        priority={index < 4} // Prioritize loading first 4 images
      />
    ));
  }, [products, onProductInquiry, onScrollToForm]);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Brak produktów</h3>
        <p className="text-gray-600">Nie znaleziono produktów w tej kategorii.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Responsive Grid - improved mobile layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 transition-all duration-300 ease-in-out">
        {productCards}
      </div>

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="mt-8">
          <LoadingGrid count={4} />
        </div>
      )}
    </div>
  );
});

BrandingProductGrid.displayName = 'BrandingProductGrid';