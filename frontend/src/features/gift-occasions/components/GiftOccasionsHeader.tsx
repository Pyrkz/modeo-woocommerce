'use client';

import { memo } from 'react';

interface GiftOccasionsHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const GiftOccasionsHeader = memo(({
  title,
  subtitle,
  className = ''
}: GiftOccasionsHeaderProps) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      <span className="text-red-600">Na Prezent</span>
      <br />
      {title}
    </h2>
    
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
));

GiftOccasionsHeader.displayName = 'GiftOccasionsHeader';

export default GiftOccasionsHeader;