'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { naPrezentStats } from '../../data/naPrezentData';

interface NaPrezentHeroSectionProps {
  onShopNowClick?: () => void;
}

export const NaPrezentHeroSection = React.memo(({ 
  onShopNowClick 
}: NaPrezentHeroSectionProps) => (
  <section className="relative bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 py-16 lg:py-24 overflow-hidden">
    {/* Background Decoration */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full blur-xl" />
      <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full blur-lg" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-200 rounded-full blur-lg" />
      <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-yellow-200 rounded-full blur-xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="text-red-600">Prezenty</span> na każdą{' '}
          <span className="text-pink-600">okazję</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
          Spraw radość swoim bliskim wyjątkowymi, spersonalizowanymi prezentami. 
          Wybierz okazję i znajdź idealny produkt dla każdej ważnej chwili.
        </p>
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
              {naPrezentStats.totalCategories}+
            </div>
            <div className="text-sm text-gray-600">kategorii</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-pink-600 mb-1">
              {naPrezentStats.totalProducts}+
            </div>
            <div className="text-sm text-gray-600">produktów</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
              {naPrezentStats.avgDeliveryTime}
            </div>
            <div className="text-sm text-gray-600">realizacja</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
              {naPrezentStats.satisfactionRate}
            </div>
            <div className="text-sm text-gray-600">zadowolenia</div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onShopNowClick}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Przeglądaj kategorie
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 font-semibold px-8 py-4 text-lg"
          >
            <Link href="/sklep">
              Zobacz wszystkie produkty
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
));

NaPrezentHeroSection.displayName = 'NaPrezentHeroSection';