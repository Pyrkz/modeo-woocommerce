'use client';

import { memo } from 'react';

interface TechniqueOverlayProps {
  name: string;
  description?: string;
}

const TechniqueOverlay = memo(({ name, description }: TechniqueOverlayProps) => (
  <>
    {/* Gradient overlay for better text readability */}
    <div className={`
      absolute inset-0 
      bg-gradient-to-t from-black/70 via-black/20 to-transparent
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      pointer-events-none
    `} />
    
    {/* Content overlay */}
    <div className={`
      absolute inset-0 p-3 sm:p-4
      flex flex-col justify-between
      transform translate-y-2 group-hover:translate-y-0
      opacity-0 group-hover:opacity-100
      transition-all duration-300
      pointer-events-none
    `}>
      {/* Top - Hover indicator */}
      <div className="flex justify-end">
        <div className={`
          w-8 h-8 sm:w-10 sm:h-10
          bg-white/95 backdrop-blur-sm rounded-full 
          flex items-center justify-center shadow-lg
          scale-0 group-hover:scale-100
          transition-all duration-300 ease-out delay-100
        `}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-800 sm:w-5 sm:h-5"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom - Title and CTA */}
      <div className="text-center space-y-3">
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 drop-shadow-lg">
            {name}
          </h3>
          {description && (
            <p className="text-white/90 text-xs sm:text-sm drop-shadow-md line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {/* CTA Button */}
        <div className={`
          transform translate-y-4 group-hover:translate-y-0
          opacity-0 group-hover:opacity-100
          transition-all duration-300 delay-150
        `}>
          <span className={`
            inline-flex items-center gap-2 
            bg-white text-gray-900 
            px-4 py-2 rounded-lg
            text-xs sm:text-sm font-semibold
            shadow-lg hover:shadow-xl
            transform hover:scale-105
            transition-all duration-200
          `}>
            Dowiedz się więcej
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </>
));

TechniqueOverlay.displayName = 'TechniqueOverlay';

export default TechniqueOverlay;