'use client';

import { memo } from 'react';

interface PromoCardContentProps {
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

const PromoCardContent = memo(({ 
  title, 
  description, 
  badge,
  className = '' 
}: PromoCardContentProps) => (
  <div className={`relative z-10 flex flex-col p-6 sm:p-8 pb-0 ${className}`}>
    {/* Optional Badge */}
    {badge && (
      <div className="mb-4">
        <span className="inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
          {badge}
        </span>
      </div>
    )}
    
    {/* Text Content */}
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg transition-all duration-300">
        {title}
      </h3>
      <p 
        className="text-white/95 text-sm sm:text-base leading-relaxed drop-shadow-md"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>
    </div>
  </div>
));

PromoCardContent.displayName = 'PromoCardContent';

export default PromoCardContent;