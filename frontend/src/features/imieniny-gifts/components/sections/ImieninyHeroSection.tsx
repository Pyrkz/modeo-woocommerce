'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { 
  CalendarDaysIcon, 
  GiftIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

interface ImieninyHeroSectionProps {
  onShopNowClick: () => void;
}

export const ImieninyHeroSection = React.memo(({ onShopNowClick }: ImieninyHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 to-green-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <CalendarDaysIcon className="w-6 h-6 text-teal-500 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-green-500" />
            <GiftIcon className="w-6 h-6 text-teal-600" />
            <SparklesIcon className="w-5 h-5 text-green-500" />
            <CalendarDaysIcon className="w-6 h-6 text-teal-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-teal-500">Prezenty</span> na{' '}
            <span className="text-green-600">Imieniny</span>
            <CalendarDaysIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-teal-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tradycyjne i nowoczesne prezenty na imieniny. Personalizowane produkty, 
            które sprawią radość w tym wyjątkowym dniu.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <CalendarDaysIcon className="mr-2 h-5 w-5" />
            Zobacz Prezenty na Imieniny
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-3 rounded-full mb-3">
                <CalendarDaysIcon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalizowane</h3>
              <p className="text-sm text-gray-600">Dodaj imię, zdjęcie lub dedykację – stwórz prezent wyjątkowy jak osoba, którą obdarowujesz</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Klasyczne i ponadczasowe</h3>
              <p className="text-sm text-gray-600">Idealne na imieniny – eleganckie upominki z nutą tradycji</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wysokiej jakości</h3>
              <p className="text-sm text-gray-600">Trwałe i pięknie wykonane – pamiątki na długie lata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-teal-200 opacity-20">
        <CalendarDaysIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-green-200 opacity-20">
        <CalendarDaysIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

ImieninyHeroSection.displayName = 'ImieninyHeroSection';