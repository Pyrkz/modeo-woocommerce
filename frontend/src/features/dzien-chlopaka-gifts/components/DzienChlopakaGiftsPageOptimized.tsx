'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const DzienChlopakaHeroSection = dynamic(
  () => import('./sections/DzienChlopakaHeroSection').then(mod => ({ default: mod.DzienChlopakaHeroSection })),
  { ssr: true }
);

const DzienChlopakaProductsSection = dynamic(
  () => import('./sections/DzienChlopakaProductsSection').then(mod => ({ default: mod.DzienChlopakaProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const DzienChlopakaGiftsPageOptimized = React.memo(() => {
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
      <DzienChlopakaHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <DzienChlopakaProductsSection id="produkty" />
    </div>
  );
});

DzienChlopakaGiftsPageOptimized.displayName = 'DzienChlopakaGiftsPageOptimized';