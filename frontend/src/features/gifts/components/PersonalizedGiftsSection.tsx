'use client';

import { memo } from 'react';
import { SectionHeader } from './header';
import { GiftGrid } from './grid';
import { PersonalizedGiftsSectionProps } from '../types';

const PersonalizedGiftsSection = memo(({ 
  title, 
  subtitle, 
  badgeText, 
  gifts,
  className = '' 
}: PersonalizedGiftsSectionProps) => {
  if (!gifts.length) return null;

  return (
    <section 
      className={`py-16 sm:py-20 lg:py-24 bg-white ${className}`}
      aria-labelledby="gifts-section-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badgeText={badgeText}
          title={title}
          subtitle={subtitle}
        />
        <div role="list" aria-label="Spersonalizowane prezenty">
          <GiftGrid gifts={gifts} />
        </div>
      </div>
    </section>
  );
});

PersonalizedGiftsSection.displayName = 'PersonalizedGiftsSection';

export default PersonalizedGiftsSection;