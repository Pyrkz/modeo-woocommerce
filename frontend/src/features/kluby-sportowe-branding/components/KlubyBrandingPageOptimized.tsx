'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useKlubyPreload } from '../hooks/useKlubyPreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const KlubyHeroSection = dynamic(
  () => import('./sections/KlubyHeroSection').then(mod => ({ default: mod.KlubyHeroSection })),
  { ssr: true }
);

const KlubyServicesSection = dynamic(
  () => import('./sections/KlubyServicesSection').then(mod => ({ default: mod.KlubyServicesSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie usług...</div>,
    ssr: false
  }
);

const KlubyWooCommerceProducts = dynamic(
  () => import('./KlubyWooCommerceProducts').then(mod => ({ default: mod.KlubyWooCommerceProducts })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

const KlubyBenefitsSection = dynamic(
  () => import('./sections/KlubyBenefitsSection').then(mod => ({ default: mod.KlubyBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

// CTA Section removed as requested - contact form is below

export const KlubyBrandingPageOptimized = React.memo(() => {
  const router = useRouter();
  
  // Preload critical routes for better UX
  useKlubyPreload();

  // Get team member for sports branding services
  const sportsExpert = getTeamMemberByName('Piotr Ziętal');
  
  if (!sportsExpert) {
    throw new Error('Sports expert not found');
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
      <KlubyHeroSection 
        onQuoteClick={handleQuoteClick}
        onPortfolioClick={handlePortfolioClick}
      />

      {/* Services Section - Lazy loaded */}
      <KlubyServicesSection 
        id="uslugi" 
        onConsultClick={handleQuoteClick}
      />

      {/* Products Section - WooCommerce "Do nadruku" category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <KlubyWooCommerceProducts />
        </div>
      </section>

      {/* Benefits Section - Lazy loaded */}
      <KlubyBenefitsSection id="korzyści" />

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      <CompleteContactSection
        teamMember={sportsExpert}
        tagline="Potrzebujesz rozwiązania dla swojego klubu sportowego?"
        title="Skontaktuj się z ekspertem brandingu sportowego"
        description="Wypełnij formularz, a nasz dyrektor sprzedaży skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązanie brandingowe dopasowane do potrzeb i budżetu Twojego klubu."
        backgroundColor="gray"
      />
      
    </main>
  );
});

KlubyBrandingPageOptimized.displayName = 'KlubyBrandingPageOptimized';