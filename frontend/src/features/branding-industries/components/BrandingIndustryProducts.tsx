'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShopApi } from '@/features/shop/api/shop.api';
import { OptimizedProductGrid } from '@/features/shop/components/OptimizedProductGrid';
import { BrandingIndustryProductsProps } from '../types';

const BrandingIndustryProducts = memo(({
  industryId,
  industryTitle,
  filters = {},
  className = ''
}: BrandingIndustryProductsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Create search query based on industry keywords
        const industryKeywords = {
          'firmy': ['koszulka polo', 'bluza', 'koszula', 'torba', 'kubek', 'długopis'],
          'szkoly': ['koszulka', 'bluza', 'plecak', 'torba', 'zeszyt', 'długopis'],
          'kluby-sportowe': ['koszulka sportowa', 'dres', 'spodenki', 'bluza', 'czapka', 'torba sportowa'],
          'restauracje': ['fartuch', 'czapka kuchenna', 'koszulka polo', 'koszula', 'ręcznik'],
          'eventy': ['koszulka', 'torba', 'kubek', 'długopis', 'smycz', 'gadżet']
        };

        const keywords = industryKeywords[industryId as keyof typeof industryKeywords] || [];
        
        // Try to fetch products based on keywords
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
        let allProducts: any[] = [];
        for (const keyword of keywords.slice(0, 3)) { // Limit to first 3 keywords to avoid too many requests
          try {
            const response = await ShopApi.fetchProducts({
              search: keyword,
              ...filters
            }, 1, 20);
            
            if (response?.products) {
              allProducts.push(...response.products);
            }
          } catch (keywordError) {
            console.warn(`Failed to fetch products for keyword: ${keyword}`, keywordError);
          }
        }

        // Remove duplicates based on product ID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueProducts = allProducts.reduce((acc: any[], current: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isDuplicate = acc.find((item: any) => item.id === current.id);
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

        // If we don't have enough products, fetch general products
        if (uniqueProducts.length < 12) {
          try {
            const fallbackResponse = await ShopApi.fetchProducts({
              sortBy: 'popularity',
              ...filters
            }, 1, 24);
            
            if (fallbackResponse?.products) {
              const additionalProducts = fallbackResponse.products.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (product: any) => !uniqueProducts.find(existing => existing.id === product.id)
              );
              uniqueProducts.push(...additionalProducts.slice(0, 24 - uniqueProducts.length));
            }
          } catch (fallbackError) {
            console.warn('Failed to fetch fallback products', fallbackError);
          }
        }

        setProducts(uniqueProducts);
      } catch (err) {
        console.error('Error fetching branding industry products:', err);
        setError('Wystąpił błąd podczas ładowania produktów. Spróbuj ponownie.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [industryId, filters]);

  if (isLoading) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie produktów dla branży...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Brak produktów
          </h3>
          <p className="text-gray-600 mb-6">
            Nie znaleźliśmy produktów dla tej branży. Sprawdź inne kategorie lub skontaktuj się z nami.
          </p>
          <Link
            href="/sklep"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Zobacz wszystkie produkty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="border-b pb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Produkty dla branży: {industryTitle}
        </h2>
        <p className="text-gray-600">
          Znaleźliśmy {products.length} produktów odpowiednich dla tej branży
        </p>
      </div>

      <OptimizedProductGrid 
        products={products}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      />

      {products.length > 0 && (
        <div className="text-center pt-8 border-t">
          <Link
            href="/kontakt"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            Potrzebujesz wyceny? Skontaktuj się z nami
          </Link>
        </div>
      )}
    </div>
  );
});

BrandingIndustryProducts.displayName = 'BrandingIndustryProducts';

export { BrandingIndustryProducts };