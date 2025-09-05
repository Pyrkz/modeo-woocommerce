'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  CakeIcon, 
  GiftIcon, 
  SparklesIcon, 
  StarIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';
import { UrodzinyStatsCard } from '../ui/UrodzinyStatsCard';

interface UrodzinyHeroSectionProps {
  onShopNowClick: () => void;
}

export const UrodzinyHeroSection = React.memo(({ onShopNowClick }: UrodzinyHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <CakeIcon className="w-6 h-6 text-yellow-600 animate-bounce" />
            <SparklesIcon className="w-5 h-5 text-orange-500" />
            <GiftIcon className="w-6 h-6 text-yellow-700" />
            <SparklesIcon className="w-5 h-5 text-orange-500" />
            <CakeIcon className="w-6 h-6 text-yellow-600 animate-bounce" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-yellow-600">Prezenty</span> na{' '}
            <span className="text-orange-600">Urodziny</span>
            <CakeIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-yellow-600 ml-2 animate-pulse" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Spraw radość w wyjątkowym dniu! Personalizowane prezenty urodzinowe na każdy wiek. 
            Stwórz niezapomniane chwile z naszą kolekcją unikalnych produktów.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={onShopNowClick}
            >
              <GiftIcon className="mr-2 h-5 w-5" />
              Zobacz Prezenty Urodzinowe
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <Link href="/sklep">
                Przeglądaj wszystkie produkty
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <UrodzinyStatsCard
              icon={<HeartIcon className="w-6 h-6 text-yellow-600" />}
              title="Personalizowane"
              description="Dodaj własny tekst, zdjęcie i stwórz unikalny prezent"
            />
            
            <UrodzinyStatsCard
              icon={<StarIcon className="w-6 h-6 text-orange-600" />}
              title="Na każdy wiek"
              description="Prezenty dla dzieci, młodzieży i dorosłych"
            />
            
            <UrodzinyStatsCard
              icon={<SparklesIcon className="w-6 h-6 text-yellow-600" />}
              title="Wysokiej jakości"
              description="Trwałe materiały premium i profesjonalny nadruk"
            />
          </div>

          {/* Birthday ages suggestions */}
          <div className="mt-12 p-6 bg-white/60 rounded-2xl border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎉 Popularne kategorie wiekowe:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'Dla dzieci (0-12)',
                'Dla nastolatków (13-17)', 
                'Dla młodych (18-30)',
                'Dla dorosłych (30+)',
                'Dla seniorów (60+)'
              ].map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors cursor-default"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-yellow-200 opacity-20 hidden lg:block">
        <CakeIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-orange-200 opacity-20 hidden lg:block">
        <GiftIcon className="w-32 h-32 transform -rotate-12" />
      </div>
      <div className="absolute top-1/2 left-6 text-yellow-200 opacity-10 hidden md:block">
        <SparklesIcon className="w-16 h-16 transform rotate-45" />
      </div>
      <div className="absolute top-1/4 right-6 text-orange-200 opacity-10 hidden md:block">
        <StarIcon className="w-20 h-20 transform -rotate-12" />
      </div>
    </section>
  );
});

UrodzinyHeroSection.displayName = 'UrodzinyHeroSection';