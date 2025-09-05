'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { DzienDziadkaEmptyState } from '../ui/DzienDziadkaEmptyState';
import { DzienDziadkaLoadingState } from '../ui/DzienDziadkaLoadingState';
import { DzienDziadkaStatsCard } from '../ui/DzienDziadkaStatsCard';
import useDzienDziadkaGiftsOptimized from '../../hooks/useDzienDziadkaGiftsOptimized';

interface DzienDziadkaProductsSectionProps {
  id?: string;
}

export const DzienDziadkaProductsSection = React.memo(({ id = "produkty" }: DzienDziadkaProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useDzienDziadkaGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <DzienDziadkaLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Dzień Dziadka.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <DzienDziadkaEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dostojne Prezenty Pełne Szacunku dla Dziadka
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {total} wyjątkowych prezentów, które pokażą dziadkowi jak bardzo go szanujesz
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DzienDziadkaStatsCard 
            title="Dostępne Prezenty" 
            value={total.toString()} 
            icon="gift"
          />
          <DzienDziadkaStatsCard 
            title="Z szacunkiem" 
            value="Dla mędrca" 
            icon="shield"
          />
          <DzienDziadkaStatsCard 
            title="Jakość" 
            value="Dostojne i trwałe" 
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

DzienDziadkaProductsSection.displayName = 'DzienDziadkaProductsSection';