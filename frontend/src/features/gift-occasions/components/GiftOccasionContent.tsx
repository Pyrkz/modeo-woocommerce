'use client';

import { memo } from 'react';

interface GiftOccasionContentProps {
  title: string;
  description: string;
  className?: string;
}

const GiftOccasionContent = memo(({
  title,
  description,
  className = ''
}: GiftOccasionContentProps) => (
  <div className={`flex-1 flex flex-col justify-center ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    
    <p className="text-sm text-gray-600 line-clamp-2">
      {description}
    </p>
  </div>
));

GiftOccasionContent.displayName = 'GiftOccasionContent';

export default GiftOccasionContent;