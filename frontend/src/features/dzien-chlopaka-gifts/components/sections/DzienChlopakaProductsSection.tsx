'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { DzienChlopakaEmptyState } from '../DzienChlopakaEmptyState';
import { DzienChlopakaLoadingState } from '../ui/DzienChlopakaLoadingState';
import useDzienChlopakaGiftsOptimized from '../../hooks/useDzienChlopakaGiftsOptimized';

interface DzienChlopakaProductsSectionProps {
  id?: string;
}

export const DzienChlopakaProductsSection = React.memo(({ id = "produkty" }: DzienChlopakaProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useDzienChlopakaGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <DzienChlopakaLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Dzień Chłopaka.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <DzienChlopakaEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Products Grid */}
        <div className="mb-8">
          <ProductGrid 
            products={products}
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

DzienChlopakaProductsSection.displayName = 'DzienChlopakaProductsSection';