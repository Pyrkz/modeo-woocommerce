'use client';

import React from 'react';
import Image from 'next/image';
import { ColorSelector } from '../ui/ColorSelector';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';

const COLORS = [
  { name: 'Czerwony', value: '#dc2626' },
  { name: 'Czarny', value: '#1a1a1a' },
  { name: 'Niebieski', value: '#2563eb' },
  { name: 'Zielony', value: '#16a34a' },
  { name: 'Biały', value: '#ffffff' }
];

const BENEFITS = [
  "Fotorealistyczne detale",
  "Bez ograniczeń kolorów", 
  "Elastyczny i trwały nadruk",
  "Świetny na różnych materiałach"
];

interface BenefitItemProps {
  benefit: string;
  index: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ benefit, index }) => {
  const [ref, isVisible] = useViewportAnimation({ threshold: 0.3 });
  
  return (
    <div 
      ref={ref}
      className={`
        flex items-center justify-center gap-3 transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
      <span className="text-slate-700 font-medium text-center text-sm sm:text-base">
        {benefit}
      </span>
    </div>
  );
};

interface OptimizedProductSectionProps {
  onQuoteClick?: () => void;
}

export const OptimizedProductSection: React.FC<OptimizedProductSectionProps> = ({ 
  onQuoteClick 
}) => {
  const [headerRef, headerVisible] = useViewportAnimation({ threshold: 0.3 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-6 sm:py-8 lg:py-16 px-3 sm:px-4 lg:px-8 flex items-center relative">
      
      {/* Delikatny accent gradient z primary colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-50/20" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* MOBILE LAYOUT - Stackowane pionowo */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          
          {/* Nagłówek */}
          <div 
            ref={headerRef}
            className={`
              text-center space-y-4 sm:space-y-6 transition-all duration-1000 ease-out
              ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight px-2">
              <span className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                DTF
              </span>
              <br />
              <span className="text-slate-900">ZALETY</span>
            </h2>
            
            <div className="space-y-2 sm:space-y-3 px-4">
              {BENEFITS.map((benefit, index) => (
                <BenefitItem key={index} benefit={benefit} index={index} />
              ))}
            </div>
          </div>

          {/* Obrazki */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl aspect-square overflow-hidden shadow-lg max-w-xs sm:max-w-sm mx-auto">
              <Image 
                src="/resources/odziez-firmowa-twoje-logo.jpg"
                alt="Odzież firmowa z DTF"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 400px"
                loading="lazy"
              />
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl aspect-square overflow-hidden shadow-lg max-w-xs sm:max-w-sm mx-auto">
              <Image 
                src="/resources/modeo-koszulki-dla-twojej-marki.webp"
                alt="Koszulki z DTF dla Twojej marki"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 400px"
                loading="lazy"
              />
            </div>
          </div>

          {/* Kontrolki */}
          <div className="space-y-4 sm:space-y-6 text-center px-4">
            
            {/* Wybór kolorów */}
            <ColorSelector colors={COLORS} />

            {/* Przycisk CTA */}
            <button 
              onClick={onQuoteClick}
              className="w-full max-w-xs bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Złóż zapytanie
            </button>
          </div>

          {/* Paragraf opisowy */}
          <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto px-4">
            <p className="text-slate-600 leading-relaxed text-center text-sm sm:text-base">
              DTF to nowoczesna technologia druku, która pozwala na tworzenie fotorealistycznych nadruków 
              bez ograniczeń kolorów na różnych materiałach.
            </p>
            
            <div className="border-l-4 border-primary pl-3 sm:pl-4">
              <p className="text-xs sm:text-sm text-slate-500 italic">
                Używamy najnowszych tusz DTF, które zapewniają elastyczność 
                i trwałość nadruku przez lata użytkowania.
              </p>
            </div>
          </div>
        </div>

        {/* TABLET LAYOUT - 2 kolumny */}
        <div className="hidden lg:hidden md:grid grid-cols-2 gap-6 xl:gap-8">
          
          {/* LEWA KOLUMNA */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  DTF
                </span>
                <br />
                <span className="text-slate-900">ZALETY</span>
              </h2>
              
              <div className="space-y-3">
                {BENEFITS.map((benefit, index) => (
                  <BenefitItem key={index} benefit={benefit} index={index} />
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl aspect-square overflow-hidden shadow-lg">
              <Image 
                src="/resources/odziez-firmowa-twoje-logo.jpg"
                alt="Odzież firmowa z DTF"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 1024px) 400px, 500px"
                loading="lazy"
              />
            </div>
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="relative rounded-3xl aspect-square overflow-hidden shadow-lg">
              <Image 
                src="/resources/modeo-koszulki-dla-twojej-marki.webp"
                alt="Koszulki z DTF dla Twojej marki"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 1024px) 400px, 500px"
                loading="lazy"
              />
            </div>

            <div className="space-y-6">
              <ColorSelector colors={COLORS} className="text-center" />

              <div className="text-center">
                <button 
                  onClick={onQuoteClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Złóż zapytanie
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  DTF to nowoczesna technologia druku, która pozwala na tworzenie fotorealistycznych nadruków 
                  bez ograniczeń kolorów na różnych materiałach.
                </p>
                
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm text-slate-500 italic">
                    Używamy najnowszych tusz DTF, które zapewniają elastyczność 
                    i trwałość nadruku przez lata użytkowania.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT - Grid 3 kolumny */}
        <div className="hidden lg:grid grid-cols-12 gap-6 xl:gap-8 h-full">
          
          {/* LEWA KOLUMNA - Benefits i obrazek */}
          <div className="col-span-4 space-y-6 xl:space-y-8">
            <div className="space-y-4 xl:space-y-6">
              <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-black text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  DTF
                </span>
                <br />
                <span className="text-slate-900">ZALETY</span>
              </h2>
              
              <div className="space-y-3 xl:space-y-4">
                {BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-slate-700 font-medium text-sm xl:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl aspect-square overflow-hidden shadow-lg">
              <Image 
                src="/resources/odziez-firmowa-twoje-logo.jpg"
                alt="Odzież firmowa z DTF"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 1280px) 300px, (max-width: 1536px) 350px, 400px"
                loading="lazy"
              />
            </div>
          </div>

          {/* ŚRODKOWA KOLUMNA - Kolory i przycisk (na dole) */}
          <div className="col-span-4 flex flex-col justify-end pb-6 xl:pb-8">
            <div className="space-y-4 xl:space-y-6">
              <ColorSelector colors={COLORS} className="text-center" />

              <div className="flex justify-center">
                <button 
                  onClick={onQuoteClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 xl:py-4 px-6 xl:px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm xl:text-base"
                >
                  Złóż zapytanie
                </button>
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA - Obrazek i paragraf */}
          <div className="col-span-4 space-y-4 xl:space-y-6">
            <div className="relative rounded-3xl aspect-square overflow-hidden shadow-lg">
              <Image 
                src="/resources/modeo-koszulki-dla-twojej-marki.webp"
                alt="Koszulki z DTF dla Twojej marki"
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
                sizes="(max-width: 1280px) 300px, (max-width: 1536px) 350px, 400px"
                loading="lazy"
              />
            </div>

            <div className="space-y-3 xl:space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm xl:text-base">
                DTF to nowoczesna technologia druku, która pozwala na tworzenie fotorealistycznych nadruków 
                bez ograniczeń kolorów na różnych materiałach.
              </p>
              
              <div className="border-l-4 border-primary pl-3 xl:pl-4">
                <p className="text-xs xl:text-sm text-slate-500 italic">
                  Używamy najnowszych tusz DTF, które zapewniają elastyczność 
                  i trwałość nadruku przez lata użytkowania.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OptimizedProductSection;