'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import SectionBadge from '@/components/ui/SectionBadge';

import { firmyStats } from '../../data/firmyData';

interface FirmyHeroSectionProps {
  onQuoteClick?: () => void;
  onPortfolioClick?: () => void;
}

export const FirmyHeroSection = React.memo(({ 
  onQuoteClick,
  onPortfolioClick 
}: FirmyHeroSectionProps) => (
  <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-24 overflow-hidden">
    {/* Background Decoration */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-20 left-10 w-24 h-24 bg-blue-200 rounded-full blur-xl" />
      <div className="absolute top-40 right-20 w-20 h-20 bg-purple-200 rounded-full blur-lg" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full blur-lg" />
      <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-cyan-200 rounded-full blur-xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        
        {/* Badge */}
        <SectionBadge className="mb-6">
          Znakowanie dla branży
        </SectionBadge>
        
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary p-4 shadow-lg">
            <div className="text-white text-4xl w-full h-full flex items-center justify-center">
              🏢
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Znakowanie dla{' '}
          <span className="text-primary">
            Firm
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          Kompleksowe rozwiązania brandingowe dla firm każdej wielkości. 
          Od wizytówek po oznakowanie siedziby.
        </p>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {firmyStats.completedProjects}
            </div>
            <div className="text-sm text-gray-600">projektów</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {firmyStats.satisfiedClients}
            </div>
            <div className="text-sm text-gray-600">zadowolenia</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {firmyStats.averageDelivery}
            </div>
            <div className="text-sm text-gray-600">realizacja</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {firmyStats.experienceYears}
            </div>
            <div className="text-sm text-gray-600">doświadczenia</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onQuoteClick}
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Zamów wycenę
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onPortfolioClick}
            className="border-2 border-gray-300 hover:border-primary hover:bg-primary/10 font-semibold px-8 py-4 text-lg transition-all duration-200"
          >
            Zobacz portfolio
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
        
      </div>
    </div>
  </section>
));

FirmyHeroSection.displayName = 'FirmyHeroSection';