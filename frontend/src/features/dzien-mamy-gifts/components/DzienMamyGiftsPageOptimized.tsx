'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const DzienMamyHeroSection = dynamic(
  () => import('./sections/DzienMamyHeroSection').then(mod => ({ default: mod.DzienMamyHeroSection })),
  { ssr: true }
);

const DzienMamyProductsSection = dynamic(
  () => import('./sections/DzienMamyProductsSection').then(mod => ({ default: mod.DzienMamyProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const DzienMamyGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = useCallback(() => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DzienMamyHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <DzienMamyProductsSection id="produkty" />
    </div>
  );
});

DzienMamyGiftsPageOptimized.displayName = 'DzienMamyGiftsPageOptimized';