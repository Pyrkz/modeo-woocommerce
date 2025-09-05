'use client';

import React from 'react';
import { FirmyFeatureCard } from '../ui/FirmyFeatureCard';
import { firmyBenefits, firmyFeatures } from '../../data/firmyData';

interface FirmyBenefitsSectionProps {
  id?: string;
}

export const FirmyBenefitsSection = React.memo(({ 
  id = "korzyści" 
}: FirmyBenefitsSectionProps) => (
  <section id={id} className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dlaczego firmy wybierają Modeo?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Jesteśmy partnerem biznesowym dla firm, które stawiają na jakość i profesjonalizm
        </p>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Co nas wyróżnia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {firmyFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="text-3xl mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold mb-2 text-primary">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Korzyści dla Twojej firmy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firmyBenefits.map((benefit) => (
            <FirmyFeatureCard 
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
            Zaufały nam firmy z różnych branż
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">🏭</div>
            <h4 className="font-semibold text-gray-900 mb-2">Przemysł</h4>
            <p className="text-sm text-gray-600">
              Odzież robocza, oznakowanie bezpieczeństwa
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">💼</div>
            <h4 className="font-semibold text-gray-900 mb-2">Usługi</h4>
            <p className="text-sm text-gray-600">
              Stroje służbowe, materiały promocyjne
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🏪</div>
            <h4 className="font-semibold text-gray-900 mb-2">Handel</h4>
            <p className="text-sm text-gray-600">
              Uniformy, gadżety reklamowe
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
));

FirmyBenefitsSection.displayName = 'FirmyBenefitsSection';