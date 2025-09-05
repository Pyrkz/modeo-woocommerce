'use client';

import React from 'react';
import { DzienDziadkaHeroSection } from './sections/DzienDziadkaHeroSection';
import { DzienDziadkaProductsSection } from './sections/DzienDziadkaProductsSection';

export const DzienDziadkaGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <DzienDziadkaHeroSection onShopNowClick={handleShopNowClick} />
      <DzienDziadkaProductsSection id="produkty" />
    </main>
  );
});

DzienDziadkaGiftsPageOptimized.displayName = 'DzienDziadkaGiftsPageOptimized';