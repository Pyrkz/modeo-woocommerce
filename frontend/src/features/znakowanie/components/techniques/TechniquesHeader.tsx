'use client';

import { memo } from 'react';
import SectionBadge from '@/components/ui/SectionBadge';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface TechniquesHeaderProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const TechniquesHeader = memo(({
  badgeText,
  title,
  subtitle,
  className = ''
}: TechniquesHeaderProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  return (
    <div 
      ref={elementRef}
      className={`
        ${className}
        transition-all duration-1000 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
      `}
    >
      <div className={`
        mb-6 flex justify-center
        transition-all duration-700 delay-200
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}>
        <SectionBadge variant="primary">
          {badgeText}
        </SectionBadge>
      </div>
      
      <h2 
        id="techniques-section-title"
        className={`
          text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6
          bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
          bg-clip-text text-transparent
          transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p className={`
          text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed
          transition-all duration-700 delay-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {subtitle}
        </p>
      )}
    </div>
  );
});

TechniquesHeader.displayName = 'TechniquesHeader';

export default TechniquesHeader;