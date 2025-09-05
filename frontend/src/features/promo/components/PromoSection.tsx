'use client';

import { memo } from 'react';
import PromoHeader from './PromoHeader';
import PromoCard from './PromoCard';
import { usePromosPreload } from '../hooks/usePromosPreload';
import { PromoCard as PromoCardType } from '../types';

interface PromoSectionProps {
  title?: string;
  subtitle?: string;
  promos: PromoCardType[];
  className?: string;
}

const PromoSection = memo(({ 
  title,
  subtitle,
  promos, 
  className = '' 
}: PromoSectionProps) => {
  // Preload promo links for performance
  usePromosPreload(promos);

  if (!promos.length) return null;

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <PromoHeader
            title={title}
            subtitle={subtitle}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {promos.map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

PromoSection.displayName = 'PromoSection';

export default PromoSection;