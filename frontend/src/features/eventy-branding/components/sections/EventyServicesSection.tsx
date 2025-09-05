'use client';

import React from 'react';
import Link from 'next/link';
import { eventyServices } from '../../data/eventyData';
import { EventyServiceCard } from '../ui/EventyServiceCard';

interface EventyServicesSectionProps {
  id?: string;
  onConsultClick: () => void;
}

export const EventyServicesSection = React.memo(({ 
  id, 
  onConsultClick 
}: EventyServicesSectionProps) => {
  return (
    <section id={id} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Usługi znakowania eventowego
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferujemy pełen zakres technik znakowania dostosowanych do potrzeb eventowych. 
            Od gadżetów promocyjnych po odzież dla organizatorów i uczestników.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {eventyServices.map((service) => (
            <EventyServiceCard 
              key={service.id} 
              service={service}
            />
          ))}
        </div>

        <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Potrzebujesz doradztwa przy wyborze techniki?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nasz ekspert pomoże Ci wybrać najlepszą metodę znakowania dla Twojego eventu, 
            uwzględniając budżet, nakład i charakterystykę wydarzenia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onConsultClick}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Bezpłatna konsultacja
            </button>
            <Link
              href="/znakowanie"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-center"
            >
              Wszystkie techniki
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

EventyServicesSection.displayName = 'EventyServicesSection';