'use client';

import React from 'react';
import { DzienBabciHeroSection } from './sections/DzienBabciHeroSection';
import { DzienBabciProductsSection } from './sections/DzienBabciProductsSection';

export const DzienBabciGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <DzienBabciHeroSection onShopNowClick={handleShopNowClick} />
      <DzienBabciProductsSection id="produkty" />
    </main>
  );
});

DzienBabciGiftsPageOptimized.displayName = 'DzienBabciGiftsPageOptimized';