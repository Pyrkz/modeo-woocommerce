'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

interface DzienKobietHeroSectionProps {
  onShopNowClick: () => void;
}

export const DzienKobietHeroSection = React.memo(({ onShopNowClick }: DzienKobietHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <HeartIcon className="w-6 h-6 text-purple-500 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-pink-500" />
            <StarIcon className="w-6 h-6 text-purple-600" />
            <SparklesIcon className="w-5 h-5 text-pink-500" />
            <HeartIcon className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-purple-600">Prezenty</span> na{' '}
            <span className="text-pink-600">Dzień Kobiet</span>
            <StarIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-purple-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Podziękuj, obdaruj i spraw radość – bo każda kobieta zasługuje na wyjątkowy prezent. Nasze personalizowane propozycje uhonorują siłę, piękno i niezwykłość kobiet, które są ważne w Twoim życiu.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <StarIcon className="mr-2 h-5 w-5" />
            Celebruj Siłę Kobiet
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Motywujące</h3>
              <p className="text-sm text-gray-600">Pełne inspirujących haseł i pozytywnej energii</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-pink-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Eleganckie</h3>
              <p className="text-sm text-gray-600">Stylowe wzory, które podkreślają kobiecość i klasę</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wyjątkowe</h3>
              <p className="text-sm text-gray-600">Personalizowane prezenty, idealnie dopasowane do każdej kobiety</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-purple-200 opacity-20">
        <StarIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-pink-200 opacity-20">
        <HeartIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

DzienKobietHeroSection.displayName = 'DzienKobietHeroSection';