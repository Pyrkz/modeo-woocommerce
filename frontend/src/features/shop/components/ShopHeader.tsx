'use client';

import { memo } from 'react';
import Link from 'next/link';

interface ShopHeaderProps {
  totalProducts: number;
  currentProductsCount: number;
}

export const ShopHeader = memo<ShopHeaderProps>(({ 
  totalProducts, 
  currentProductsCount 
}) => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nasz <span className="text-primary">Sklep</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Odkryj wszystkie nasze produkty. Znajdź coś idealnego dla siebie.
          </p>
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Strona główna
            </Link>
            <span className="mx-2">→</span>
            <span className="text-primary">Sklep</span>
          </nav>
          {totalProducts > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Wyświetlono {currentProductsCount} z {totalProducts} produktów
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

ShopHeader.displayName = 'ShopHeader';