'use client';

import { memo } from 'react';
import { AttributeSelectorProps } from './AttributeSelector';

/**
 * General text selector for non-color, non-size attributes
 */
const TextSelectorComponent = ({ 
  attribute, 
  selectedValue, 
  onValueChange, 
  availability,
  className = '' 
}: AttributeSelectorProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {attribute.name}:
      </label>
      <div className="flex flex-wrap gap-2 items-center">
        {attribute.terms?.map((term) => {
          const isSelected = selectedValue === term.name;
          // Show all terms, mark as unavailable only if explicitly set to false
          const availabilityValue = availability?.get(term.name);
          const isAvailable = availabilityValue !== false; // Available if true or undefined (no data)
          
          return (
            <div key={term.id} className="relative">
              <button
                onClick={() => isAvailable && onValueChange(term.name)}
                disabled={!isAvailable}
                className={`
                  px-3 py-2 text-sm border rounded-md transition-colors font-medium relative
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isSelected && isAvailable
                    ? 'border-primary bg-primary text-white'
                    : isAvailable
                      ? 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:scale-105'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
                aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'}: ${term.name}`}
              >
                {term.name}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-100 opacity-75" />
                    <div className="absolute w-full h-0.5 bg-red-400 rotate-45 transform" />
                    <div className="absolute w-full h-0.5 bg-red-400 -rotate-45 transform" />
                  </div>
                )}
              </button>
              {!isAvailable && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
export const TextSelector = memo(TextSelectorComponent);