'use client';

import React from 'react';
import Link from 'next/link';
import { EventyService } from '../../types';

interface EventyServiceCardProps {
  service: EventyService;
}

export const EventyServiceCard = React.memo(({ service }: EventyServiceCardProps) => {
  return (
    <Link 
      href={service.href}
      className="block group hover:scale-105 transition-all duration-300"
    >
      <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-6 h-full border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300`}>
        {/* Icon and Title */}
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">{service.icon}</div>
          <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="flex items-center justify-between">
          <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">
            Dowiedz się więcej
          </span>
          <svg 
            className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
});

EventyServiceCard.displayName = 'EventyServiceCard';