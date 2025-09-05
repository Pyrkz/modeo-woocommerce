'use client';

import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { OptimizedProductGrid } from '@/features/shop/components/OptimizedProductGrid';
import { ShopApi } from '@/features/shop/api/shop.api';
import { Product } from '@/types/product';
import { ShopFilters } from '@/features/shop/types';

interface GiftOccasionProductsProps {
  occasionId: string;
  occasionTitle: string;
  filters?: ShopFilters;
  className?: string;
}

const GiftOccasionProducts = memo(({
  occasionId,
  occasionTitle,
  filters = {},
  className = ''
}: GiftOccasionProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Combine default filters with occasion-specific filters
        const occasionFilters: ShopFilters = {
          // Search for products that might be good for this occasion
          search: getOccasionSearchTerm(occasionId),
          featured: true, // Prioritize featured products
          ...filters
        };

        const response = await ShopApi.fetchProducts(occasionFilters, 1, 12);
        setProducts(response.products);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Nie udało się załadować produktów');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [occasionId, filters]);

  const handleAddToCart = async (productId: number, quantity = 1, variation?: { [key: string]: string }) => {
    try {
      await ShopApi.addToCart(productId, quantity, variation);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // You could add error notification here
    }
  };

  if (loading) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produkty na <span className="text-red-600">{occasionTitle}</span>
            </h2>
            <p className="text-gray-600">Ładowanie produktów...</p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-4"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produkty na <span className="text-red-600">{occasionTitle}</span>
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Produkty na <span className="text-red-600">{occasionTitle}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Odkryj naszą kolekcję produktów idealnych na {occasionTitle.toLowerCase()}. 
            Każdy produkt można spersonalizować według Twoich potrzeb.
          </p>
        </div>

        <OptimizedProductGrid
          products={products}
          onAddToCart={handleAddToCart}
        />

        {products.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Obecnie nie mamy produktów specjalnie oznaczonych dla tej okazji, 
              ale wszystkie nasze produkty można spersonalizować!
            </p>
            <Link
              href="/sklep"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Przeglądaj wszystkie produkty
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});

// Helper function to get search terms for different occasions
function getOccasionSearchTerm(occasionId: string): string {
  const searchTerms: { [key: string]: string } = {
    'boze-narodzenie': 'święta christmas',
    'mikolajki': 'mikołaj dzieci',
    'walentynki': 'love miłość',
    'dzien-kobiet': 'kobieta mama',
    'dzien-mamy': 'mama mother',
    'dzien-taty': 'tata father',
    'urodziny': 'birthday urodziny',
    'slub': 'ślub wedding',
    'dzien-dziecka': 'dzieci kids',
    // Add more as needed
  };

  return searchTerms[occasionId] || '';
}

GiftOccasionProducts.displayName = 'GiftOccasionProducts';

export default GiftOccasionProducts;