'use client';

import { memo } from 'react';
import { GiftCard } from '../../types';
import { FlexibleGiftGrid } from './FlexibleGiftGrid';

interface GiftGridProps {
  gifts: GiftCard[];
}

const GiftGrid = memo(({ gifts }: GiftGridProps) => {
  return <FlexibleGiftGrid gifts={gifts} />;
});

GiftGrid.displayName = 'GiftGrid';

export { GiftGrid };