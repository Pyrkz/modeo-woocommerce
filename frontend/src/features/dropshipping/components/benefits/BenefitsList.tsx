'use client';

import React from 'react';

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {benefits.map((benefit, index) => (
          <React.Fragment key={benefit}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-700 font-medium">{benefit}</span>
            </div>
            {index < benefits.length - 1 && (
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}