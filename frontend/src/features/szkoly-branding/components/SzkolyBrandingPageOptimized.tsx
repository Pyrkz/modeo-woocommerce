'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getTeamMemberByName } from '@/features/team';
import { useSzkolyPreload } from '../hooks/useSzkolyPreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const SzkolyHeroSection = dynamic(
  () => import('./sections/SzkolyHeroSection').then(mod => ({ default: mod.SzkolyHeroSection })),
  { ssr: true }
);

const SzkolyServicesSection = dynamic(
  () => import('./sections/SzkolyServicesSection').then(mod => ({ default: mod.SzkolyServicesSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie usług...</div>,
    ssr: false
  }
);

const SzkolyWooCommerceProducts = dynamic(
  () => import('./SzkolyWooCommerceProducts').then(mod => ({ default: mod.SzkolyWooCommerceProducts })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie produktów...</div>,
    ssr: false
  }
);

const SzkolyBenefitsSection = dynamic(
  () => import('./sections/SzkolyBenefitsSection').then(mod => ({ default: mod.SzkolyBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

const CompleteContactSection = dynamic(
  () => import('@/features/contact').then(mod => ({ default: mod.CompleteContactSection })),
  { ssr: true }
);

interface SzkolyBrandingPageOptimizedProps {
  className?: string;
}

export const SzkolyBrandingPageOptimized = React.memo(({ 
  className = '' 
}: SzkolyBrandingPageOptimizedProps) => {
  const router = useRouter();
  
  // Preload critical routes for better UX
  useSzkolyPreload();

  // Get team member for school branding services
  const schoolExpert = getTeamMemberByName('Anna Pawlak'); // Specjalista ds. Produkcji - idealna do szkół
  
  if (!schoolExpert) {
    throw new Error('School expert not found');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt');
  }, []);

  const handlePortfolioClick = useCallback(() => {
    router.push('/portfolio');
  }, [router]);

  return (
    <main className={`min-h-screen ${className}`}>
      
      {/* Hero Section - Always visible, SSR enabled */}
      <SzkolyHeroSection 
        onQuoteClick={handleQuoteClick}
        onPortfolioClick={handlePortfolioClick}
      />

      {/* Services Section - Lazy loaded */}
      <SzkolyServicesSection 
        id="uslugi" 
        onConsultClick={handleQuoteClick}
      />

      {/* Products Section - WooCommerce "Do nadruku" category with filtering */}
      <section id="produkty" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SzkolyWooCommerceProducts />
        </div>
      </section>

      {/* Benefits Section - Lazy loaded */}
      <SzkolyBenefitsSection id="korzyści" />

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      <CompleteContactSection
        teamMember={schoolExpert}
        tagline="Potrzebujesz rozwiązania dla swojej szkoły?"
        title="Skontaktuj się z ekspertem znakowania szkolnego"
        description="Wypełnij formularz, a nasz specjalista ds. produkcji i znakowania dla szkół skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci wybrać najlepsze rozwiązanie dla Twojej placówki edukacyjnej."
        backgroundColor="gray"
      />
      
    </main>
  );
});

SzkolyBrandingPageOptimized.displayName = 'SzkolyBrandingPageOptimized';