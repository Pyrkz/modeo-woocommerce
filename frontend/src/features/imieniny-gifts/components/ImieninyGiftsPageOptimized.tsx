'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const ImieninyHeroSection = dynamic(
  () => import('./sections/ImieninyHeroSection').then(mod => ({ default: mod.ImieninyHeroSection })),
  { ssr: true }
);

const ImieninyProductsSection = dynamic(
  () => import('./sections/ImieninyProductsSection').then(mod => ({ default: mod.ImieninyProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const ImieninyGiftsPageOptimized = React.memo(() => {
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
      <ImieninyHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <ImieninyProductsSection id="produkty" />
    </div>
  );
});

ImieninyGiftsPageOptimized.displayName = 'ImieninyGiftsPageOptimized';