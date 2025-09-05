'use client';

import { memo } from 'react';
import Image from 'next/image';

interface GiftOccasionIconProps {
  iconPath: string;
  title: string;
  className?: string;
}

const GiftOccasionIcon = memo(({
  iconPath,
  title,
  className = ''
}: GiftOccasionIconProps) => (
  <div className={`
    flex-shrink-0 w-16 h-16 mb-4
    ${className}
  `}>
    <Image
      src={iconPath}
      alt={`Ikona ${title}`}
      width={64}
      height={64}
      className="w-full h-full object-contain"
      loading="lazy"
    />
  </div>
));

GiftOccasionIcon.displayName = 'GiftOccasionIcon';

export default GiftOccasionIcon;