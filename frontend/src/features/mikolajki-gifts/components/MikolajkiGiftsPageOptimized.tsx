'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const MikolajkiHeroSection = dynamic(
  () => import('./sections/MikolajkiHeroSection').then(mod => ({ default: mod.MikolajkiHeroSection })),
  { ssr: true }
);

const MikolajkiProductsSection = dynamic(
  () => import('./sections/MikolajkiProductsSection').then(mod => ({ default: mod.MikolajkiProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const MikolajkiGiftsPageOptimized = React.memo(() => {
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
      <MikolajkiHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <MikolajkiProductsSection id="produkty" />
    </div>
  );
});

MikolajkiGiftsPageOptimized.displayName = 'MikolajkiGiftsPageOptimized';