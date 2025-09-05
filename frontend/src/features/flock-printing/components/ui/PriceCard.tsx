'use client';

import React from 'react';

interface PriceCardProps {
  price: number;
  currency?: string;
  features: string[];
  className?: string;
}

export const PriceCard: React.FC<PriceCardProps> = ({ 
  price, 
  currency = 'zł',
  features,
  className = '' 
}) => {
  return (
    <div className={`
      bg-gradient-to-r from-primary to-primary-600 
      rounded-3xl p-6 lg:p-8 text-white shadow-2xl w-full
      ${className}
    `}>
      <div className="space-y-2 lg:space-y-3 text-center">
        <p className="text-base lg:text-lg opacity-90">Flock już od</p>
        <div className="flex items-baseline justify-center gap-1 lg:gap-2">
          <span className="text-4xl lg:text-6xl font-black">{price}</span>
          <span className="text-xl lg:text-2xl font-bold">{currency}</span>
        </div>
        <div className="text-xs lg:text-sm opacity-80">
          {features.map((feature, index) => (
            <div key={index}>• {feature}</div>
          ))}
        </div>
      </div>
    </div>
  );
};