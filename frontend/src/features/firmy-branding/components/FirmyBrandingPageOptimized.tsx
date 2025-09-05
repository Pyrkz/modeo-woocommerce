'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useFirmyPreload } from '../hooks/useFirmyPreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const FirmyHeroSection = dynamic(
  () => import('./sections/FirmyHeroSection').then(mod => ({ default: mod.FirmyHeroSection })),
  { ssr: true }
);

const FirmyServicesSection = dynamic(
  () => import('./sections/FirmyServicesSection').then(mod => ({ default: mod.FirmyServicesSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie usług...</div>,
    ssr: false
  }
);

const FirmyWooCommerceProducts = dynamic(
  () => import('./FirmyWooCommerceProducts').then(mod => ({ default: mod.FirmyWooCommerceProducts })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

const FirmyBenefitsSection = dynamic(
  () => import('./sections/FirmyBenefitsSection').then(mod => ({ default: mod.FirmyBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

// CTA Section removed as requested - contact form is below

export const FirmyBrandingPageOptimized = React.memo(() => {
  const router = useRouter();
  
  // Preload critical routes for better UX
  useFirmyPreload();

  // Get team member for business branding services
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
      <FirmyHeroSection 
        onQuoteClick={handleQuoteClick}
        onPortfolioClick={handlePortfolioClick}
      />

      {/* Services Section - Lazy loaded */}
      <FirmyServicesSection 
        id="uslugi" 
        onConsultClick={handleQuoteClick}
      />

      {/* Products Section - WooCommerce "Do nadruku" category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FirmyWooCommerceProducts />
        </div>
      </section>

      {/* Benefits Section - Lazy loaded */}
      <FirmyBenefitsSection id="korzyści" />

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      <CompleteContactSection
        teamMember={businessExpert}
        tagline="Potrzebujesz rozwiązania dla swojej firmy?"
        title="Skontaktuj się z ekspertem brandingu firmowego"
        description="Wypełnij formularz, a nasz dyrektor sprzedaży skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązanie brandingowe dopasowane do potrzeb i budżetu Twojej firmy."
        backgroundColor="gray"
      />
      
    </main>
  );
});

FirmyBrandingPageOptimized.displayName = 'FirmyBrandingPageOptimized';