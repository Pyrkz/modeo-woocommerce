'use client';

import { memo } from 'react';
import { CategoriesSection } from '@/features/categories/components';
import { TechniquesSection } from './techniques';
import { SolutionsSection } from './solutions';
import { BackgroundCTA, DomeGallery } from '@/components/ui';

const ZnakowaniePage = memo(() => (
  <main className="min-h-screen">
    <section className="py-24 bg-gray-900" style={{ height: '120vh' }}>
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nasze Realizacje
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Poznaj nasze najlepsze prace i projekty wykonane dla klientów
          </p>
        </div>
      </div>
      <DomeGallery 
        fit={0.6}
        grayscale={false}
        imageBorderRadius="20px"
        openedImageBorderRadius="20px"
        overlayBlurColor="#111827"
      />
    </section>
    
    <CategoriesSection 
      showArrow={false}
      className="bg-gray-50"
    />
    
    <TechniquesSection />
    
    <SolutionsSection />
    
    <BackgroundCTA
      title="Masz większe zamówienie lub specyficzne wymagania?"
    />
    
    {/* Future sections can be added here */}
    {/* <ServicesSection /> */}
    {/* <ProcessSection /> */}
    {/* <PortfolioSection /> */}
    {/* <ContactSection /> */}
  </main>
));

ZnakowaniePage.displayName = 'ZnakowaniePage';

export default ZnakowaniePage;