'use client';

import { memo } from 'react';
import Image from 'next/image';
import { AttributeSelectorProps } from './AttributeSelector';

/**
 * Specialized image selector for patterns, textures, materials with visual representations
 * Perfect for fabric patterns, surface textures, material types, etc.
 */
const ImageSelectorComponent = ({ 
  attribute, 
  selectedValue, 
  onValueChange, 
  availability,
  className = '' 
}: AttributeSelectorProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {attribute.name}:
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {attribute.terms?.map((term) => {
          const isSelected = selectedValue === term.name;
          // Show all terms, mark as unavailable only if explicitly set to false
          const availabilityValue = availability?.get(term.name);
          const isAvailable = availabilityValue !== false; // Available if true or undefined (no data)
          
          // Priority: term.image > swatch_value (if image type) > fallback
          const imageUrl = term.image?.url || 
                          (term.swatch_type === 'image' ? term.swatch_value : null);
          const thumbnailUrl = term.image?.thumbnail || imageUrl;
          
          if (imageUrl) {
            return (
              <div key={term.id} className="relative">
                <button
                  onClick={() => isAvailable && onValueChange(term.name)}
                  disabled={!isAvailable}
                  className={`
                    group relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 w-full
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${isSelected && isAvailable
                      ? 'border-primary shadow-lg scale-105 ring-2 ring-primary ring-opacity-50' 
                      : isAvailable
                        ? 'border-gray-300 hover:border-primary hover:shadow-md hover:scale-105'
                        : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }
                  `}
                  aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'} ${attribute.name.toLowerCase()}: ${term.name}`}
                >
                  <Image 
                    src={thumbnailUrl || imageUrl} 
                    alt={term.image?.alt || `${attribute.name}: ${term.name}`}
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover transition-transform ${isAvailable ? 'group-hover:scale-110' : 'grayscale'}`}
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gray-100 text-xs font-medium text-gray-700 text-center p-1 ${!isAvailable ? 'opacity-50' : ''}">
                            ${term.name}
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Unavailable overlay */}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-red-400 rotate-45 transform" />
                      <div className="absolute w-full h-0.5 bg-red-400 -rotate-45 transform" />
                    </div>
                  )}
                </button>
                {!isAvailable && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    ×
                  </div>
                )}
              </div>
            );
          }
          
          // Fallback to text button if no image available
          return (
            <div key={term.id} className="relative">
              <button
                onClick={() => isAvailable && onValueChange(term.name)}
                disabled={!isAvailable}
                className={`
                  aspect-square rounded-lg border-2 transition-all duration-200 text-xs font-medium w-full
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  flex items-center justify-center text-center p-2 relative
                  ${isSelected && isAvailable
                    ? 'border-primary bg-primary text-white shadow-md'
                    : isAvailable
                      ? 'border-gray-300 text-gray-700 hover:border-primary hover:bg-gray-50 hover:scale-105'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
                aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'} ${attribute.name.toLowerCase()}: ${term.name}`}
              >
                {term.name}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-100 opacity-75 rounded-lg" />
                    <div className="absolute w-full h-0.5 bg-red-400 rotate-45 transform" />
                    <div className="absolute w-full h-0.5 bg-red-400 -rotate-45 transform" />
                  </div>
                )}
              </button>
              {!isAvailable && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  ×
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Memoized component for better performance
export const ImageSelector = memo(ImageSelectorComponent);