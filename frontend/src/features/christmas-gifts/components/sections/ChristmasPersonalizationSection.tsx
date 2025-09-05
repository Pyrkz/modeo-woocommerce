'use client';

import { memo } from 'react';

const PERSONALIZATION_STEPS = [
  {
    step: '1',
    emoji: '🎯',
    title: 'Wybierz produkt',
    description: 'Znajdź idealny produkt dla swojego prezentu'
  },
  {
    step: '2',
    emoji: '🎨',
    title: 'Dodaj wzór',
    description: 'Wybierz świąteczny wzór lub wgraj własny projekt'
  },
  {
    step: '3',
    emoji: '✏️',
    title: 'Dodaj tekst',
    description: 'Spersonalizuj życzeniami lub imieniem obdarowywanego'
  },
  {
    step: '4',
    emoji: '🎁',
    title: 'Zamów',
    description: 'Finalizuj zamówienie i otrzymaj prezent na czas'
  }
] as const;

export const ChristmasPersonalizationSection = memo(() => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
          Jak spersonalizować prezent świąteczny?
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {PERSONALIZATION_STEPS.map(step => (
            <div key={step.step} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{step.emoji}</span>
              </div>
              <h3 className="font-semibold mb-2">{step.step}. {step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ChristmasPersonalizationSection.displayName = 'ChristmasPersonalizationSection';