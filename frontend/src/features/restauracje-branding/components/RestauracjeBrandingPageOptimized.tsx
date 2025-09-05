'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useRestauracjePreload } from '../hooks/useRestauracjePreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const RestauracjeHeroSection = dynamic(
  () => import('./sections/RestauracjeHeroSection').then(mod => ({ default: mod.RestauracjeHeroSection })),
  { ssr: true }
);

const RestauracjeServicesSection = dynamic(
  () => import('./sections/RestauracjeServicesSection').then(mod => ({ default: mod.RestauracjeServicesSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie usług...</div>,
    ssr: false
  }
);

const RestauracjeWooCommerceProducts = dynamic(
  () => import('./RestauracjeWooCommerceProducts').then(mod => ({ default: mod.RestauracjeWooCommerceProducts })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

const RestauracjeBenefitsSection = dynamic(
  () => import('./sections/RestauracjeBenefitsSection').then(mod => ({ default: mod.RestauracjeBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const RestauracjeBrandingPageOptimized = React.memo(() => {
  const router = useRouter();
  
  // Preload critical routes for better UX
  useRestauracjePreload();

  // Get team member for restaurant branding services
  const businessExpert = getTeamMemberByName('Piotr Ziętal');
  
  if (!businessExpert) {
    throw new Error('Business expert not found');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt');
  }, []);

  const handlePortfolioClick = useCallback(() => {
    router.push('/portfolio');
  }, [router]);

  return (
    <main className="min-h-screen">
      
      {/* Hero Section - Always visible, SSR enabled */}
      <RestauracjeHeroSection 
        onQuoteClick={handleQuoteClick}
        onPortfolioClick={handlePortfolioClick}
      />

      {/* Services Section - Lazy loaded */}
      <RestauracjeServicesSection 
        id="uslugi" 
        onConsultClick={handleQuoteClick}
      />

      {/* Products Section - WooCommerce "Do nadruku" category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RestauracjeWooCommerceProducts />
        </div>
      </section>

      {/* Benefits Section - Lazy loaded */}
      <RestauracjeBenefitsSection id="korzyści" />

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      <CompleteContactSection
        teamMember={businessExpert}
        tagline="Potrzebujesz rozwiązania dla swojej restauracji?"
        title="Skontaktuj się z ekspertem brandingu gastronomicznego"
        description="Wypełnij formularz, a nasz dyrektor sprzedaży skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązanie brandingowe dopasowane do potrzeb Twojej restauracji i wymagań HACCP."
        backgroundColor="gray"
      />
      
    </main>
  );
});

RestauracjeBrandingPageOptimized.displayName = 'RestauracjeBrandingPageOptimized';