'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import { useFlockPreload } from '../hooks/useFlockPreload';
import { smoothScrollTo } from '../utils/performance';
import { OptimizedStickyFlockSection } from './sections/OptimizedStickyFlockSection';
import { ZnakowanieGallery } from '@/features/znakowanie';

// Dynamic imports for better performance and code splitting
const HaftBenefitsSection = dynamic(
  () => import('@/features/haft-embroidery/components/sections/HaftBenefitsSection').then(mod => ({ default: mod.HaftBenefitsSection })),
  { 
    loading: () => <div className="py-16 bg-gray-50 text-center">Ładowanie korzyści...</div>,
    ssr: false
  }
);

export const FlockPageOptimized = React.memo(() => {
  // Preload critical routes for better UX
  useFlockPreload();

  // Get team member for flock services
  const flockExpert = getTeamMemberByName('Anna Pawlak');
  
  if (!flockExpert) {
    console.warn('Flock expert not found, using fallback');
  }

  // Handler functions with smooth scrolling
  const handleQuoteClick = useCallback(() => {
    smoothScrollTo('kontakt', 80);
  }, []);

  return (
    <main className="min-h-screen">
      
      {/* New Optimized Hero Section with Sticky Elements */}
      <OptimizedStickyFlockSection onQuoteClick={handleQuoteClick} />

      {/* Portfolio Gallery Section - ZnakowanieGallery component */}
      <ZnakowanieGallery />

      {/* Benefits Section - Lazy loaded */}
      <HaftBenefitsSection id="korzyści" />

      {/* Process Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Jak Przygotowujemy Flock?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces flock zapewnia aksamitne wykończenie i wyjątkową fakturę nadruku
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Przygotowanie wzoru',
                description: 'Tworzymy wzór w lustrzanym odbiciu, przygotowując go do wycięcia w folii flock'
              },
              {
                step: '02', 
                title: 'Wycięcie folii',
                description: 'Wycinamy wzór plotterem w aksamitnej folii flock, usuwając zbędne elementy'
              },
              {
                step: '03',
                title: 'Wyklejanie wzoru', 
                description: 'Precyzyjnie wyklejamy drobne elementy wzoru, przygotowując do transferu'
              },
              {
                step: '04',
                title: 'Transfer termiczny',
                description: 'Przenosimy wzór na odzież przy wysokiej temperaturze, tworząc aksamitną fakturę'
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
      {flockExpert && (
        <section id="kontakt">
          <CompleteContactSection
            teamMember={flockExpert}
            tagline="Potrzebujesz flock?"
            title="Skontaktuj się z ekspertem flock"
            description="Wypełnij formularz, a nasz specjalista ds. produkcji i flock skontaktuje się z Tobą w ciągu 24 godzin. Pomożemy Ci stworzyć aksamitne nadruki flock o wyjątkowej fakturze."
            backgroundColor="gray"
          />
        </section>
      )}
      
    </main>
  );
});

FlockPageOptimized.displayName = 'FlockPageOptimized';