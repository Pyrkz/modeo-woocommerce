'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const SylwesterHeroSection = dynamic(
  () => import('./sections/SylwesterHeroSection').then(mod => ({ default: mod.SylwesterHeroSection })),
  { ssr: true }
);

const SylwesterProductsSection = dynamic(
  () => import('./sections/SylwesterProductsSection').then(mod => ({ default: mod.SylwesterProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const SylwesterGiftsPageOptimized = React.memo(() => {
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
      <SylwesterHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <SylwesterProductsSection id="produkty" />
    </div>
  );
});

SylwesterGiftsPageOptimized.displayName = 'SylwesterGiftsPageOptimized';