'use client';

import React from 'react';
import Link from 'next/link';
import { RestauracjeService } from '../../types';

interface RestauracjeServiceCardProps {
  service: RestauracjeService;
  className?: string;
}

export const RestauracjeServiceCard = React.memo(({ 
  service, 
  className = '' 
}: RestauracjeServiceCardProps) => {
  return (
    <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ${className}`}>
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4">
          {service.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
        
        {/* Features list */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Link */}
        <Link 
          href={service.href}
          className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors group"
        >
          <span>Dowiedz się więcej</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
});

RestauracjeServiceCard.displayName = 'RestauracjeServiceCard';