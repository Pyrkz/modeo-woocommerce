'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, StarIcon } from '@heroicons/react/24/outline';

interface ZwierzakiHeroSectionProps {
  onShopNowClick: () => void;
}

export const ZwierzakiHeroSection = React.memo(({ onShopNowClick }: ZwierzakiHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-2xl animate-bounce">🐕</span>
            <StarIcon className="w-5 h-5 text-amber-500" />
            <GiftIcon className="w-6 h-6 text-orange-600" />
            <StarIcon className="w-5 h-5 text-amber-500" />
            <span className="text-2xl animate-bounce">🐱</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-orange-600">Prezenty</span> dla{' '}
            <span className="text-amber-600">Miłośników Zwierząt</span>
            <HeartIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-orange-500 ml-2 animate-pulse" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Akcesoria dla miłośników zwierząt. Personalizowane prezenty, które pokażą miłość 
            do czworonożnych przyjaciół i sprawiają radość każdemu właścicielowi pupila.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <HeartIcon className="mr-2 h-5 w-5" />
            Znajdź Prezent dla Miłośnika Zwierząt
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 p-3 rounded-full mb-3">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Dla psiarzy</h3>
              <p className="text-sm text-gray-600">Upominki dla właścicieli i ich wiernych kompanów</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 p-3 rounded-full mb-3">
                <span className="text-2xl">🐱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Dla kociarzy</h3>
              <p className="text-sm text-gray-600">Urocze, eleganckie i pełne kociego charakteru</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 p-3 rounded-full mb-3">
                <HeartIcon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Z miłością</h3>
              <p className="text-sm text-gray-600">Tworzone z myślą o pupilach, którzy są częścią rodziny</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-orange-200 opacity-20">
        <span className="text-8xl">🐾</span>
      </div>
      <div className="absolute bottom-10 right-10 text-amber-200 opacity-20">
        <HeartIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

ZwierzakiHeroSection.displayName = 'ZwierzakiHeroSection';