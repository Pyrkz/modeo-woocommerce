'use client';

import { memo } from 'react';
import SectionBadge from '@/components/ui/SectionBadge';

interface SolutionsHeaderProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const SolutionsHeader = memo(({
  badgeText,
  title,
  subtitle,
  className = ''
}: SolutionsHeaderProps) => (
  <div className={`text-center mb-12 ${className}`}>
    <div className="mb-6 flex justify-center">
      <SectionBadge variant="primary">
        {badgeText}
      </SectionBadge>
    </div>
    
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {title}
      <br />
      <span className="text-red-600">dla Twojej firmy</span>
    </h2>
    
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
));

SolutionsHeader.displayName = 'SolutionsHeader';

export default SolutionsHeader;