'use client';

import { memo } from 'react';
import { GiftCard } from '../../types';
import { OptimizedImage } from '../ui/OptimizedImage';
import { GiftBadge } from '../ui/GiftBadge';
import { GiftTitle } from '../ui/GiftTitle';
import { CTAButton } from './CTAButton';

interface GiftGridItemProps {
  gift: GiftCard & { 
    size: 'small' | 'medium' | 'large' | 'wide';
    span?: string;
    sizes?: string;
    priority?: boolean;
  };
  className?: string;
}

const GiftGridItem = memo(({ gift, className = '' }: GiftGridItemProps) => {
  const sizeClasses = {
    small: 'h-full',
    medium: 'h-full', 
    large: 'h-full',
    wide: 'h-full'
  };

  const getSizes = (size: string) => {
    if (gift.sizes) return gift.sizes;
    
    switch (size) {
      case 'large':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw';
      case 'wide':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw';
      case 'medium':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw';
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw';
    }
  };

  return (
    <article 
      className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${sizeClasses[gift.size]} ${className}`}
      role="listitem"
      aria-labelledby={`gift-title-${gift.id}`}
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src={gift.imagePath}
          alt={gift.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={getSizes(gift.size)}
          priority={gift.priority || (gift.index !== undefined && gift.index < 2)}
        />
        {/* Enhanced overlay with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 group-hover:via-black/50 group-hover:to-black/25 transition-all duration-300" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6">
        {/* Top section with badge */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1" /> {/* Spacer */}
          {gift.badge && <GiftBadge text={gift.badge} />}
        </div>
        
        {/* Bottom section with content and CTA */}
        <div className="mt-auto space-y-4">
          <div className="space-y-2">
            <GiftTitle 
              title={gift.title} 
              size={gift.size} 
              id={`gift-title-${gift.id}`} 
            />
            <p className="text-white/80 text-sm leading-relaxed hidden sm:block group-hover:text-white/90 transition-colors duration-300">
              Odkryj spersonalizowane prezenty
            </p>
          </div>
          
          {/* Clear CTA Button */}
          <CTAButton href={gift.href} size={gift.size} title={gift.title} />
        </div>
      </div>
    </article>
  );
});

GiftGridItem.displayName = 'GiftGridItem';

export { GiftGridItem };