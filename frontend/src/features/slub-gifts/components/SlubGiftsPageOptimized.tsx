'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const SlubHeroSection = dynamic(
  () => import('./sections/SlubHeroSection').then(mod => ({ default: mod.SlubHeroSection })),
  { ssr: true }
);

const SlubProductsSection = dynamic(
  () => import('./sections/SlubProductsSection').then(mod => ({ default: mod.SlubProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const SlubGiftsPageOptimized = React.memo(() => {
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
      <SlubHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <SlubProductsSection id="produkty" />
    </div>
  );
});

SlubGiftsPageOptimized.displayName = 'SlubGiftsPageOptimized';