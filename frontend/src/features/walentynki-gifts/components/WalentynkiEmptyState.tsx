'use client';

import { memo } from 'react';
import Link from 'next/link';

interface WalentynkiEmptyStateProps {
  onRetry?: () => void;
  className?: string;
}

const WalentynkiEmptyState = memo(({ 
  onRetry, 
  className = '' 
}: WalentynkiEmptyStateProps) => {
  return (
    <div className={`py-16 text-center ${className}`}>
      {/* Romantic Valentine's Icons */}
      <div className="mb-8 flex justify-center space-x-4">
        <span className="text-6xl animate-pulse">💖</span>
        <span className="text-6xl animate-bounce">❤️</span>
        <span className="text-6xl animate-pulse delay-75">💕</span>
      </div>
      
      {/* Main Message */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Walentynkowe prezenty już wkrótce!
      </h3>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Przygotowujemy dla Ciebie wyjątkowe prezenty na Walentynki. 
        Sprawdź nasze inne kolekcje lub wróć niebawem po więcej romantycznych niespodzianek!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link 
          href="/sklep"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🛍️</span>
          Zobacz wszystkie produkty
        </Link>
        
        <Link 
          href="/na-prezent"
          className="inline-flex items-center px-8 py-3 border-2 border-pink-500 text-pink-600 font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🎁</span>
          Inne okazje prezentowe
        </Link>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <div className="mb-8">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-2 text-gray-500 hover:text-pink-600 font-medium transition-colors text-sm"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Odśwież stronę
          </button>
        </div>
      )}

      {/* Valentine's Ideas */}
      <div className="bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
          <span className="mr-2">💡</span>
          Pomysły na prezenty walentynkowe
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">💕</span>
            Romantyczne koszulki dla par
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🌹</span>
            Eleganckie akcesoria miłosne
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">💖</span>
            Personalizowane bluzy z sercem
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🎀</span>
            Słodkie gadżety na Walentynki
          </div>
        </div>
      </div>

      {/* Love Quote */}
      <div className="mt-8 text-center">
        <blockquote className="text-pink-600 italic text-lg mb-2">
          &quot;Miłość to jedyny prezent, który nigdy się nie kończy&quot;
        </blockquote>
        <p className="text-sm text-gray-500">
          Przygotuj się na Dzień Zakochanych z{' '}
          <Link 
            href="/kontakt" 
            className="text-pink-600 hover:text-pink-700 font-medium underline"
          >
            wyjątkowymi prezentami Modeo
          </Link>
        </p>
      </div>
    </div>
  );
});

WalentynkiEmptyState.displayName = 'WalentynkiEmptyState';

export default WalentynkiEmptyState;