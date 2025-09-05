'use client';

import React from 'react';
import { NaPrezentCategoryCard } from '../ui/NaPrezentCategoryCard';
import { naPrezentCategories } from '../../data/naPrezentData';

interface NaPrezentCategoriesSectionProps {
  id?: string;
}

export const NaPrezentCategoriesSection = React.memo(({ 
  id = "kategorie" 
}: NaPrezentCategoriesSectionProps) => {
  // Group categories by type
  const holidayCategories = naPrezentCategories.filter(cat => cat.category === 'holidays');
  const familyCategories = naPrezentCategories.filter(cat => cat.category === 'family');
  const personalCategories = naPrezentCategories.filter(cat => cat.category === 'personal');

  return (
    <section id={id} className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wybierz kategorię prezentów
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Znajdź idealny prezent dla każdej okazji. Nasze kategorie pomogą Ci szybko odnaleźć 
            to, czego szukasz.
          </p>
        </div>

        {/* Holidays Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-3">🎉</span>
            Święta i okazje
          </h3>
          <p className="text-gray-600 mb-8">Prezenty na najważniejsze święta w roku</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {holidayCategories.map((category) => (
              <NaPrezentCategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
        </div>

        {/* Family Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
            Dla rodziny
          </h3>
          <p className="text-gray-600 mb-8">Wyjątkowe prezenty dla najbliższych osób</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {familyCategories.map((category) => (
              <NaPrezentCategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
        </div>

        {/* Personal Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-3">🎁</span>
            Okazje osobiste
          </h3>
          <p className="text-gray-600 mb-8">Prezenty na ważne momenty w życiu</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalCategories.map((category) => (
              <NaPrezentCategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

NaPrezentCategoriesSection.displayName = 'NaPrezentCategoriesSection';