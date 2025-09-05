'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const UrodzinyHeroSectionClean = dynamic(
  () => import('./sections/UrodzinyHeroSectionClean').then(mod => ({ default: mod.UrodzinyHeroSectionClean })),
  { ssr: true }
);

const UrodzinyProductsSectionClean = dynamic(
  () => import('./sections/UrodzinyProductsSectionClean').then(mod => ({ default: mod.UrodzinyProductsSectionClean })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

export const UrodzinyGiftsPageClean = React.memo(() => {
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
      <UrodzinyHeroSectionClean onShopNowClick={handleShopNowClick} />

      {/* Products Section */}
      <UrodzinyProductsSectionClean id="produkty" />
    </div>
  );
});

UrodzinyGiftsPageClean.displayName = 'UrodzinyGiftsPageClean';