'use client';

import { memo } from 'react';

interface CategoryCardContentProps {
  title: string;
  description: string;
  className?: string;
}

const CategoryCardContent = memo(({ 
  title, 
  description, 
  className = '' 
}: CategoryCardContentProps) => (
  <div className={`text-center ${className}`}>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
      {title}
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
      {description}
    </p>
  </div>
));

CategoryCardContent.displayName = 'CategoryCardContent';

export default CategoryCardContent;