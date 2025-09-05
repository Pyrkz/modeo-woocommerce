'use client';

import { memo } from 'react';
import { AttributeSelectorProps } from './AttributeSelector';

/**
 * Intelligent size comparison function that handles different size formats
 */
function compareSizes(sizeA: string, sizeB: string): number {
  // Define standard clothing size order (from smallest to largest)
  const clothingSizeOrder: Record<string, number> = {
    'XXXS': 1, '3XS': 1,
    'XXS': 2, '2XS': 2,
    'XS': 3,
    'S': 4,
    'M': 5,
    'L': 6,
    'XL': 7,
    'XXL': 8, '2XL': 8,
    'XXXL': 9, '3XL': 9,
    'XXXXL': 10, '4XL': 10,
    'XXXXXL': 11, '5XL': 11,
  };

  // Clean sizes (uppercase and trim)
  const cleanA = sizeA.toUpperCase().trim();
  const cleanB = sizeB.toUpperCase().trim();

  // Check if both are standard clothing sizes
  if (clothingSizeOrder[cleanA] && clothingSizeOrder[cleanB]) {
    return clothingSizeOrder[cleanA] - clothingSizeOrder[cleanB];
  }

  // Try to extract numeric values for numeric sizes (e.g., "36", "38", "40")
  const numericA = extractNumericValue(sizeA);
  const numericB = extractNumericValue(sizeB);

  if (numericA !== null && numericB !== null) {
    return numericA - numericB;
  }

  // Handle mixed numeric and unit sizes (e.g., "500ml", "1l", "2kg")
  const { value: valueA, unit: unitA } = extractValueWithUnit(sizeA);
  const { value: valueB, unit: unitB } = extractValueWithUnit(sizeB);

  if (valueA !== null && valueB !== null) {
    // Convert to same unit if possible for comparison
    const normalizedA = normalizeToBaseUnit(valueA, unitA);
    const normalizedB = normalizeToBaseUnit(valueB, unitB);
    
    if (normalizedA !== null && normalizedB !== null) {
      return normalizedA - normalizedB;
    }
  }

  // Handle shoe sizes (European, US, UK formats)
  const shoeA = extractShoeSize(sizeA);
  const shoeB = extractShoeSize(sizeB);

  if (shoeA !== null && shoeB !== null) {
    return shoeA - shoeB;
  }

  // Handle age-based sizes (e.g., "3-6M", "6-12M", "12-18M")
  const ageA = extractAgeValue(sizeA);
  const ageB = extractAgeValue(sizeB);

  if (ageA !== null && ageB !== null) {
    return ageA - ageB;
  }

  // Fallback to alphabetical sorting
  return cleanA.localeCompare(cleanB, 'pl', { numeric: true, sensitivity: 'base' });
}

/**
 * Extract pure numeric value from size string
 */
function extractNumericValue(size: string): number | null {
  const match = size.match(/^(\d+(?:\.\d+)?)$/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Extract value with unit (e.g., "500ml" -> {value: 500, unit: "ml"})
 */
function extractValueWithUnit(size: string): { value: number | null; unit: string } {
  const match = size.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
  if (match) {
    return { value: parseFloat(match[1]), unit: match[2].toLowerCase() };
  }
  return { value: null, unit: '' };
}

/**
 * Normalize different units to base units for comparison
 */
function normalizeToBaseUnit(value: number, unit: string): number | null {
  const unitMap: Record<string, number> = {
    // Volume - normalize to ml
    'ml': 1,
    'l': 1000,
    'litr': 1000,
    'liter': 1000,
    
    // Weight - normalize to grams
    'g': 1,
    'kg': 1000,
    'gram': 1,
    'kilogram': 1000,
    
    // Length - normalize to mm
    'mm': 1,
    'cm': 10,
    'm': 1000,
    'milimetr': 1,
    'centymetr': 10,
    'metr': 1000,
  };

  const multiplier = unitMap[unit];
  return multiplier ? value * multiplier : null;
}

/**
 * Extract shoe size (handles European, US formats)
 */
function extractShoeSize(size: string): number | null {
  // Handle formats like "42", "42.5", "US 10", "EU 42"
  const match = size.match(/(?:EU|US)?\s*(\d+(?:\.\d+)?)/i);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Extract age value for baby/children sizes (e.g., "3-6M" -> 4.5)
 */
function extractAgeValue(size: string): number | null {
  // Handle patterns like "3-6M", "12-18M", "2-3Y"
  const match = size.match(/(\d+)-(\d+)[MY]/i);
  if (match) {
    const start = parseFloat(match[1]);
    const end = parseFloat(match[2]);
    return (start + end) / 2; // Use average for comparison
  }
  
  // Handle single age patterns like "6M", "2Y"
  const singleMatch = size.match(/(\d+)[MY]/i);
  if (singleMatch) {
    return parseFloat(singleMatch[1]);
  }
  
  return null;
}

/**
 * Specialized size/volume selector with text labels optimized for sizes, volumes, etc.
 */
const SizeSelectorComponent = ({ 
  attribute, 
  selectedValue, 
  onValueChange, 
  availability,
  className = '' 
}: AttributeSelectorProps) => {
  // Sort terms by size with intelligent size ordering
  const sortedTerms = [...(attribute.terms || [])].sort((a, b) => {
    return compareSizes(a.name, b.name);
  });


  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {attribute.name}:
      </label>
      <div className="flex flex-wrap gap-2 items-center">
        {sortedTerms.map((term) => {
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
                  px-4 py-2 text-sm border rounded-lg transition-all duration-200 min-w-[4rem] text-center font-medium relative
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${isSelected && isAvailable
                    ? 'border-primary bg-primary text-white shadow-md'
                    : isAvailable
                      ? 'border-gray-300 text-gray-700 hover:border-primary hover:bg-primary hover:text-white hover:scale-105'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  }
                  ${!isAvailable ? 'relative overflow-hidden' : ''}
                `}
                aria-label={`${isAvailable ? 'Wybierz' : 'Niedostępny'} ${attribute.name.toLowerCase()}: ${term.name}`}
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
export const SizeSelector = memo(SizeSelectorComponent);