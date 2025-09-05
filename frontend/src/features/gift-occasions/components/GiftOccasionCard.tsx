'use client';

import { memo } from 'react';
import Link from 'next/link';
import GiftOccasionIcon from './GiftOccasionIcon';
import GiftOccasionContent from './GiftOccasionContent';
import { GiftOccasionCardProps } from '../types';

const GiftOccasionCard = memo(({ 
  occasion, 
  className = '',
  onClick,
  isClickable = true,
  showArrow = true 
}: GiftOccasionCardProps) => {
  const cardContent = (
    <div className={`
      flex flex-col items-center p-6 text-center min-h-[200px]
      border border-gray-200 rounded-lg
      transition-all duration-200
      ${isClickable ? 'hover:shadow-sm hover:-translate-y-1' : ''}
      ${className}
    `}>
      <GiftOccasionIcon
        iconPath={occasion.iconPath}
        title={occasion.title}
      />
      
      <GiftOccasionContent
        title={occasion.title}
        description={occasion.description}
      />
      
      {/* Arrow at bottom - optional */}
      {showArrow && (
        <div className="mt-auto pt-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-400"
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
      )}
    </div>
  );

  // If not clickable, just return the card content
  if (!isClickable) {
    return cardContent;
  }

  // If there's a custom onClick handler, use the div with onClick
  if (onClick) {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className={`
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg
          transition-all duration-200 cursor-pointer
        `}
        aria-label={`Wybierz okazję: ${occasion.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {cardContent}
      </div>
    );
  }

  // Default behavior: use Next.js Link for navigation
  return (
    <Link 
      href={occasion.href}
      className={`
        block focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg
        transition-all duration-200
      `}
      aria-label={`Przejdź do: ${occasion.title}`}
    >
      {cardContent}
    </Link>
  );
});

GiftOccasionCard.displayName = 'GiftOccasionCard';

export default GiftOccasionCard;