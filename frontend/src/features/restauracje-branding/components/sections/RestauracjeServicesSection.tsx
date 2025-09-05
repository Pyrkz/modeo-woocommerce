'use client';

import React from 'react';
import { RestauracjeServiceCard } from '../ui/RestauracjeServiceCard';
import { restauracjeServices } from '../../data/restauracjeData';

interface RestauracjeServicesSectionProps {
  id?: string;
  onConsultClick?: () => void;
}

export const RestauracjeServicesSection = React.memo(({ 
  id = "uslugi",
  onConsultClick
}: RestauracjeServicesSectionProps) => (
  <section id={id} className="py-16 lg:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nasze usługi dla branży: 
          <span className="text-primary"> Restauracji</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Oferujemy kompleksowe rozwiązania brandingowe dostosowane do specyfiki 
          gastronomii i wymagań sanitarnych
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restauracjeServices.map((service) => (
          <RestauracjeServiceCard 
            key={service.id} 
            service={service} 
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Potrzebujesz indywidualnego rozwiązania?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nasi eksperci pomoją Ci wybrać najlepszą technikę znakowania 
            dopasowaną do Twojej restauracji i wymagań HACCP
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

RestauracjeServicesSection.displayName = 'RestauracjeServicesSection';