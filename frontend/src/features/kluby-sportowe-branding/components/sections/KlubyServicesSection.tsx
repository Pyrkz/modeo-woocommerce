'use client';

import React from 'react';
import { KlubyServiceCard } from '../ui/KlubyServiceCard';
import { klubyServices } from '../../data/klubyData';

interface KlubyServicesSectionProps {
  id?: string;
  onConsultClick?: () => void;
}

export const KlubyServicesSection = React.memo(({ 
  id = "uslugi",
  onConsultClick
}: KlubyServicesSectionProps) => (
  <section id={id} className="py-16 lg:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nasze usługi dla branży: 
          <span className="text-primary"> Kluby Sportowe</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Oferujemy kompleksowe rozwiązania brandingowe dostosowane do specyfiki 
          Twojego klubu sportowego i wymagań sportowych
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {klubyServices.map((service) => (
          <KlubyServiceCard 
            key={service.id} 
            service={service} 
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Potrzebujesz indywidualnego rozwiązania sportowego?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nasi eksperci pomoją Ci wybrać najlepszą techniqu znakowania 
            dopasowaną do Twojego klubu i budżetu
          </p>
          <button 
            onClick={onConsultClick}
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Skonsultuj się z ekspertem
          </button>
        </div>
      </div>

    </div>
  </section>
));

KlubyServicesSection.displayName = 'KlubyServicesSection';