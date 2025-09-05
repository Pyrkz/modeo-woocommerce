'use client';

import { memo, useCallback, useMemo } from 'react';
import { Product } from '@/types/product';
import { useRelatedProducts } from '../hooks/useRelatedProducts';
import FeaturedProductsSection from '@/features/featured/components/FeaturedProductsSection';

interface RelatedProductsSectionProps {
  currentProduct: Product;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
  limit?: number;
}

/**
 * Related Products Section that reuses FeaturedProductsSection component
 * with custom content and related products logic
 */
export const RelatedProductsSection = memo<RelatedProductsSectionProps>(({
  currentProduct,
  onAddToCart,
  className = '',
  limit = 8
}) => {
  const { products, loading, error } = useRelatedProducts({
    currentProduct,
    limit,
    enabled: true
  });

  // Generate dynamic content based on current product
  const sectionContent = useMemo(() => {
    const primaryCategory = currentProduct.categories?.[0]?.name;
    
    
    return {
      title: 'Podobne produkty',
      subtitle: primaryCategory 
        ? `Sprawdź inne produkty z kategorii "${primaryCategory}"`
        : `Inne produkty, które mogą Cię zainteresować`,
      badgeText: 'Polecane'
    };
  }, [currentProduct]);

  const handleAddToCart = useCallback(async (
    productId: number,
    quantity = 1,
    variation?: { [key: string]: string }
  ) => {
    if (onAddToCart) {
      try {
        await onAddToCart(productId, quantity, variation);
      } catch (error) {
        console.error('Failed to add related product to cart:', error);
        // Could add toast notification here
      }
    }
  }, [onAddToCart]);

  // Don't render if there are no products or if loading with no cached products
  if (!products?.length && !loading) {
    return null;
  }

  // Show loading skeleton if no products yet
  if (loading && products.length === 0) {
    return (
      <div className={`py-16 px-4 md:px-6 lg:px-8 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            </div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn('Related products error:', error);
    return null; // Fail silently for better UX
  }

  return (
    <FeaturedProductsSection
      title={sectionContent.title}
      subtitle={sectionContent.subtitle}
      badgeText={sectionContent.badgeText}
      products={products}
      onAddToCart={handleAddToCart}
      showIndicators={false}
      className={`bg-white ${className}`}
    />
  );
});

RelatedProductsSection.displayName = 'RelatedProductsSection';