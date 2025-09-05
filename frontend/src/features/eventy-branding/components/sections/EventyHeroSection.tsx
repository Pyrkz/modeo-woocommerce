'use client';

import React from 'react';
import Image from 'next/image';
import SectionBadge from '@/components/ui/SectionBadge';

interface EventyHeroSectionProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export const EventyHeroSection = React.memo(({ 
  onQuoteClick, 
  onPortfolioClick 
}: EventyHeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <SectionBadge className="mb-6">
            Znakowanie dla branży
          </SectionBadge>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 shadow-lg">
              <Image
                src="/icons/branding-eventy.svg"
                alt="Eventy icon"
                width={48}
                height={48}
                className="w-full h-full"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Znakowanie dla
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
              Eventów
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Kompleksowe rozwiązania brandingowe dla organizatorów eventów, targów i konferencji. 
            Od identyfikatorów po gadżety eventowe z profesjonalnym znakowaniem.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Duże nakłady</h3>
                <p className="text-gray-600">Obsługa eventów dla tysięcy uczestników</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ekspresowo</h3>
                <p className="text-gray-600">Realizacja w 2-4 dni roboczych</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kompleksowo</h3>
                <p className="text-gray-600">Pełna obsługa brandingu eventowego</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onQuoteClick}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Zamów wycenę eventową
            </button>
            <button
              onClick={onPortfolioClick}
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Zobacz portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

EventyHeroSection.displayName = 'EventyHeroSection';