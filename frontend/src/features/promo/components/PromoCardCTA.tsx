'use client';

import { memo } from 'react';
import Link from 'next/link';

interface PromoCardCTAProps {
  ctaText: string;
  ctaHref: string;
  className?: string;
}

const PromoCardCTA = memo(({ 
  ctaText, 
  ctaHref, 
  className = '' 
}: PromoCardCTAProps) => {
  // Special handling for children's category
  const isComingSoon = ctaText === 'Wróć';
  const displayText = isComingSoon ? 'Wkrótce' : ctaText;
  
  if (isComingSoon) {
    return (
      <div className={`relative z-20 p-6 sm:p-8 ${className}`}>
        <div
          className="
            inline-flex items-center 
            bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-sm
            shadow-lg cursor-not-allowed
            backdrop-blur-sm opacity-75
          "
          aria-label="Wkrótce - kategoria w przygotowaniu"
        >
          {displayText}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-2"
          >
            <path
              d="M8 4V8L10 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative z-20 p-6 sm:p-8 ${className}`}>
      <Link
        href={ctaHref}
        className="
          inline-flex items-center 
          bg-primary hover:bg-primary-hover focus:bg-primary-hover 
          text-white px-6 py-3 rounded-xl font-semibold text-sm
          transition-all duration-300 ease-out
          shadow-lg hover:shadow-xl
          group-hover:scale-105 group-hover:translate-x-1
          focus:ring-4 focus:ring-primary/30 focus:outline-none
          backdrop-blur-sm
        "
        aria-label={`${ctaText} - zobacz więcej`}
      >
        {ctaText}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
});

PromoCardCTA.displayName = 'PromoCardCTA';

export default PromoCardCTA;