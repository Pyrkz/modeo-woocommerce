'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { DzienNauczycielaEmptyState } from '../ui/DzienNauczycielaEmptyState';
import { DzienNauczycielaLoadingState } from '../ui/DzienNauczycielaLoadingState';
import { DzienNauczycielaStatsCard } from '../ui/DzienNauczycielaStatsCard';
import useDzienNauczycielaGiftsOptimized from '../../hooks/useDzienNauczycielaGiftsOptimized';

interface DzienNauczycielaProductsSectionProps {
  id?: string;
}

export const DzienNauczycielaProductsSection = React.memo(({ id = "produkty" }: DzienNauczycielaProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useDzienNauczycielaGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <DzienNauczycielaLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Dzień Nauczyciela.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <DzienNauczycielaEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Przemyślane Prezenty dla Mistrzów Edukacji
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {total} wyjątkowych prezentów, które wyrażą wdzięczność nauczycielom
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DzienNauczycielaStatsCard 
            title="Dostępne Prezenty" 
            value={total.toString()} 
            icon="gift"
          />
          <DzienNauczycielaStatsCard 
            title="Z wdzięcznością" 
            value="Dla pedagogów" 
            icon="academic"
          />
          <DzienNauczycielaStatsCard 
            title="Jakość" 
            value="Edukacyjne i trwałe" 
            icon="book"
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

DzienNauczycielaProductsSection.displayName = 'DzienNauczycielaProductsSection';