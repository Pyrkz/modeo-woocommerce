'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

interface DzienMamyHeroSectionProps {
  onShopNowClick: () => void;
}

export const DzienMamyHeroSection = React.memo(({ onShopNowClick }: DzienMamyHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <HeartIcon className="w-6 h-6 text-green-500 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-emerald-500" />
            <StarIcon className="w-6 h-6 text-green-600" />
            <SparklesIcon className="w-5 h-5 text-emerald-500" />
            <HeartIcon className="w-6 h-6 text-green-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-green-600">Prezenty</span> na{' '}
            <span className="text-emerald-600">Dzień Mamy</span>
            <HeartIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-green-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Podziękuj swojej mamie za jej bezwarunkową miłość i poświęcenie. 
            Personalizowane prezenty, które wyrażą Twoją wdzięczność i miłość.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <HeartIcon className="mr-2 h-5 w-5" />
            Znajdź Prezent dla Mamy
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <HeartIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Z sercem</h3>
              <p className="text-sm text-gray-600">Prezenty pełne miłości, wdzięczności i ciepłych emocji</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wyjątkowe</h3>
              <p className="text-sm text-gray-600">Stworzone specjalnie dla najlepszej mamy na świecie</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <StarIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Najwyższa jakość</h3>
              <p className="text-sm text-gray-600">Bo mama zawsze zasługuje na to, co najpiękniejsze</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-green-200 opacity-20">
        <HeartIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-emerald-200 opacity-20">
        <StarIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

DzienMamyHeroSection.displayName = 'DzienMamyHeroSection';