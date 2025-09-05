'use client';

import { memo } from 'react';

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
}

const SectionHeader = memo(({
  title = "Polecane produkty",
  subtitle = "Sprawdź nasze najlepsze produkty wybrane specjalnie dla Ciebie",
  badgeText,
  className = ''
}: SectionHeaderProps) => (
  <div className={`text-center mb-8 ${className}`}>
    {badgeText && (
      <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
        {badgeText}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;