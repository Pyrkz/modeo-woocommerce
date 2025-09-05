'use client';

import { memo } from 'react';

interface PromoHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const PromoHeader = memo(({ 
  title,
  subtitle,
  className = '' 
}: PromoHeaderProps) => {
  if (!title && !subtitle) return null;

  return (
    <div className={`text-center mb-12 lg:mb-16 ${className}`}>
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
});

PromoHeader.displayName = 'PromoHeader';

export default PromoHeader;