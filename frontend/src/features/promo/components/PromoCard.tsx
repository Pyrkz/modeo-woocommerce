'use client';

import { memo } from 'react';
import PromoCardImage from './PromoCardImage';
import PromoCardContent from './PromoCardContent';
import PromoCardCTA from './PromoCardCTA';
import { PromoCard as PromoCardType } from '../types';

interface PromoCardProps {
  promo: PromoCardType;
  className?: string;
}

const PromoCard = memo(({ promo, className = '' }: PromoCardProps) => {
  return (
    <div className={`
      group relative overflow-hidden rounded-2xl h-full min-h-[400px] sm:min-h-[450px]
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:shadow-2xl
      focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2
      ${className}
    `}>
      {/* Background Image with improved overlay */}
      <PromoCardImage
        imagePath={promo.imagePath}
        imageAlt={promo.imageAlt}
      />

      {/* Content Container - positioned absolutely to allow proper button positioning */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Content */}
        <PromoCardContent
          title={promo.title}
          description={promo.description}
          badge={promo.badge}
        />

        {/* CTA Button */}
        <PromoCardCTA
          ctaText={promo.ctaText}
          ctaHref={promo.ctaHref}
        />
      </div>
    </div>
  );
});

PromoCard.displayName = 'PromoCard';

export default PromoCard;