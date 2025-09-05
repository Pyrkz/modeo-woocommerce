'use client';

import { memo } from 'react';
import Link from 'next/link';

const GIFT_IDEAS = [
  {
    id: 'koszulki',
    emoji: '👕',
    title: 'Koszulki świąteczne',
    description: 'Zabawne i stylowe koszulki z motywami bożonarodzeniowymi. Idealne na wigilie i spotkania rodzinne.',
    href: '/sklep/koszulki'
  },
  {
    id: 'bluzy',
    emoji: '🧥',
    title: 'Bluzy i swetry',
    description: 'Ciepłe bluzy z nadrukami świątecznymi. Komfort i styl na zimowe dni.',
    href: '/sklep/bluzy'
  },
  {
    id: 'akcesoria',
    emoji: '🎽',
    title: 'Akcesoria',
    description: 'Czapki, torby i inne akcesoria z świątecznymi wzorami. Dopełnij świąteczny look.',
    href: '/sklep/akcesoria'
  }
] as const;

export const ChristmasIdeasSection = memo(() => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Pomysły na prezenty świąteczne
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {GIFT_IDEAS.map(idea => (
            <div 
              key={idea.id}
              className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{idea.emoji}</div>
              <h3 className="text-xl font-semibold mb-3">{idea.title}</h3>
              <p className="text-gray-600 mb-4">
                {idea.description}
              </p>
              <Link 
                href={idea.href}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Zobacz {idea.title.toLowerCase()} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ChristmasIdeasSection.displayName = 'ChristmasIdeasSection';