'use client';

/**
 * Dzień Dziadka Empty State Component
 * Displayed when no Grandfather's Day products are available
 */

import Link from 'next/link';
import { DZIEN_DZIADKA_COLORS } from '../types';

interface DzienDziadkaEmptyStateProps {
  className?: string;
}

export default function DzienDziadkaEmptyState({ 
  className = '' 
}: DzienDziadkaEmptyStateProps) {
  return (
    <div className={`w-full py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`bg-${DZIEN_DZIADKA_COLORS.light} rounded-lg p-12`}>
          {/* Grandfather Icon */}
          <div className="text-6xl mb-6">👴</div>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Prezenty na Dzień Dziadka wkrótce dostępne
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Pracujemy nad przygotowaniem wyjątkowej kolekcji personalizowanych prezentów 
            na Dzień Dziadka. Wkrótce znajdziesz tutaj koszulki, bluzy i akcesoria 
            idealne dla Twojego ukochanego Dziadka.
          </p>

          {/* Gift Ideas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-3">👔</div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalizowane koszulki</h3>
              <p className="text-gray-600 text-sm">
                Z napisem, zdjęciem lub dedykacją
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎩</div>
              <h3 className="font-semibold text-gray-900 mb-2">Stylowe akcesoria</h3>
              <p className="text-gray-600 text-sm">
                Kubki, torby i inne pamiątki
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏅</div>
              <h3 className="font-semibold text-gray-900 mb-2">Pamiątkowe gadżety</h3>
              <p className="text-gray-600 text-sm">
                Unikalne prezenty od wnuków
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/sklep"
              className={`
                bg-${DZIEN_DZIADKA_COLORS.primary} 
                hover:bg-${DZIEN_DZIADKA_COLORS.accent} 
                text-white font-medium py-3 px-6 rounded-md 
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-${DZIEN_DZIADKA_COLORS.primary} focus:ring-offset-2
                inline-block
              `}
            >
              Zobacz wszystkie produkty
            </Link>
            
            <Link 
              href="/na-prezent"
              className={`
                border-2 border-${DZIEN_DZIADKA_COLORS.primary} 
                text-${DZIEN_DZIADKA_COLORS.primary} 
                hover:bg-${DZIEN_DZIADKA_COLORS.primary} 
                hover:text-white
                font-medium py-3 px-6 rounded-md 
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-${DZIEN_DZIADKA_COLORS.primary} focus:ring-offset-2
                inline-block
              `}
            >
              Prezenty na inne okazje
            </Link>
          </div>

          {/* Newsletter Signup Hint */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              <span className="font-medium">💌 Chcesz być na bieżąco?</span>
              <br />
              Zapisz się do newslettera, aby otrzymać informację o nowych produktach na Dzień Dziadka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}