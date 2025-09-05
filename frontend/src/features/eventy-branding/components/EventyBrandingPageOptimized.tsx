'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useEventyPreload } from '../hooks/useEventyPreload';
import { smoothScrollTo } from '../utils/performance';

// Dynamic imports for better performance and code splitting
const EventyHeroSection = dynamic(
  () => import('./sections/EventyHeroSection').then(mod => ({ default: mod.EventyHeroSection })),
  { ssr: true }
);

const EventyServicesSection = dynamic(
  () => import('./sections/EventyServicesSection').then(mod => ({ default: mod.EventyServicesSection })),
  { 
    loading: () => <div className="py-16 bg-white text-center">Ładowanie usług eventowych...</div>,
    ssr: false
  }
);

const EventyWooCommerceProducts = dynamic(
  () => import('./EventyWooCommerceProducts').then(mod => ({ default: mod.EventyWooCommerceProducts })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie produktów eventowych...</div>,
    ssr: false
  }
);

const EventyBenefitsSection = dynamic(
  () => import('./sections/EventyBenefitsSection').then(mod => ({ default: mod.EventyBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const EventyBrandingPageOptimized = React.memo(() => {
  const router = useRouter();
  
  // Preload critical routes for better UX
  useEventyPreload();

  // Get team member for event branding services - using design specialist
  const eventExpert = getTeamMemberByName('Piotr Anzorge');
  
  if (!eventExpert) {
    throw new Error('Event expert not found');
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
      <EventyHeroSection 
        onQuoteClick={handleQuoteClick}
        onPortfolioClick={handlePortfolioClick}
      />

      {/* Services Section - Lazy loaded */}
      <EventyServicesSection 
        id="uslugi" 
        onConsultClick={handleQuoteClick}
      />

      {/* Products Section - WooCommerce "Do nadruku" category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EventyWooCommerceProducts />
        </div>
      </section>

      {/* Benefits Section - Lazy loaded */}
      <EventyBenefitsSection id="korzyści" />

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      <CompleteContactSection
        teamMember={eventExpert}
        tagline="Organizujesz event i potrzebujesz brandingu?"
        title="Skontaktuj się z ekspertem brandingu eventowego"
        description="Wypełnij formularz, a nasz specjalista ds. designu i brandingu eventowego skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć spójną identyfikację wizualną dla Twojego wydarzenia i dobrać optymalne rozwiązania brandingowe."
        backgroundColor="gray"
      />
      
    </main>
  );
});

EventyBrandingPageOptimized.displayName = 'EventyBrandingPageOptimized';