'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useNaPrezentPreload } from '../hooks/useNaPrezentPreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const NaPrezentHeroSection = dynamic(
  () => import('./sections/NaPrezentHeroSection').then(mod => ({ default: mod.NaPrezentHeroSection })),
  { ssr: true }
);

const NaPrezentCategoriesSection = dynamic(
  () => import('./sections/NaPrezentCategoriesSection').then(mod => ({ default: mod.NaPrezentCategoriesSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie kategorii...</div>,
    ssr: false
  }
);

const NaPrezentWhySection = dynamic(
  () => import('./sections/NaPrezentWhySection').then(mod => ({ default: mod.NaPrezentWhySection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie...</div>,
    ssr: false
  }
);

export const NaPrezentGiftsPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useNaPrezentPreload();

  const handleShopNowClick = useCallback(() => {
    smoothScrollTo('kategorie');
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Always visible */}
      <NaPrezentHeroSection onShopNowClick={handleShopNowClick} />

      {/* Categories Section - Lazy loaded */}
      <NaPrezentCategoriesSection id="kategorie" />

      {/* Why Choose Us Section - Lazy loaded */}
      <NaPrezentWhySection />
    </main>
  );
});

NaPrezentGiftsPageOptimized.displayName = 'NaPrezentGiftsPageOptimized';