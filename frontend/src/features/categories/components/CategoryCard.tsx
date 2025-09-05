'use client';

import { memo } from 'react';
import Link from 'next/link';
import CategoryCardIcon from './CategoryCardIcon';
import CategoryCardContent from './CategoryCardContent';
import { CategoryCard as CategoryCardType } from '../types';

interface CategoryCardProps {
  category: CategoryCardType;
  className?: string;
  showArrow?: boolean;
}

const CategoryCard = memo(({ 
  category, 
  className = '',
  showArrow = true 
}: CategoryCardProps) => {
  return (
    <Link
      href={category.href}
      className={`
        group block h-full
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-xl
        transition-all duration-300 ease-out
        ${className}
      `}
      aria-label={`Zobacz produkty: ${category.title}`}
    >
      <div className="
        flex flex-col items-center p-6 text-center h-full min-h-[280px]
        border border-gray-200 rounded-xl bg-white
        transition-all duration-300 ease-out
        group-hover:border-primary/30 group-hover:shadow-xl group-hover:-translate-y-2
        group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-primary/5
      ">
        {/* Icon Section */}
        <div className="flex-shrink-0 mb-4 transition-transform duration-300 ease-out group-hover:scale-110">
          <CategoryCardIcon
            iconPath={category.iconPath}
            title={category.title}
          />
        </div>
        
        {/* Content Section - takes available space */}
        <div className="flex-grow flex flex-col justify-center">
          <CategoryCardContent
            title={category.title}
            description={category.description}
          />
        </div>
        
        {/* Arrow at bottom */}
        {showArrow && (
          <div className="flex-shrink-0 mt-4 pt-2">
            <div className="transition-all duration-300 ease-out group-hover:translate-x-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-gray-400 group-hover:text-primary transition-colors duration-300"
              >
                <path
                  d="M7 10L10 13L13 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="rotate(270 10 10)"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;