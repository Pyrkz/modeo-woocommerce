'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { HeartIcon, GiftIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

interface DzienDziadkaHeroSectionProps {
  onShopNowClick: () => void;
}

export const DzienDziadkaHeroSection = React.memo(({ onShopNowClick }: DzienDziadkaHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-slate-500 animate-pulse" />
            <StarIcon className="w-5 h-5 text-gray-500" />
            <GiftIcon className="w-6 h-6 text-slate-600" />
            <StarIcon className="w-5 h-5 text-gray-500" />
            <ShieldCheckIcon className="w-6 h-6 text-slate-500 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-slate-600">Prezenty</span> na{' '}
            <span className="text-gray-600">Dzień Dziadka</span>
            <ShieldCheckIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-slate-500 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Uhonoruj mądrość i doświadczenie dziadka. Personalizowane prezenty, 
            które pokażą mu szacunek i wdzięczność za wszystkie życiowe lekcje.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-slate-500 hover:bg-slate-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <ShieldCheckIcon className="mr-2 h-5 w-5" />
            Znajdź Prezent dla Dziadka
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-100 p-3 rounded-full mb-3">
                <ShieldCheckIcon className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Z szacunkiem</h3>
              <p className="text-sm text-gray-600">Prezenty oddające hołd mądrości i doświadczeniu dziadka</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wyjątkowe</h3>
              <p className="text-sm text-gray-600">Praktyczne i personalizowane – stworzone specjalnie dla niego</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-slate-100 p-3 rounded-full mb-3">
                <HeartIcon className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Z miłością</h3>
              <p className="text-sm text-gray-600">Bo każdy dziadek zasługuje na to, co najlepsze</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-slate-200 opacity-20">
        <ShieldCheckIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-gray-200 opacity-20">
        <StarIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

DzienDziadkaHeroSection.displayName = 'DzienDziadkaHeroSection';