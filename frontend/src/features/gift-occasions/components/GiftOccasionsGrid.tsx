'use client';

import { memo } from 'react';
import GiftOccasionCard from './GiftOccasionCard';
import { GiftOccasion } from '../types';
import { useGiftOccasionsPreload } from '../hooks/useGiftOccasionsPreload';

interface GiftOccasionsGridProps {
  occasions: GiftOccasion[];
  onOccasionClick?: (occasion: GiftOccasion) => void;
  isClickable?: boolean;
  showArrow?: boolean;
  className?: string;
}

const GiftOccasionsGrid = memo(({
  occasions,
  onOccasionClick,
  isClickable = true,
  showArrow = true,
  className = ''
}: GiftOccasionsGridProps) => {
  // Preload occasion links for better performance
  useGiftOccasionsPreload(occasions);

  return (
    <div className={`
      grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8
      ${className}
    `}>
      {occasions.map((occasion) => (
        <GiftOccasionCard
          key={occasion.id}
          occasion={occasion}
          onClick={onOccasionClick ? () => onOccasionClick(occasion) : undefined}
          isClickable={isClickable}
          showArrow={showArrow}
        />
      ))}
    </div>
  );
});

GiftOccasionsGrid.displayName = 'GiftOccasionsGrid';

export default GiftOccasionsGrid;