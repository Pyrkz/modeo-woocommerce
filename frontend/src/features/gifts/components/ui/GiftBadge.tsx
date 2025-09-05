'use client';

import { memo } from 'react';

interface GiftBadgeProps {
  text: string;
  variant?: 'default' | 'accent' | 'premium';
}

const GiftBadge = memo(({ text, variant = 'default' }: GiftBadgeProps) => {
  const baseClasses = "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg";
  
  const variantClasses = {
    default: "bg-white/95 text-gray-900 backdrop-blur-sm hover:bg-white hover:shadow-xl border border-white/20",
    accent: "bg-primary/95 text-white backdrop-blur-sm hover:bg-primary hover:shadow-xl border border-primary/20",
    premium: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white backdrop-blur-sm hover:from-yellow-300 hover:to-orange-400 hover:shadow-xl border border-yellow-400/20"
  };

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]}`}
      role="status"
      aria-label={`Badge: ${text}`}
    >
      {text}
    </span>
  );
});

GiftBadge.displayName = 'GiftBadge';

export { GiftBadge };