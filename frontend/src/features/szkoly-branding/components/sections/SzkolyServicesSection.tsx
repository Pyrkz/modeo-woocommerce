'use client';

import React from 'react';
import { SzkolyServiceCard } from '../ui/SzkolyServiceCard';
import { szkolyServices } from '../../data/szkolyData';

interface SzkolyServicesSectionProps {
  className?: string;
  id?: string;
  onConsultClick?: () => void;
}

export const SzkolyServicesSection = React.memo(({ 
  className = '',
  id,
  onConsultClick 
}: SzkolyServicesSectionProps) => (
  <section id={id} className={`py-16 lg:py-20 bg-gray-50 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Specjalizujemy się w{' '}
          <span className="text-primary">znakowanie szkolnym</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Oferujemy kompleksowe rozwiązania dla szkół, przedszkoli i uczelni. 
          Od mundurków szkolnych po akcesoria edukacyjne.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {szkolyServices.map((service, index) => (
          <SzkolyServiceCard 
            key={index}
            service={service}
            className="h-full"
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Potrzebujesz niestandardowego rozwiązania?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Każda szkoła jest inna. Skontaktuj się z nami, aby omówić 
            indywidualne potrzeby Twojej placówki edukacyjnej.
          </p>
          <button
            onClick={onConsultClick}
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Skontaktuj się z nami
          </button>
        </div>
      </div>
      
    </div>
  </section>
));

SzkolyServicesSection.displayName = 'SzkolyServicesSection';