'use client';

import { memo } from 'react';

interface SliderOverlayProps {
  variant?: 'gradient' | 'solid';
  opacity?: 'light' | 'medium' | 'dark';
  className?: string;
}

const SliderOverlay = memo(({ 
  variant = 'gradient', 
  opacity = 'medium',
  className = '' 
}: SliderOverlayProps) => {
  const getOverlayClasses = () => {
    const baseClasses = 'absolute inset-0 pointer-events-none';
    
    if (variant === 'gradient') {
      switch (opacity) {
        case 'light':
          return `${baseClasses} bg-gradient-to-r from-primary/40 via-primary/20 to-primary/10`;
        case 'medium':
          return `${baseClasses} bg-gradient-to-r from-primary/60 via-primary/30 to-primary/15`;
        case 'dark':
          return `${baseClasses} bg-gradient-to-r from-primary/80 via-primary/40 to-primary/20`;
        default:
          return `${baseClasses} bg-gradient-to-r from-primary/60 via-primary/30 to-primary/15`;
      }
    }
    
    // Solid overlay fallback
    switch (opacity) {
      case 'light':
        return `${baseClasses} bg-black/20`;
      case 'medium':
        return `${baseClasses} bg-black/30`;
      case 'dark':
        return `${baseClasses} bg-black/40`;
      default:
        return `${baseClasses} bg-black/30`;
    }
  };

  return (
    <div 
      className={`${getOverlayClasses()} ${className}`}
      aria-hidden="true"
    />
  );
});

SliderOverlay.displayName = 'SliderOverlay';

export default SliderOverlay;