'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { NaPrezentCategory } from '../../types';
import { preloadCategoryOnHover } from '../../utils/performance';

interface NaPrezentCategoryCardProps {
  category: NaPrezentCategory;
  className?: string;
}

export const NaPrezentCategoryCard = React.memo(({ 
  category, 
  className = '' 
}: NaPrezentCategoryCardProps) => {
  const handleMouseEnter = useCallback(() => {
    preloadCategoryOnHover(category.href);
  }, [category.href]);

  return (
    <Link 
      href={category.href}
      onMouseEnter={handleMouseEnter}
      className={`group block bg-gradient-to-br ${category.gradient} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${className}`}
    >
    <div className="flex flex-col items-center text-center h-full">
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
        {category.iconPath}
      </div>
      
      {/* Title */}
      <h3 className={`text-xl font-bold mb-2 ${category.color} group-hover:text-opacity-80 transition-colors`}>
        {category.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 leading-relaxed flex-1">
        {category.description}
      </p>
      
      {/* Hover Arrow */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`inline-flex items-center text-sm font-medium ${category.color}`}>
          Zobacz prezenty
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
    </Link>
  );
});

NaPrezentCategoryCard.displayName = 'NaPrezentCategoryCard';