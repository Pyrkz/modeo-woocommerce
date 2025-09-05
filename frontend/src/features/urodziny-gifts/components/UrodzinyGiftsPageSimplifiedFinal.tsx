'use client';

import React from 'react';
import { UrodzinyHeroSection } from './sections/UrodzinyHeroSection';
import { UrodzinyProductsSectionSimplified } from './sections/UrodzinyProductsSectionSimplified';

export const UrodzinyGiftsPageSimplifiedFinal = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <UrodzinyHeroSection onShopNowClick={handleShopNowClick} />
      <UrodzinyProductsSectionSimplified id="produkty" />
    </main>
  );
});

UrodzinyGiftsPageSimplifiedFinal.displayName = 'UrodzinyGiftsPageSimplifiedFinal';