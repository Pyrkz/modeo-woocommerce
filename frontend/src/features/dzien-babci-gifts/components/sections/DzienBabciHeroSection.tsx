'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

interface DzienBabciHeroSectionProps {
  onShopNowClick: () => void;
}

export const DzienBabciHeroSection = React.memo(({ onShopNowClick }: DzienBabciHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <HeartIcon className="w-6 h-6 text-purple-500 animate-pulse" />
            <StarIcon className="w-5 h-5 text-pink-500" />
            <GiftIcon className="w-6 h-6 text-purple-600" />
            <StarIcon className="w-5 h-5 text-pink-500" />
            <HeartIcon className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-purple-600">Prezenty</span> na{' '}
            <span className="text-pink-600">Dzień Babci</span>
            <HeartIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-purple-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Okaż miłość i wdzięczność najdroższej babci. Personalizowane prezenty, 
            które pokażą jej, jak bardzo jest kochana i jak wiele dla ciebie znaczy.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <HeartIcon className="mr-2 h-5 w-5" />
            Znajdź Prezent dla Babci
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <HeartIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Z miłością</h3>
              <p className="text-sm text-gray-600">Prezenty tworzone z wdzięcznością dla najdroższej babci</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-pink-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Serdeczne</h3>
              <p className="text-sm text-gray-600">Pełne ciepła i wzruszeń – idealne na Dzień Babci</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wyjątkowe</h3>
              <p className="text-sm text-gray-600">Bo każda babcia jest jedyna w swoim rodzaju</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-purple-200 opacity-20">
        <HeartIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-pink-200 opacity-20">
        <SparklesIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

DzienBabciHeroSection.displayName = 'DzienBabciHeroSection';