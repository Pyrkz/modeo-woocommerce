'use client';

import { memo } from 'react';
import { inferColorFromName, isLightColor } from '@/utils/colorMapping';
import type { ProductAttribute } from '@/types/product';

interface ColorVariantsProps {
  attributes?: ProductAttribute[];
  selectedColor?: string;
  onColorSelect?: (colorId: number, colorName: string) => void;
  loading?: boolean;
  className?: string;
}

const ColorDot = memo<{
  colorValue: string; // Rzeczywisty kolor RGB
  name: string;
  id: number;
  isSelected: boolean;
  onClick: (id: number, name: string) => void;
}>(({ colorValue, name, id, isSelected, onClick }) => {
  const isLight = isLightColor(colorValue);
  const isGradient = colorValue.startsWith('linear-gradient');
  
  return (
    <button
      onClick={() => onClick(id, name)}
      className={`
        w-6 h-6 rounded-full border transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1
        ${isSelected 
          ? 'border-gray-800 shadow-sm scale-110' 
          : isLight 
            ? 'border-gray-300 hover:border-gray-400' 
            : 'border-gray-200 hover:border-gray-300'
        }
      `}
      style={isGradient ? { background: colorValue } : { backgroundColor: colorValue }}
      title={name}
      aria-label={`Wybierz kolor: ${name}`}
    >
      {/* Ikona zaznaczenia dla jasnych kolorów */}
      {isSelected && isLight && (
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
        </div>
      )}
      {/* Ikona zaznaczenia dla ciemnych kolorów i gradientów */}
      {isSelected && !isLight && (
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
        </div>
      )}
    </button>
  );
});
ColorDot.displayName = 'ColorDot';

const LoadingColorDots = memo(() => (
  <div className="flex items-center justify-center gap-2 mb-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"
      />
    ))}
  </div>
));
LoadingColorDots.displayName = 'LoadingColorDots';

export const ColorVariants = memo<ColorVariantsProps>(({ 
  attributes = [], 
  selectedColor, 
  onColorSelect,
  loading = false,
  className = '' 
}) => {
  // Znajdź atrybut koloru - tylko dla produktów wariantowych
  const colorAttribute = attributes.find(attr => 
    (attr.name.toLowerCase().includes('kolor') || 
     attr.name.toLowerCase().includes('color') ||
     attr.taxonomy === 'pa_color' ||
     attr.taxonomy === 'pa_kolor') &&
    attr.has_variations === true // Ważne: tylko wariantowe
  );

  // Nie wyświetlaj jeśli brak atrybutu kolorów, brak terms, lub nie jest wariantowy
  if (!colorAttribute || 
      !colorAttribute.terms || 
      colorAttribute.terms.length === 0 || 
      !colorAttribute.has_variations) {
    return null;
  }

  // Ogranicz do maksymalnie 10 kolorów
  const colors = colorAttribute.terms.slice(0, 10);

  const handleColorSelect = (colorId: number, colorName: string) => {
    if (onColorSelect) {
      onColorSelect(colorId, colorName);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`${className}`}>
        <LoadingColorDots />
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Color dots in single centered row */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {colors.map((colorTerm) => {
          // Użyj koloru z WordPress lub fallback na mapowanie nazwy
          const colorValue = colorTerm.color || inferColorFromName(colorTerm.name);
          
          return (
            <ColorDot
              key={colorTerm.id}
              id={colorTerm.id}
              colorValue={colorValue}
              name={colorTerm.name}
              isSelected={selectedColor === colorTerm.name}
              onClick={handleColorSelect}
            />
          );
        })}
      </div>
    </div>
  );
});

ColorVariants.displayName = 'ColorVariants';