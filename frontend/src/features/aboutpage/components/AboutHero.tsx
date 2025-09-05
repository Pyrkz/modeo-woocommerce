'use client';

import { HeroBackground } from './HeroBackground';
import { aboutFeaturesData } from '../data/aboutData';
import { AboutHeroProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutHero({ className }: AboutHeroProps) {
  return (
    <section className={cn(
      "relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px] flex items-center overflow-hidden",
      className
    )}>
      <HeroBackground 
        src="/resources/Banner-sklep.webp"
        alt="Modeo zespół"
        overlayOpacity={0.5}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          {/* Greeting */}
          <p className="text-primary font-semibold text-sm mb-4 tracking-wide uppercase">
            Cześć? Potrzebujesz?
          </p>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Zapoznaj się z modeo.
          </h1>
          
          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Jesteśmy zespołem ludzi, którzy kochają to, co robią. Modeo to więcej niż firma — to miejsce, 
            gdzie pasja spotyka się z profesjonalizmem, a każdy projekt traktujemy jak własny.
          </p>

          {/* Inline Features */}
          <div className="space-y-3 mb-8">
            {aboutFeaturesData.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.id} className="flex items-start gap-3">
                  <div className="w-6 h-6 text-primary flex-shrink-0 mt-0.5">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
              Skontaktuj się z nami
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-white/20">
              Poznaj nasz zespół
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-white/60 text-xs mt-6">
            Dowiedz się więcej →
          </p>
        </div>
      </div>
    </section>
  );
}