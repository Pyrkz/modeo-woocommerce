'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const ChristmasHeroSection = dynamic(
  () => import('./sections/ChristmasHeroSection').then(mod => ({ default: mod.ChristmasHeroSection })),
  { ssr: true }
);

const ChristmasProductsSection = dynamic(
  () => import('./sections/ChristmasProductsSection').then(mod => ({ default: mod.ChristmasProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const ChristmasGiftsPageOptimized = React.memo(() => {
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
      <ChristmasHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <ChristmasProductsSection id="produkty" />
    </div>
  );
});

ChristmasGiftsPageOptimized.displayName = 'ChristmasGiftsPageOptimized';