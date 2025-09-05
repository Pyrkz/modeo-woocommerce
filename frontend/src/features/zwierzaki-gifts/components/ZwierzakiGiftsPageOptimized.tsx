'use client';

import React from 'react';
import { ZwierzakiHeroSection } from './sections/ZwierzakiHeroSection';
import { ZwierzakiProductsSection } from './sections/ZwierzakiProductsSection';

export const ZwierzakiGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <ZwierzakiHeroSection onShopNowClick={handleShopNowClick} />
      <ZwierzakiProductsSection id="produkty" />
    </main>
  );
});

ZwierzakiGiftsPageOptimized.displayName = 'ZwierzakiGiftsPageOptimized';