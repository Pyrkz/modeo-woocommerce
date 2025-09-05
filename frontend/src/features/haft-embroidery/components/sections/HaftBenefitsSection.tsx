'use client';

import React from 'react';
import { haftBenefits } from '../../data/embroideryData';

interface HaftBenefitsSectionProps {
  id?: string;
}

export const HaftBenefitsSection: React.FC<HaftBenefitsSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego Wybierają Nasz Haft?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nowoczesne technologie, doświadczenie i pasja do perfekcji sprawiają, że nasze hafty 
            wyróżniają się jakością i trwałością na rynku.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {haftBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary-200 group"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary-100 transition-colors duration-300">
                  {benefit.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-primary-50 rounded-full">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-primary-800 font-medium text-sm">
              Gwarancja najwyższej jakości wykonania
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};