'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useHaftPreload } from '../hooks/useHaftPreload';
import { smoothScrollTo } from '../utils/performance';
import { OptimizedStickyHaftSection } from './sections/OptimizedStickyHaftSection';
import { ZnakowanieGallery } from '@/features/znakowanie';

const HaftBenefitsSection = dynamic(
  () => import('./sections/HaftBenefitsSection').then(mod => ({ default: mod.HaftBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const HaftEmbroideryPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useHaftPreload();

  // Get team member for embroidery services
  const haftExpert = getTeamMemberByName('Anna Pawlak');
  
  if (!haftExpert) {
    console.warn('Embroidery expert not found, using fallback');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt', 80);
  }, []);

  

  return (
    <main className="min-h-screen">
      
      {/* New Optimized Hero Section with Sticky Elements */}
      <OptimizedStickyHaftSection onQuoteClick={handleQuoteClick} />

      {/* Portfolio Gallery Section - ZnakowanieGallery component */}
      <ZnakowanieGallery />

      {/* Benefits Section - Lazy loaded */}
      <HaftBenefitsSection id="korzyści" />

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jak Przygotowujemy Haft?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces haftu komputerowego zapewnia najwyższą jakość i precyzję wykonania
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Projekt i Wektoryzacja',
                description: 'Przygotowujemy projekt w specjalistycznym oprogramowaniu, dostosowując go do technologii haftu'
              },
              {
                step: '02', 
                title: 'Dobór Materiałów',
                description: 'Wybieramy odpowiednie nici i podkłady, gwarantujące trwałość i estetyczny wygląd'
              },
              {
                step: '03',
                title: 'Programowanie Maszyny', 
                description: 'Programujemy maszynę hafciarską, ustalając sekwencję ściegów i kolory'
              },
              {
                step: '04',
                title: 'Wykończenie',
                description: 'Starannie wykańczamy haft, usuwając podkłady i sprawdzając jakość wykonania'
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
      {haftExpert && (
        <section id="kontakt">
          <CompleteContactSection
            teamMember={haftExpert}
            tagline="Potrzebujesz haftu komputerowego?"
            title="Skontaktuj się z ekspertem haftu"
            description="Wypełnij formularz, a nasz specjalista ds. produkcji i haftu komputerowego skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć precyzyjne hafty, które będą trwałe i estetyczne."
            backgroundColor="gray"
          />
        </section>
      )}
      
    </main>
  );
});

HaftEmbroideryPageOptimized.displayName = 'HaftEmbroideryPageOptimized';