'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useDTFPreload } from '../hooks/useDTFPreload';
import { smoothScrollTo } from '../utils/performance';
import { OptimizedStickyDTFSection } from './sections/OptimizedStickyDTFSection';
import { ZnakowanieGallery } from '@/features/znakowanie';

// Dynamic imports for better performance and code splitting
const HaftBenefitsSection = dynamic(
  () => import('@/features/haft-embroidery/components/sections/HaftBenefitsSection').then(mod => ({ default: mod.HaftBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const DTFPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useDTFPreload();

  // Get team member for DTF services
  const dtfExpert = getTeamMemberByName('Anna Pawlak');
  
  if (!dtfExpert) {
    console.warn('DTF expert not found, using fallback');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt', 80);
  }, []);


  return (
    <main className="min-h-screen">
      
      {/* New Optimized Hero Section with Sticky Elements */}
      <OptimizedStickyDTFSection onQuoteClick={handleQuoteClick} />

      {/* Portfolio Gallery Section - ZnakowanieGallery component */}
      <ZnakowanieGallery />

      {/* Benefits Section - Lazy loaded */}
      <HaftBenefitsSection id="korzyści" />

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jak Przygotowujemy DTF?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces DTF zapewnia wysoką jakość i trwałość nadruków na różnych materiałach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Projektowanie',
                description: 'Przygotowujemy projekt w wysokiej rozdzielczości i dostosowujemy kolory do druku DTF'
              },
              {
                step: '02', 
                title: 'Druk na folii',
                description: 'Drukujemy projekt specjalnymi tuszami na folii DTF przy użyciu drukarki wielkoformatowej'
              },
              {
                step: '03',
                title: 'Aplikacja kleju', 
                description: 'Nakładamy klej w proszku na świeży nadruk i usuwamy nadmiar dla równomiernego pokrycia'
              },
              {
                step: '04',
                title: 'Utrwalanie i przenoszenie',
                description: 'Utrwalamy klej w piecu, następnie przenosimy nadruk na odzież przy pomocy prasy termicznej'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section - PRESERVED from original, SSR enabled */}
      {dtfExpert && (
        <section id="kontakt">
          <CompleteContactSection
            teamMember={dtfExpert}
            tagline="Potrzebujesz DTF?"
            title="Skontaktuj się z ekspertem DTF"
            description="Wypełnij formularz, a nasz specjalista ds. produkcji i DTF skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć wysokiej jakości nadruki na różnych materiałach."
            backgroundColor="gray"
          />
        </section>
      )}
      
    </main>
  );
});

DTFPageOptimized.displayName = 'DTFPageOptimized';