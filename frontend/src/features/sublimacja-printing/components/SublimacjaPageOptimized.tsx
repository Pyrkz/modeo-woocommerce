'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useSublimacjaPreload } from '../hooks/useSublimacjaPreload';
import { smoothScrollTo } from '../utils/performance';
import { OptimizedStickySublimacjaSection } from './sections/OptimizedStickySublimacjaSection';
import { ZnakowanieGallery } from '@/features/znakowanie';

// Dynamic imports for better performance and code splitting
const HaftBenefitsSection = dynamic(
  () => import('@/features/haft-embroidery/components/sections/HaftBenefitsSection').then(mod => ({ default: mod.HaftBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const SublimacjaPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useSublimacjaPreload();

  // Get team member for sublimacja services
  const sublimacjaExpert = getTeamMemberByName('Anna Pawlak');
  
  if (!sublimacjaExpert) {
    console.warn('Sublimacja expert not found, using fallback');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt', 80);
  }, []);

  return (
    <main className="min-h-screen">
      
      {/* New Optimized Hero Section with Sticky Elements */}
      <OptimizedStickySublimacjaSection onQuoteClick={handleQuoteClick} />

      {/* Portfolio Gallery Section - ZnakowanieGallery component */}
      <ZnakowanieGallery />

      {/* Benefits Section - Lazy loaded */}
      <HaftBenefitsSection id="korzyści" />

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jak Przygotowujemy Sublimację?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces sublimacji zapewnia żywe, trwałe kolory i profesjonalne wykończenie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Przygotowanie projektu',
                description: 'Optymalizujemy projekt pod kątem sublimacji, dbając o odpowiednie kolory i rozdzielczość'
              },
              {
                step: '02', 
                title: 'Druk na papierze',
                description: 'Drukujemy projekt specjalnymi tuszami sublimacyjnymi na papierze transferowym'
              },
              {
                step: '03',
                title: 'Przygotowanie materiału', 
                description: 'Przygotowujemy materiał poliestrowy lub z powłoką polimeru do sublimacji'
              },
              {
                step: '04',
                title: 'Transfer termiczny',
                description: 'Przenosimy nadruk na materiał przy wysokiej temperaturze i ciśnieniu'
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
      {sublimacjaExpert && (
        <section id="kontakt">
          <CompleteContactSection
            teamMember={sublimacjaExpert}
            tagline="Potrzebujesz sublimacji?"
            title="Skontaktuj się z ekspertem sublimacji"
            description="Wypełnij formularz, a nasz specjalista ds. produkcji i sublimacji skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć żywe, trwałe nadruki sublimacyjne."
            backgroundColor="gray"
          />
        </section>
      )}
      
    </main>
  );
});

SublimacjaPageOptimized.displayName = 'SublimacjaPageOptimized';