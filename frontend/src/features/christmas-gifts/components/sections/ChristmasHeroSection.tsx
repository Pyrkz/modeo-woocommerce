'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { GiftIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ChristmasHeroSectionProps {
  onShopNowClick: () => void;
}

export const ChristmasHeroSection = React.memo(({ onShopNowClick }: ChristmasHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-red-50 to-green-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-red-500 animate-pulse text-3xl">🎄</span>
            <SparklesIcon className="w-5 h-5 text-green-500" />
            <GiftIcon className="w-6 h-6 text-red-600" />
            <SparklesIcon className="w-5 h-5 text-green-500" />
            <span className="text-red-500 animate-pulse text-3xl">🎁</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-red-600">Prezenty</span> na{' '}
            <span className="text-green-600">Boże Narodzenie</span>
            <span className="inline-block w-8 h-8 md:w-12 md:h-12 ml-2 animate-bounce text-3xl md:text-5xl">🎄</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Spraw swoim bliskim wyjątkową radość w święta Bożego Narodzenia. 
            Personalizowane prezenty ze świątecznymi motywami, które pozostaną w pamięci na lata.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <GiftIcon className="mr-2 h-5 w-5" />
            Zobacz Świąteczne Prezenty
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalizowane</h3>
              <p className="text-sm text-gray-600">dodaj imię, zdjęcie lub życzenia</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <span className="text-2xl">🎄</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Świąteczne</h3>
              <p className="text-sm text-gray-600">pełne magii i klimatu Bożego Narodzenia</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wysokiej jakości</h3>
              <p className="text-sm text-gray-600">trwałe materiały, staranne wykonanie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-red-200 opacity-20">
        <span className="text-8xl">🎄</span>
      </div>
      <div className="absolute bottom-10 right-10 text-green-200 opacity-20">
        <span className="text-8xl">🎁</span>
      </div>
    </section>
  );
});

ChristmasHeroSection.displayName = 'ChristmasHeroSection';