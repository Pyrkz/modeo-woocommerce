'use client';

import { memo } from 'react';

interface SectionHeaderProps {
  tagline?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader = memo(({
  tagline,
  title,
  description,
  className = ''
}: SectionHeaderProps) => {
  return (
    <div className={`max-w-4xl mx-auto text-center mb-16 sm:mb-20 ${className}`}>
      {/* Section Tagline */}
      {tagline && (
        <p className="text-red-600 font-semibold text-base sm:text-lg mb-4 tracking-wide">
          {tagline}
        </p>
      )}
      
      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
        {title}
      </h2>
      
      {/* Description Text */}
      {description && (
        <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';