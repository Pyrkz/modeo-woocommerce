'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const DzienTatyHeroSection = dynamic(
  () => import('./sections/DzienTatyHeroSection').then(mod => ({ default: mod.DzienTatyHeroSection })),
  { ssr: true }
);

const DzienTatyProductsSection = dynamic(
  () => import('./sections/DzienTatyProductsSection').then(mod => ({ default: mod.DzienTatyProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const DzienTatyGiftsPageOptimized = React.memo(() => {
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
      <DzienTatyHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <DzienTatyProductsSection id="produkty" />
    </div>
  );
});

DzienTatyGiftsPageOptimized.displayName = 'DzienTatyGiftsPageOptimized';