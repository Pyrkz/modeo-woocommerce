'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const RoczniceHeroSection = dynamic(
  () => import('./sections/RoczniceHeroSection').then(mod => ({ default: mod.RoczniceHeroSection })),
  { ssr: true }
);

const RoczniceProductsSection = dynamic(
  () => import('./sections/RoczniceProductsSection').then(mod => ({ default: mod.RoczniceProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const RoczniceGiftsPageOptimized = React.memo(() => {
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
      <RoczniceHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <RoczniceProductsSection id="produkty" />
    </div>
  );
});

RoczniceGiftsPageOptimized.displayName = 'RoczniceGiftsPageOptimized';