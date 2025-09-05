'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic imports for better performance and code splitting
const UrodzinyHeroSection = dynamic(
  () => import('./sections/UrodzinyHeroSection').then(mod => ({ default: mod.UrodzinyHeroSection })),
  { 
    ssr: true,
    loading: () => (
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-yellow-200 rounded-lg mb-6 mx-auto max-w-md"></div>
            <div className="h-8 bg-yellow-100 rounded mb-4 mx-auto max-w-lg"></div>
            <div className="h-8 bg-yellow-100 rounded mx-auto max-w-sm"></div>
          </div>
        </div>
      </div>
    )
  }
);

const UrodzinyProductsSection = dynamic(
  () => import('./sections/UrodzinyProductsSection').then(mod => ({ default: mod.UrodzinyProductsSection })),
  { 
    loading: () => (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4 mx-auto max-w-md"></div>
            <div className="h-4 bg-gray-100 rounded mb-8 mx-auto max-w-lg"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

export const UrodzinyGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = useCallback(() => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleScrollToProducts = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleShopNowClick();
  }, [handleShopNowClick]);

  return (
    <main className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-3" role="navigation" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Strona główna"
              >
                Strona główna
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden="true">/</li>
            <li>
              <Link 
                href="/na-prezent" 
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Na prezent"
              >
                Na prezent
              </Link>
            </li>
            <li className="text-gray-400" aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Urodziny
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <UrodzinyHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <UrodzinyProductsSection id="produkty" />

      {/* Quick Navigation */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <a
          href="#produkty"
          onClick={handleScrollToProducts}
          className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Zobacz produkty"
          aria-label="Przejdź do produktów urodzinowych"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </main>
  );
});

UrodzinyGiftsPageOptimized.displayName = 'UrodzinyGiftsPageOptimized';