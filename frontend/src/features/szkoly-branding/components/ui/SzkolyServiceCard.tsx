'use client';

import React from 'react';
import Link from 'next/link';
import { SzkolyService } from '../../types';

interface SzkolyServiceCardProps {
  service: SzkolyService;
  className?: string;
}

export const SzkolyServiceCard = React.memo(({ 
  service, 
  className = '' 
}: SzkolyServiceCardProps) => {
  const cardContent = (
    <>
      {/* Icon */}
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-primary group-hover:text-opacity-80 transition-colors">
          {service.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {service.description}
      </p>
      
      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div className="space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2" />
              {feature}
            </div>
          ))}
        </div>
      )}
      
      {/* Hover Effect */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="inline-flex items-center text-sm font-medium text-primary">
          Dowiedz się więcej
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </>
  );

  if (service.href) {
    return (
      <Link 
        href={service.href}
        className={`block bg-gradient-to-br ${service.gradient} p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 group ${className}`}
        aria-label={`Dowiedz się więcej o ${service.title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${service.gradient} p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 group ${className}`}>
      {cardContent}
    </div>
  );
});

SzkolyServiceCard.displayName = 'SzkolyServiceCard';