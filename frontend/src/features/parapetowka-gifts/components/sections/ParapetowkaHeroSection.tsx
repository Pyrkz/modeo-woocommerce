'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HomeIcon, GiftIcon, KeyIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ParapetowkaHeroSectionProps {
  onShopNowClick: () => void;
}

export const ParapetowkaHeroSection = React.memo(({ onShopNowClick }: ParapetowkaHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <HomeIcon className="w-6 h-6 text-green-500 animate-pulse" />
            <KeyIcon className="w-5 h-5 text-emerald-500" />
            <GiftIcon className="w-6 h-6 text-green-600" />
            <KeyIcon className="w-5 h-5 text-emerald-500" />
            <HomeIcon className="w-6 h-6 text-green-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-green-600">Prezenty</span> na{' '}
            <span className="text-emerald-600">Parapetówkę</span>
            <HomeIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-green-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Praktyczne prezenty na nowe mieszkanie. Personalizowane upominki, 
            które sprawią radość i będą przypominać o Twojej życzliwości w nowym domu.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Znajdź Prezent na Parapetówkę
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <HomeIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Praktyczne</h3>
              <p className="text-sm text-gray-600">Upominki, które przydadzą się w nowym mieszkaniu</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalizowane</h3>
              <p className="text-sm text-gray-600">Stworzone specjalnie z myślą o gospodarzach</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <HeartIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Przemyślane</h3>
              <p className="text-sm text-gray-600">Bo nowy dom zasługuje na wyjątkowy start</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-green-200 opacity-20">
        <HomeIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-emerald-200 opacity-20">
        <KeyIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

ParapetowkaHeroSection.displayName = 'ParapetowkaHeroSection';