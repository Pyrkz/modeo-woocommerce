'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { ZwierzakiEmptyState } from '../ui/ZwierzakiEmptyState';
import { ZwierzakiLoadingState } from '../ui/ZwierzakiLoadingState';
import { ZwierzakiStatsCard } from '../ui/ZwierzakiStatsCard';
import useZwierzakiGiftsOptimized from '../../hooks/useZwierzakiGiftsOptimized';

interface ZwierzakiProductsSectionProps {
  id?: string;
}

export const ZwierzakiProductsSection = React.memo(({ id = "produkty" }: ZwierzakiProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useZwierzakiGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <ZwierzakiLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów dla miłośników zwierząt.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <ZwierzakiEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prezenty Pełne Miłości do Zwierząt
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {total} wyjątkowych prezentów, które pokażą miłość do czworonożnych przyjaciół
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ZwierzakiStatsCard 
            title="Dostępne Prezenty" 
            value={total.toString()} 
            icon="gift"
          />
          <ZwierzakiStatsCard 
            title="Z miłością" 
            value="Do zwierząt" 
            icon="paw"
          />
          <ZwierzakiStatsCard 
            title="Jakość" 
            value="Urocze i trwałe" 
            icon="heart"
          />
        </div>

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

ZwierzakiProductsSection.displayName = 'ZwierzakiProductsSection';