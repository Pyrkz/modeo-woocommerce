'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { UserGroupIcon, GiftIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface DzienChlopakaHeroSectionProps {
  onShopNowClick: () => void;
}

export const DzienChlopakaHeroSection = React.memo(({ onShopNowClick }: DzienChlopakaHeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <UserGroupIcon className="w-6 h-6 text-blue-600 animate-pulse" />
            <SparklesIcon className="w-5 h-5 text-indigo-500" />
            <GiftIcon className="w-6 h-6 text-blue-700" />
            <SparklesIcon className="w-5 h-5 text-indigo-500" />
            <UserGroupIcon className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-blue-600">Prezenty</span> na{' '}
            <span className="text-indigo-600">Dzień Chłopaka</span>
            <UserGroupIcon className="inline-block w-8 h-8 md:w-12 md:h-12 text-blue-600 ml-2 animate-bounce" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Doceni każdego prawdziwego mężczyznę z personalizowanymi prezentami na Dzień Chłopaka. 
            Stylowe akcesoria o męskim charakterze, które podkreślą jego osobowość.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={onShopNowClick}
          >
            <UserGroupIcon className="mr-2 h-5 w-5" />
            Zobacz Prezenty dla Mężczyzn
          </Button>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <UserGroupIcon className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Stylowe</h3>
              <p className="text-sm text-gray-600">Designy i akcesoria dopasowane do męskich gustów</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <GiftIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Personalizowane</h3>
              <p className="text-sm text-gray-600">Indywidualne nadruki i projekty stworzone specjalnie dla niego</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <SparklesIcon className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Solidne i trwałe</h3>
              <p className="text-sm text-gray-600">Wysokiej jakości wykonanie, które zostanie na lata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-blue-200 opacity-20">
        <UserGroupIcon className="w-24 h-24 transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-indigo-200 opacity-20">
        <UserGroupIcon className="w-32 h-32 transform -rotate-12" />
      </div>
    </section>
  );
});

DzienChlopakaHeroSection.displayName = 'DzienChlopakaHeroSection';