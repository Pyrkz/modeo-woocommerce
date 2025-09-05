'use client';

import { memo } from 'react';
import { SectionBadge } from '@/components/ui';

interface FeaturedProductsHeaderProps {
  title: string;
  subtitle: string;
  badgeText: string;
  className?: string;
}

const FeaturedProductsHeader = memo(({ 
  title, 
  subtitle, 
  badgeText, 
  className = '' 
}: FeaturedProductsHeaderProps) => (
  <div className={`text-center mb-12 lg:mb-16 ${className}`}>
    <SectionBadge className="mb-4">
      {badgeText}
    </SectionBadge>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
      {title.split(' ').map((word, index) => {
        // Make specific words primary color based on the title
        if (word === 'naszych' || word === 'klientów' || word === 'polecane' || word === 'bestsellery') {
          return (
            <span key={index} className="text-primary">
              {word}{index < title.split(' ').length - 1 ? ' ' : ''}
            </span>
          );
        }
        return word + (index < title.split(' ').length - 1 ? ' ' : '');
      })}
    </h2>
    <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
));

FeaturedProductsHeader.displayName = 'FeaturedProductsHeader';

export default FeaturedProductsHeader;