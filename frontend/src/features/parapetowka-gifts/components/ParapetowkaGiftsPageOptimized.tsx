'use client';

import React from 'react';
import { ParapetowkaHeroSection } from './sections/ParapetowkaHeroSection';
import { ParapetowkaProductsSection } from './sections/ParapetowkaProductsSection';

export const ParapetowkaGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <ParapetowkaHeroSection onShopNowClick={handleShopNowClick} />
      <ParapetowkaProductsSection id="produkty" />
    </main>
  );
});

ParapetowkaGiftsPageOptimized.displayName = 'ParapetowkaGiftsPageOptimized';