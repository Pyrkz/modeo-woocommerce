'use client';

import React from 'react';
import { RestauracjeFeatureCard } from '../ui/RestauracjeFeatureCard';
import { RestauracjeBenefitCard } from '../ui/RestauracjeBenefitCard';
import { restauracjeBenefits, restauracjeFeatures } from '../../data/restauracjeData';

interface RestauracjeBenefitsSectionProps {
  id?: string;
}

export const RestauracjeBenefitsSection = React.memo(({ 
  id = "korzyści" 
}: RestauracjeBenefitsSectionProps) => (
  <section id={id} className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-amber-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dlaczego restauracje wybierają Modeo?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Jesteśmy partnerem dla restauracji, które stawiają na jakość, higienę i profesjonalny wizerunek
        </p>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Co nas wyróżnia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restauracjeFeatures.map((feature) => (
            <RestauracjeFeatureCard 
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Korzyści dla Twojej restauracji
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restauracjeBenefits.map((benefit) => (
            <RestauracjeBenefitCard 
              key={benefit.id} 
              benefit={benefit} 
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Zaufały nam restauracje z różnych segmentów
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">🍕</div>
            <h4 className="font-semibold text-gray-900 mb-2">Fast Food</h4>
            <p className="text-sm text-gray-600">
              Funkcjonalne uniformy, odporność na tłuszcz
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🥂</div>
            <h4 className="font-semibold text-gray-900 mb-2">Fine Dining</h4>
            <p className="text-sm text-gray-600">
              Eleganckie stroje obsługi, premium wykończenie
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">☕</div>
            <h4 className="font-semibold text-gray-900 mb-2">Kawiarnie</h4>
            <p className="text-sm text-gray-600">
              Barista uniforms, stylowe fartuchy
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
));

RestauracjeBenefitsSection.displayName = 'RestauracjeBenefitsSection';