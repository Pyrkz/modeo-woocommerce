'use client';

import React from 'react';
import { UrodzinyHeroSection } from './sections/UrodzinyHeroSection';
import { UrodzinyProductsSection } from './sections/UrodzinyProductsSection';

export const UrodzinyGiftsPageSimplified = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <UrodzinyHeroSection onShopNowClick={handleShopNowClick} />
      <UrodzinyProductsSection id="produkty" />
    </main>
  );
});

UrodzinyGiftsPageSimplified.displayName = 'UrodzinyGiftsPageSimplified';