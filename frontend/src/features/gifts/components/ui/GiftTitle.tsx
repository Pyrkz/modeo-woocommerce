'use client';

import { memo } from 'react';

interface GiftTitleProps {
  title: string;
  size: 'small' | 'medium' | 'large' | 'wide';
  id?: string;
}

const GiftTitle = memo(({ title, size, id }: GiftTitleProps) => {
  const titleConfig = {
    small: {
      textSize: 'text-sm sm:text-base',
      fontWeight: 'font-semibold',
      letterSpacing: 'tracking-normal'
    },
    medium: {
      textSize: 'text-base sm:text-lg',
      fontWeight: 'font-semibold',
      letterSpacing: 'tracking-normal'
    },
    large: {
      textSize: 'text-lg sm:text-xl lg:text-2xl',
      fontWeight: 'font-bold',
      letterSpacing: 'tracking-tight'
    },
    wide: {
      textSize: 'text-base sm:text-lg',
      fontWeight: 'font-semibold',
      letterSpacing: 'tracking-normal'
    }
  };

  const config = titleConfig[size];

  return (
    <h3 
      id={id}
      className={`
        text-white 
        ${config.textSize} 
        ${config.fontWeight} 
        ${config.letterSpacing}
        leading-tight 
        drop-shadow-lg
        text-shadow-lg
        group-hover:text-white/95
        transition-all duration-300
      `}
      style={{
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.6)'
      }}
    >
      {title}
    </h3>
  );
});

GiftTitle.displayName = 'GiftTitle';

export { GiftTitle };