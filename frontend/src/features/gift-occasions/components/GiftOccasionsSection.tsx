'use client';

import { memo } from 'react';
import GiftOccasionsHeader from './GiftOccasionsHeader';
import GiftOccasionsGrid from './GiftOccasionsGrid';
import { giftOccasionsData, giftOccasionsSectionContent } from '../data/giftOccasionsData';
import { GiftOccasion } from '../types';

interface GiftOccasionsSectionProps {
  title?: string;
  subtitle?: string;
  occasions?: GiftOccasion[];
  onOccasionClick?: (occasion: GiftOccasion) => void;
  isClickable?: boolean;
  showArrow?: boolean;
  className?: string;
}

const GiftOccasionsSection = memo(({
  title = giftOccasionsSectionContent.title,
  subtitle = giftOccasionsSectionContent.subtitle,
  occasions = giftOccasionsData,
  onOccasionClick,
  isClickable = true,
  showArrow = true,
  className = ''
}: GiftOccasionsSectionProps) => (
  <section className={`py-16 lg:py-20 bg-white ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GiftOccasionsHeader
        title={title}
        subtitle={subtitle}
      />
      
      <GiftOccasionsGrid
        occasions={occasions}
        onOccasionClick={onOccasionClick}
        isClickable={isClickable}
        showArrow={showArrow}
      />
    </div>
  </section>
));

GiftOccasionsSection.displayName = 'GiftOccasionsSection';

export default GiftOccasionsSection;