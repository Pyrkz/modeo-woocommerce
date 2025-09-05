'use client';

import { memo } from 'react';
import Link from 'next/link';

interface DzienTatyEmptyStateProps {
  onRetry?: () => void;
  className?: string;
}

const DzienTatyEmptyState = memo(({ 
  onRetry, 
  className = '' 
}: DzienTatyEmptyStateProps) => {
  return (
    <div className={`py-16 text-center ${className}`}>
      {/* Father's Day Icons */}
      <div className="mb-8 flex justify-center space-x-4">
        <span className="text-6xl animate-pulse">🎁</span>
        <span className="text-6xl animate-bounce">👨</span>
        <span className="text-6xl animate-pulse delay-75">🏆</span>
      </div>
      
      {/* Main Message */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Prezenty na Dzień Taty już wkrótce!
      </h3>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Przygotowujemy wyjątkowe prezenty dla najlepszych tatów na świecie. 
        Sprawdź nasze inne kolekcje lub wróć niebawem po więcej inspiracji!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link 
          href="/sklep"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          <span className="mr-2">🛍️</span>
          Zobacz wszystkie produkty
        </Link>
        
        <Link 
          href="/na-prezent"
          className="inline-flex items-center px-8 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
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
            className="inline-flex items-center px-6 py-2 text-gray-500 hover:text-blue-600 font-medium transition-colors text-sm"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Odśwież stronę
          </button>
        </div>
      )}

      {/* Father's Day Ideas */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
          <span className="mr-2">💡</span>
          Pomysły na prezenty dla taty
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🎁</span>
            Personalizowane koszulki dla taty
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">👕</span>
            Stylowe bluzy z dedykacjami
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">⚡</span>
            Praktyczne akcesoria dla mężczyzn
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🏆</span>
            Pamiątkowe gadżety ojcowskie
          </div>
        </div>
      </div>

      {/* Father's Day Quote */}
      <div className="mt-8 text-center">
        <blockquote className="text-blue-600 italic text-lg mb-2">
          &quot;Tata to pierwszy bohater i ostatni miłość w życiu córki&quot;
        </blockquote>
        <p className="text-sm text-gray-500">
          Pokaż tacie jak bardzo go cenisz z{' '}
          <Link 
            href="/kontakt" 
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            wyjątkowymi prezentami na Dzień Taty od Modeo
          </Link>
        </p>
      </div>
    </div>
  );
});

DzienTatyEmptyState.displayName = 'DzienTatyEmptyState';

export default DzienTatyEmptyState;