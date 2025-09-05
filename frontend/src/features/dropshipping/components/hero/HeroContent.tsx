'use client';

import React from 'react';
import { DropshippingHeroData } from '../../types';

interface HeroContentProps {
  data: DropshippingHeroData;
}

export const HeroContent = React.memo(function HeroContent({ data }: HeroContentProps) {
  return (
    <div className="space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full">
        <span className="text-sm font-medium text-red-600">
          {data.badge}
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          {data.title.part1}{' '}
          <span className="text-red-600">
            {data.title.highlight}
          </span>{' '}
          <span className="block lg:inline">
            {data.title.part2}
          </span>
        </h1>
      </div>

      {/* Subtitle & Description */}
      <div className="space-y-4">
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
          {data.subtitle}
        </p>
        <p className="text-red-600 font-semibold">
          {data.highlightText}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <button className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
          Rozpocznij dropshipping
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
});