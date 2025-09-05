'use client';

import { memo } from 'react';

interface SliderIndicatorsProps {
  totalItems: number;
  visibleItems: number;
  currentIndex: number;
  onIndicatorClick?: (index: number) => void;
  className?: string;
}

const SliderIndicators = memo(({ 
  totalItems, 
  visibleItems, 
  currentIndex,
  onIndicatorClick,
  className = '' 
}: SliderIndicatorsProps) => {
  const totalPages = Math.max(1, totalItems - visibleItems + 1);
  
  if (totalPages <= 1) return null;
  
  return (
    <div className={`flex justify-center items-center gap-2 mt-4 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => {
        const isActive = index === currentIndex;
        
        return (
          <button
            key={index}
            onClick={() => onIndicatorClick?.(index)}
            className={`
              slider-indicator w-2 h-2 rounded-full
              ${isActive 
                ? 'bg-primary active' 
                : 'bg-gray-300 hover:bg-gray-400'
              }
            `}
            aria-label={`Przejdź do strony ${index + 1}`}
          />
        );
      })}
    </div>
  );
});

SliderIndicators.displayName = 'SliderIndicators';

export default SliderIndicators;