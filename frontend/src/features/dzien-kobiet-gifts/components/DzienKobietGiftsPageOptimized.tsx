'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const DzienKobietHeroSection = dynamic(
  () => import('./sections/DzienKobietHeroSection').then(mod => ({ default: mod.DzienKobietHeroSection })),
  { ssr: true }
);

const DzienKobietProductsSection = dynamic(
  () => import('./sections/DzienKobietProductsSection').then(mod => ({ default: mod.DzienKobietProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const DzienKobietGiftsPageOptimized = React.memo(() => {
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
      <DzienKobietHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <DzienKobietProductsSection id="produkty" />
    </div>
  );
});

DzienKobietGiftsPageOptimized.displayName = 'DzienKobietGiftsPageOptimized';