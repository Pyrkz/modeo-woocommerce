'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { MikolajkiEmptyState } from '../MikolajkiEmptyState';
import { MikolajkiLoadingState } from '../ui/MikolajkiLoadingState';
import useMikolajkiGiftsOptimized from '../../hooks/useMikolajkiGiftsOptimized';

interface MikolajkiProductsSectionProps {
  id?: string;
}

export const MikolajkiProductsSection = React.memo(({ id = "produkty" }: MikolajkiProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useMikolajkiGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <MikolajkiLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Mikołajki.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <MikolajkiEmptyState />;
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

MikolajkiProductsSection.displayName = 'MikolajkiProductsSection';