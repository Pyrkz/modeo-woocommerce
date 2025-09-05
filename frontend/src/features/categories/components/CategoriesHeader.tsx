'use client';

import { memo } from 'react';

interface CategoriesHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const CategoriesHeader = memo(({
  title,
  subtitle,
  className = ''
}: CategoriesHeaderProps) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      <span className="text-red-600">Nasze Specjalności</span>
      <br />
      {title}
    </h2>
    
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
));

CategoriesHeader.displayName = 'CategoriesHeader';

export default CategoriesHeader;