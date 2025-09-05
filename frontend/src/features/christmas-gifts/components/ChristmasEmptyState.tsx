'use client';

import Link from 'next/link';
import { memo } from 'react';

interface ChristmasEmptyStateProps {
  onRetry?: () => void;
  className?: string;
}

const ChristmasEmptyState = memo(({
  onRetry,
  className = ''
}: ChristmasEmptyStateProps) => {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      {/* Christmas Icon */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-50 to-green-50 rounded-full mb-6">
          <span className="text-6xl">🎄</span>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Poki co nie mamy produktów świątecznych
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Nasze produkty świąteczne będą wkrótce dostępne! W międzyczasie możesz 
        przeglądać wszystkie nasze produkty, które można spersonalizować na święta.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/sklep"
          className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <span className="mr-2">🛍️</span>
          Przeglądaj wszystkie produkty
        </Link>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Spróbuj ponownie
          </button>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-12 p-6 bg-gradient-to-br from-red-50 via-green-50 to-red-50 rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4">
          <div className="text-4xl">🎁</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Potrzebujesz prezentów świątecznych?
            </h4>
            <p className="text-gray-600 text-sm">
              Każdy nasz produkt można spersonalizować z motywami świątecznymi. 
              Skontaktuj się z nami, a pomożemy stworzyć idealny prezent!
            </p>
          </div>
          <Link
            href="/kontakt"
            className="whitespace-nowrap px-6 py-2 bg-white text-red-600 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-red-200"
          >
            Kontakt
          </Link>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mt-8">
        <p className="text-gray-500 text-sm mb-4">Popularne kategorie do personalizacji:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { name: 'Koszulki', href: '/sklep/koszulki', emoji: '👕' },
            { name: 'Bluzy', href: '/sklep/bluzy', emoji: '🧥' },
            { name: 'Czapki', href: '/sklep/czapki', emoji: '🧢' },
            { name: 'Akcesoria', href: '/sklep/akcesoria', emoji: '🎽' }
          ].map(category => (
            <Link
              key={category.name}
              href={category.href}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-full hover:border-red-300 hover:text-red-600 transition-colors duration-200"
            >
              <span className="mr-1">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

ChristmasEmptyState.displayName = 'ChristmasEmptyState';

export default ChristmasEmptyState;