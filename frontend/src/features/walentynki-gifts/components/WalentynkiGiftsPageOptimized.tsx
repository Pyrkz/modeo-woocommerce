'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const WalentynkiHeroSection = dynamic(
  () => import('./sections/WalentynkiHeroSection').then(mod => ({ default: mod.WalentynkiHeroSection })),
  { ssr: true }
);

const WalentynkiProductsSection = dynamic(
  () => import('./sections/WalentynkiProductsSection').then(mod => ({ default: mod.WalentynkiProductsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const WalentynkiGiftsPageOptimized = React.memo(() => {
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
      <WalentynkiHeroSection onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <WalentynkiProductsSection id="produkty" />
    </div>
  );
});

WalentynkiGiftsPageOptimized.displayName = 'WalentynkiGiftsPageOptimized';