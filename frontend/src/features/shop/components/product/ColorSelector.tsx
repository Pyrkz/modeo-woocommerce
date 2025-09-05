'use client';

import { memo } from 'react';
import { AttributeSelectorProps } from './AttributeSelector';
import { inferColorFromName, isLightColor } from '@/utils/colorMapping';

/**
 * Specialized color selector with circular swatches
 */
const ColorSelectorComponent = ({ 
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
          
          // Try to get color from swatch_value or infer from name
          const colorValue = term.swatch_value || inferColorFromName(term.name);
          const isValidColor = colorValue && colorValue !== term.name.toLowerCase();
          
          if (isValidColor) {
            const isLight = isLightColor(colorValue);
            const isGradient = colorValue.startsWith('linear-gradient');
            
            return (
              <div key={term.id} className="relative">
                <button
                  onClick={() => isAvailable && onValueChange(term.name)}
                  disabled={!isAvailable}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all duration-200 relative overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${isSelected && isAvailable
                      ? 'border-primary shadow-lg scale-110' 
                      : isAvailable
                        ? isLight 
                          ? 'border-gray-300 hover:border-gray-400 hover:scale-110' 
                          : 'border-gray-200 hover:border-gray-300 hover:scale-110'
                        : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }
                  `}
                  style={isGradient ? { background: colorValue } : { backgroundColor: colorValue }}
                  aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'} kolor: ${term.name}`}
                >
                  {/* Selection indicator */}
                  {isSelected && isAvailable && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${isLight || isGradient ? 'bg-gray-900' : 'bg-white shadow-sm'}`}></div>
                    </div>
                  )}
                  
                  {/* Unavailable overlay */}
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-gray-100 bg-opacity-75 rounded-full flex items-center justify-center">
                      <div className="w-full h-0.5 bg-red-400 rotate-45 transform" />
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
          }
          
          // Fallback to text button for colors without valid color values
          return (
            <div key={term.id} className="relative">
              <button
                onClick={() => isAvailable && onValueChange(term.name)}
                disabled={!isAvailable}
                className={`
                  px-3 py-2 text-sm border rounded-md transition-colors min-w-[3rem] text-center font-medium relative
                  ${isSelected && isAvailable
                    ? 'border-primary bg-primary text-white'
                    : isAvailable
                      ? 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
                aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'} kolor: ${term.name}`}
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
export const ColorSelector = memo(ColorSelectorComponent);