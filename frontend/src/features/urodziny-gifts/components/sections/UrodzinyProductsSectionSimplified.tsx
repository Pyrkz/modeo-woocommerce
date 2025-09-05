'use client';

import React from 'react';
import ProductGrid from '@/components/ui/ProductGrid';
import { Button } from '@/components/ui/Button';
import { UrodzinyEmptyState } from '../ui/UrodzinyEmptyState';
import { UrodzinyLoadingState } from '../ui/UrodzinyLoadingState';
import { UrodzinyStatsCardSimplified } from '../ui/UrodzinyStatsCardSimplified';
import useUrodzinyGiftsOptimizedFixed from '../../hooks/useUrodzinyGiftsOptimizedFixed';

interface UrodzinyProductsSectionProps {
  id?: string;
}

export const UrodzinyProductsSectionSimplified = React.memo(({ id = "produkty" }: UrodzinyProductsSectionProps) => {
  const { state, actions } = useUrodzinyGiftsOptimizedFixed({
    featured: true,
    search: 'birthday urodziny prezent gift celebration party'
  });

  const handleLoadMore = async () => {
    if (!state.loading && state.hasMore) {
      await actions.loadMore();
    }
  };

  const handleRetry = () => {
    actions.refresh();
  };

  if (state.loading && state.products.length === 0) {
    return <UrodzinyLoadingState />;
  }

  if (state.error && state.products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Błąd ładowania</h2>
          <p className="text-gray-600 mb-6">Nie udało się załadować prezentów urodzinowych.</p>
          <Button onClick={handleRetry}>Spróbuj ponownie</Button>
        </div>
      </section>
    );
  }

  if (!state.loading && state.products.length === 0) {
    return <UrodzinyEmptyState />;
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Radosne Prezenty na Każde Urodziny
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Odkryj {state.total} wyjątkowych prezentów, które sprawią radość w każdym wieku
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <UrodzinyStatsCardSimplified 
            title="Dostępne Prezenty" 
            value={state.total.toString()} 
            icon="gift"
          />
          <UrodzinyStatsCardSimplified 
            title="Pełne radości" 
            value="Na każdy wiek" 
            icon="cake"
          />
          <UrodzinyStatsCardSimplified 
            title="Jakość" 
            value="Świętujemy razem" 
            icon="party"
          />
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <ProductGrid 
            products={state.products.map(product => ({
              ...product,
              images: product.images.map(img => ({
                ...img,
                thumbnail: img.src,
                name: img.alt
              })),
              attributes: product.attributes.map(attr => ({
                ...attr,
                has_variations: false,
                terms: attr.options.map((option, index) => ({
                  id: index + 1,
                  name: option,
                  slug: option.toLowerCase().replace(/\s+/g, '-')
                }))
              })),
              prices: {
                price: product.price,
                regular_price: product.regular_price,
                sale_price: product.sale_price,
                currency_symbol: 'zł',
                currency_code: 'PLN'
              },
              stock_status: product.in_stock ? 'instock' : 'outofstock',
              permalink: `/produkt/${product.slug}`
            }))}
          />
        </div>

        {/* Load More Button */}
        {state.hasMore && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              disabled={state.loading}
              className="px-8 py-3"
            >
              {state.loading ? 'Ładowanie...' : 'Pokaż więcej prezentów'}
            </Button>
          </div>
        )}

        {/* Error Message */}
        {state.error && state.products.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-red-600 mb-4">{state.error}</p>
            <Button variant="outline" onClick={handleRetry}>
              Spróbuj ponownie
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

UrodzinyProductsSectionSimplified.displayName = 'UrodzinyProductsSectionSimplified';