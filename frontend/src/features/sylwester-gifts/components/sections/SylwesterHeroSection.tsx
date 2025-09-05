'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { 
  SparklesIcon, 
  GiftIcon,
  FireIcon 
} from '@heroicons/react/24/outline';

interface SylwesterHeroSectionProps {
  onShopNowClick: () => void;
}

export const SylwesterHeroSection = React.memo(({ onShopNowClick }: SylwesterHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 to-purple-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <FireIcon className="w-6 h-6 text-yellow-500 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            <GiftIcon className="w-6 h-6 text-yellow-600" />
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            <FireIcon className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-yellow-500">Prezenty</span> na{' '}
            <span className="text-purple-600">Sylwestra</span>
            <SparklesIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-yellow-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Powitaj Nowy Rok z przytupem! Personalizowane prezenty, które dodadzą blasku sylwestrowej nocy i sprawią, że impreza będzie naprawdę niezapomniana.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <SparklesIcon className="mr-2 h-5 w-5" />
            Zobacz Prezenty na Sylwestra
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalizowane</h3>
              <p className="text-sm text-gray-600">Dodaj imię, datę lub zdjęcie – stwórz pamiątkę tej wyjątkowej nocy</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <FireIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Błyszczące</h3>
              <p className="text-sm text-gray-600">Pełne energii i magii Sylwestra – idealne na imprezę lub prezent dla bliskich</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Premium</h3>
              <p className="text-sm text-gray-600">Wysokiej jakości materiały i staranne wykonanie, które robią wrażenie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-yellow-200 opacity-20">
        <SparklesIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-200 opacity-20">
        <FireIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

SylwesterHeroSection.displayName = 'SylwesterHeroSection';