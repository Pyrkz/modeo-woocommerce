'use client';

import React, { useMemo } from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { UrodzinyEmptyState } from '../ui/UrodzinyEmptyState';
import { UrodzinyLoadingState } from '../ui/UrodzinyLoadingState';
import useUrodzinyGiftsOptimized from '../../hooks/useUrodzinyGiftsOptimized';
import { Product } from '@/types/product';
import { UrodzinyProduct } from '../../types';

interface UrodzinyProductsSectionProps {
  id?: string;
}

// Transform UrodzinyProduct to Product format
const transformUrodzinyProduct = (urodzinyProduct: UrodzinyProduct): Product => {
  return {
    id: urodzinyProduct.id,
    name: urodzinyProduct.name,
    slug: urodzinyProduct.slug,
    description: urodzinyProduct.description,
    short_description: urodzinyProduct.short_description,
    images: urodzinyProduct.images.map(img => ({
      id: img.id,
      src: img.src,
      thumbnail: img.src, // Use src as thumbnail fallback
      alt: img.alt,
    })),
    prices: {
      price: urodzinyProduct.price,
      regular_price: urodzinyProduct.regular_price,
      sale_price: urodzinyProduct.sale_price,
      currency_symbol: 'zł',
      currency_code: 'PLN'
    },
    stock_status: urodzinyProduct.in_stock ? 'instock' : 'outofstock',
    is_in_stock: urodzinyProduct.in_stock,
    permalink: `/product/${urodzinyProduct.slug}`,
    type: 'simple',
    featured: urodzinyProduct.featured,
    categories: urodzinyProduct.categories,
    tags: urodzinyProduct.tags,
  };
};

export const UrodzinyProductsSectionClean = React.memo(({ id = "produkty" }: UrodzinyProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useUrodzinyGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  // Transform UrodzinyProducts to Products for compatibility
  const transformedProducts = useMemo(() => 
    products.map(transformUrodzinyProduct), 
    [products]
  );

  if (loading && products.length === 0) {
    return <UrodzinyLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na urodziny.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <UrodzinyEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Products Grid */}
        <div className="mb-8">
          <ProductGrid 
            products={transformedProducts}
          />
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3"
            >
              {loading ? 'Ładowanie...' : 'Pokaż więcej prezentów'}
            </Button>
          </div>
        )}

        {/* Error Message */}
        {error && products.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={retry}>
              Spróbuj ponownie
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

UrodzinyProductsSectionClean.displayName = 'UrodzinyProductsSectionClean';