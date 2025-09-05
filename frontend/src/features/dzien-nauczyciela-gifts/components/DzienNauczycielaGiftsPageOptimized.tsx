'use client';

import React from 'react';
import { DzienNauczycielaHeroSection } from './sections/DzienNauczycielaHeroSection';
import { DzienNauczycielaProductsSection } from './sections/DzienNauczycielaProductsSection';

export const DzienNauczycielaGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <DzienNauczycielaHeroSection onShopNowClick={handleShopNowClick} />
      <DzienNauczycielaProductsSection id="produkty" />
    </main>
  );
});

DzienNauczycielaGiftsPageOptimized.displayName = 'DzienNauczycielaGiftsPageOptimized';