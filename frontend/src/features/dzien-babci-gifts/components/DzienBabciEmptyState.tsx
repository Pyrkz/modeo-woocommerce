'use client';

import { memo } from 'react';
import Link from 'next/link';

interface DzienBabciEmptyStateProps {
  onRetry?: () => void;
  className?: string;
}

const DzienBabciEmptyState = memo(({ 
  onRetry, 
  className = '' 
}: DzienBabciEmptyStateProps) => {
  return (
    <div className={`py-16 text-center ${className}`}>
      {/* Grandmother's Day Love Icons */}
      <div className="mb-8 flex justify-center space-x-4">
        <span className="text-6xl animate-pulse">💐</span>
        <span className="text-6xl animate-bounce">👵</span>
        <span className="text-6xl animate-pulse delay-75">💜</span>
      </div>
      
      {/* Main Message */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Prezenty na Dzień Babci już wkrótce!
      </h3>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Przygotowujemy wyjątkowe prezenty dla najkochańszych babć na świecie. 
        Sprawdź nasze inne kolekcje lub wróć niebawem po więcej serdecznych inspiracji!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link 
          href="/sklep"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🛍️</span>
          Zobacz wszystkie produkty
        </Link>
        
        <Link 
          href="/na-prezent"
          className="inline-flex items-center px-8 py-3 border-2 border-purple-500 text-purple-600 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
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
            className="inline-flex items-center px-6 py-2 text-gray-500 hover:text-purple-600 font-medium transition-colors text-sm"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Odśwież stronę
          </button>
        </div>
      )}

      {/* Grandmother's Day Ideas */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
          <span className="mr-2">💡</span>
          Pomysły na prezenty dla babci
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">💐</span>
            Personalizowane koszulki dla babci
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🧥</span>
            Eleganckie bluzy z dedykacjami
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">👜</span>
            Stylowe akcesoria dla seniorek
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">📷</span>
            Pamiątkowe gadżety rodzinne
          </div>
        </div>
      </div>

      {/* Grandmother's Day Quote */}
      <div className="mt-8 text-center">
        <blockquote className="text-purple-600 italic text-lg mb-2">
          &quot;Babcia to serce rodziny, które łączy wszystkie pokolenia&quot;
        </blockquote>
        <p className="text-sm text-gray-500">
          Pokaż babci jak bardzo ją kochasz z{' '}
          <Link 
            href="/kontakt" 
            className="text-purple-600 hover:text-purple-700 font-medium underline"
          >
            wyjątkowymi prezentami na Dzień Babci od Modeo
          </Link>
        </p>
      </div>
    </div>
  );
});

DzienBabciEmptyState.displayName = 'DzienBabciEmptyState';

export default DzienBabciEmptyState;