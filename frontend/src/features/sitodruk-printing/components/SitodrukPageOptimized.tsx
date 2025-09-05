'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useSitodrukPreload } from '../hooks/useSitodrukPreload';
import { smoothScrollTo } from '../utils/performance';
import { OptimizedStickySitodrukSection } from './sections/OptimizedStickySitodrukSection';
import { ZnakowanieGallery } from '@/features/znakowanie';

// Dynamic imports for better performance and code splitting
const HaftBenefitsSection = dynamic(
  () => import('@/features/haft-embroidery/components/sections/HaftBenefitsSection').then(mod => ({ default: mod.HaftBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const SitodrukPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useSitodrukPreload();

  // Get team member for sitodruk services
  const sitodrukExpert = getTeamMemberByName('Anna Pawlak');
  
  if (!sitodrukExpert) {
    console.warn('Sitodruk expert not found, using fallback');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt', 80);
  }, []);


  return (
    <main className="min-h-screen">
      
      {/* New Optimized Hero Section with Sticky Elements */}
      <OptimizedStickySitodrukSection onQuoteClick={handleQuoteClick} />

      {/* Portfolio Gallery Section - ZnakowanieGallery component */}
      <ZnakowanieGallery />

      {/* Benefits Section - Lazy loaded */}
      <HaftBenefitsSection id="korzyści" />

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jak Przygotowujemy Sitodruk?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces sitodruku zapewnia najwyższą jakość i żywe kolory nadruków
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Separacja kolorów',
                description: 'Przygotowujemy projekt, dzieląc go na poszczególne kolory i tworząc wzorniki do sitodruków'
              },
              {
                step: '02', 
                title: 'Przygotowanie sit',
                description: 'Naciągamy sita i pokrywamy emulsją światłoczułą, następnie naświetlamy wzór'
              },
              {
                step: '03',
                title: 'Przygotowanie farb', 
                description: 'Mieszamy farby w odpowiednich kolorach i konsystencji dla optymalnej jakości druku'
              },
              {
                step: '04',
                title: 'Druk i suszenie',
                description: 'Wykonujemy nadruki przeciągając farbę przez sito, następnie suszymy w piecu'
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
      {sitodrukExpert && (
        <section id="kontakt">
          <CompleteContactSection
            teamMember={sitodrukExpert}
            tagline="Potrzebujesz sitodruku?"
            title="Skontaktuj się z ekspertem sitodruku"
            description="Wypełnij formularz, a nasz specjalista ds. produkcji i sitodruku skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć żywe nadruki, które będą trwałe i atrakcyjne wizualnie."
            backgroundColor="gray"
            pageSource="Strona sitodruku"
          />
        </section>
      )}
      
    </main>
  );
});

SitodrukPageOptimized.displayName = 'SitodrukPageOptimized';