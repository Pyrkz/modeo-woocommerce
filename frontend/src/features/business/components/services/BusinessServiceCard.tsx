'use client';

import { memo } from 'react';
import Link from 'next/link';
import { BusinessService } from '../../types/services';

interface BusinessServiceCardProps {
  service: BusinessService;
}

const BusinessServiceCard = memo<BusinessServiceCardProps>(({ service }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100">
      {/* Icon */}
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-8 text-sm">
        {service.description}
      </p>

      {/* Link */}
      <Link
        href={service.link.href}
        className="inline-flex items-center text-red-500 hover:text-red-600 font-medium text-sm transition-colors duration-300 group"
      >
        {service.link.text}
        <svg 
          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
});

BusinessServiceCard.displayName = 'BusinessServiceCard';

export default BusinessServiceCard;