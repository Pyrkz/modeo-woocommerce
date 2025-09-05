'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { DzienTatyEmptyState } from '../ui/DzienTatyEmptyState';
import { DzienTatyLoadingState } from '../ui/DzienTatyLoadingState';
import { DzienTatyStatsCard } from '../ui/DzienTatyStatsCard';
import useDzienTatyGiftsOptimized from '../../hooks/useDzienTatyGiftsOptimized';

interface DzienTatyProductsSectionProps {
  id?: string;
}

export const DzienTatyProductsSection = React.memo(({ id = "produkty" }: DzienTatyProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useDzienTatyGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <DzienTatyLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Dzień Ojca.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <DzienTatyEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prezenty Pełne Szacunku dla Taty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {total} wyjątkowych prezentów, które pokażą tacie jak bardzo go cenisz
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DzienTatyStatsCard 
            title="Dostępne Prezenty" 
            value={total.toString()} 
            icon="gift"
          />
          <DzienTatyStatsCard 
            title="Z szacunkiem" 
            value="Dla bohatera" 
            icon="shield"
          />
          <DzienTatyStatsCard 
            title="Jakość" 
            value="Męska i trwała" 
            icon="star"
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

DzienTatyProductsSection.displayName = 'DzienTatyProductsSection';