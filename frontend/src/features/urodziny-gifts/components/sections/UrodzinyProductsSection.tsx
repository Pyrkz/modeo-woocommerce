'use client';

import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useUrodzinyGiftsOptimized } from '../../hooks';
import { UrodzinyLoadingState } from '../ui/UrodzinyLoadingState';
import { UrodzinyEmptyState } from '../ui/UrodzinyEmptyState';
import UrodzinyGiftsGrid from '../UrodzinyGiftsGrid';
import { 
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';

interface UrodzinyProductsSectionProps {
  id?: string;
}

export const UrodzinyProductsSection = React.memo(({ id = 'produkty' }: UrodzinyProductsSectionProps) => {
  const searchTerm = 'urodziny birthday prezent gift celebration party tort cake';
  const category = '';
  
  const { products, loading, total, hasMore, loadMore, refresh } = useUrodzinyGiftsOptimized({
    filters: {
      featured: true,
      sortBy: 'popularity',
      search: searchTerm
    }
  });

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  const handleResetFilters = useCallback(() => {
    // Note: This hook doesn't support filter updates, would need different approach
    refresh();
  }, [refresh]);

  const statsSection = useMemo(() => (
    <div className="bg-yellow-600 text-white py-8 mb-12 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">🎂</div>
            <div className="text-2xl font-bold">{total || '100+'}+</div>
            <div className="text-yellow-100">Produktów urodzinowych</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">🎁</div>
            <div className="text-2xl font-bold">Personalizacja</div>
            <div className="text-yellow-100">Dodaj własny tekst i zdjęcie</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">⭐</div>
            <div className="text-2xl font-bold">Premium</div>
            <div className="text-yellow-100">Najwyższa jakość materiałów</div>
          </div>
        </div>
      </div>
    </div>
  ), [total]);

  if (loading && products.length === 0) {
    return <UrodzinyLoadingState />;
  }

  if (!loading && products.length === 0) {
    return (
      <section id={id} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <UrodzinyEmptyState 
            searchTerm={searchTerm}
            onReset={handleResetFilters}
          />
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎉 Prezenty na <span className="text-yellow-600">Urodziny</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Znajdź idealny prezent urodzinowy! Personalizowane produkty, które sprawią radość w każdym wieku.
          </p>
        </div>

        {/* Stats Section */}
        {statsSection}

        {/* Search and Filter Info */}
        {(searchTerm || category) && (
          <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>
                  Wyniki dla: {searchTerm && `"${searchTerm}"`}
                  {category && ` • Kategoria: ${category}`}
                </span>
                <span className="font-medium text-yellow-700">
                  ({total} {total === 1 ? 'produkt' : total < 5 ? 'produkty' : 'produktów'})
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleResetFilters}
                className="text-yellow-700 hover:text-yellow-800 hover:bg-yellow-100"
              >
                Wyczyść filtry
              </Button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <UrodzinyGiftsGrid products={products} />

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Ładowanie...
                </>
              ) : (
                <>
                  Pokaż więcej produktów
                  <AdjustmentsHorizontalIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
          <div className="text-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Potrzebujesz pomocy w wyborze prezentu?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Nasz zespół pomoże Ci stworzyć idealny, personalizowany prezent urodzinowy. 
              Skontaktuj się z nami i otrzymasz profesjonalne doradztwo!
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/kontakt">
                <ChatBubbleOvalLeftEllipsisIcon className="mr-2 h-5 w-5" />
                Skontaktuj się z nami
              </Link>
            </Button>
          </div>
        </div>

        {/* Back to Occasions */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <Button variant="outline" asChild className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
            <Link href="/na-prezent">
              ← Wróć do wszystkich okazji
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

UrodzinyProductsSection.displayName = 'UrodzinyProductsSection';