'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { DzienDzieckaEmptyState } from '../ui/DzienDzieckaEmptyState';
import { DzienDzieckaLoadingState } from '../ui/DzienDzieckaLoadingState';
import { DzienDzieckaStatsCard } from '../ui/DzienDzieckaStatsCard';
import useDzienDzieckaGiftsOptimized from '../../hooks/useDzienDzieckaGiftsOptimized';

interface DzienDzieckaProductsSectionProps {
  id?: string;
}

export const DzienDzieckaProductsSection = React.memo(({ id = "produkty" }: DzienDzieckaProductsSectionProps) => {
  const {
    products,
    loading,
    error,
    total,
    hasMore,
    isEmpty,
    retry,
    loadMore
  } = useDzienDzieckaGiftsOptimized();

  const handleLoadMore = async () => {
    await loadMore();
  };

  if (loading && products.length === 0) {
    return <DzienDzieckaLoadingState />;
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów na Dzień Dziecka.</p>
          <Button onClick={retry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (isEmpty) {
    return <DzienDzieckaEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Magiczne Prezenty dla Małych Odkrywców
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {total} radosnych prezentów, które sprawią dzieciom prawdziwą radość
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DzienDzieckaStatsCard 
            title="Dostępne Prezenty" 
            value={total.toString()} 
            icon="gift"
          />
          <DzienDzieckaStatsCard 
            title="Pełne radości" 
            value="Dla dzieci" 
            icon="sparkles"
          />
          <DzienDzieckaStatsCard 
            title="Jakość" 
            value="Bezpieczne i trwałe" 
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

DzienDzieckaProductsSection.displayName = 'DzienDzieckaProductsSection';