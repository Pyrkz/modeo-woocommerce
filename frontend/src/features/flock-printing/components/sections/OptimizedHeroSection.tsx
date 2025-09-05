'use client';

import React from 'react';
import Image from 'next/image';
import { FeatureCard } from '../ui/FeatureCard';
import { PriceCard } from '../ui/PriceCard';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';

const FEATURES = [
  { icon: "🥇", text: "Aksamitna faktura" },
  { icon: "✨", text: "Elegant wykończenie" },
  { icon: "💪", text: "Trwały i elastyczny" },
  { icon: "⏰", text: "Szybka realizacja" }
];

const PRICE_FEATURES = [
  "Atrakcyjna cena od 1 sztuki",
  "Unikalna aksamitna faktura", 
  "Premium wykończenie"
];

const VERTICAL_TEXTS = [
  { text: "MODEO" },
  { text: "SKLEP" },
  { text: "FLOCK" }
];

export const OptimizedHeroSection: React.FC = () => {
  const [titleRef, titleVisible] = useViewportAnimation({ threshold: 0.3 });

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-between">
      
      {/* LEWA STRONA / GÓRNA CZĘŚĆ NA MOBILE - Informacje o flock */}
      <div className="relative z-30 flex-1 px-4 sm:px-8 lg:px-16 max-w-full lg:max-w-2xl pt-16 sm:pt-20 md:pt-8 lg:pt-0">
        <div className="space-y-6 lg:space-y-12">
          
          {/* Główny nagłówek */}
          <div 
            ref={titleRef}
            className={`
              space-y-4 lg:space-y-6 transition-all duration-1000 ease-out
              ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-1 h-8 lg:h-12 bg-gradient-to-b from-primary to-primary-600 rounded-full" />
              <span className="text-xs lg:text-sm font-bold text-primary tracking-widest uppercase">
                Premium Flock
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Aksamitna
              </span>
              <br />
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                faktura
              </span>
              <br />
              <span className="text-slate-900">premium</span>
            </h1>
          </div>

          {/* Kluczowe cechy - 2x2 grid na mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 max-w-lg">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                text={feature.text}
                delay={index}
              />
            ))}
          </div>

          {/* MOBILE ONLY: Static images section */}
          <div className="lg:hidden mt-8 relative">
            <div className="relative max-w-sm mx-auto">
              
              {/* Flock background */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30">
                <Image
                  src="/znakowanie/flock-min.png"
                  alt="Flock Background"
                  width={600}
                  height={300}
                  className="w-full h-auto max-w-[400px]"
                  loading="eager"
                  priority
                />
              </div>
              
              {/* T-shirt image */}
              <div className="relative z-10">
                <Image
                  src="/resources/Odpicuj-swoja-koszulke-min.webp"
                  alt="Personalizowana koszulka z flock"
                  width={300}
                  height={300}
                  className="drop-shadow-2xl w-64 h-64 sm:w-72 sm:h-72 mx-auto"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* PRAWA STRONA / DOLNA CZĘŚĆ NA MOBILE - Cennik i kontrolki */}
      <div className="relative z-20 flex flex-col lg:flex-row h-auto lg:h-full max-w-full lg:max-w-lg px-4 sm:px-8 lg:px-0 pb-8 lg:pb-0 mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8">
        
        {/* Pierwsza kolumna - Cena i informacje */}
        <div className="flex flex-col justify-center lg:justify-end px-0 lg:px-8 space-y-6 lg:space-y-8 flex-1 lg:pb-8 order-2 lg:order-1 mb-8">
          <PriceCard
            price={10}
            currency="zł"
            features={PRICE_FEATURES}
          />
        </div>

        {/* Druga kolumna - Napisy pionowe - ukryte na mobile */}
        <div className="hidden lg:flex flex-col justify-center items-center w-fit px-1 space-y-32 order-1 lg:order-2">
          {VERTICAL_TEXTS.map((item, index) => (
            <div key={index}>
              <span 
                className="text-2xl lg:text-3xl font-black tracking-[0.15em] text-dark block"
                style={{ 
                  transform: 'rotate(90deg)',
                  transformOrigin: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedHeroSection;