'use client';

import React from 'react';
import { DzienDzieckaHeroSection } from './sections/DzienDzieckaHeroSection';
import { DzienDzieckaProductsSection } from './sections/DzienDzieckaProductsSection';

export const DzienDzieckaGiftsPageOptimized = React.memo(() => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('produkty');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <DzienDzieckaHeroSection onShopNowClick={handleShopNowClick} />
      <DzienDzieckaProductsSection id="produkty" />
    </main>
  );
});

DzienDzieckaGiftsPageOptimized.displayName = 'DzienDzieckaGiftsPageOptimized';