'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { inferColorFromName } from '@/utils/colorMapping';
import { config } from '@/lib/config';

interface ColorTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
  color?: string; // RGB value from WordPress
  swatch_type?: string; // Type of swatch from WordPress  
  swatch_value?: string; // RGB hex from WordPress swatch system
}

interface ColorFilterProps {
  selectedColors: number[];
  onChange: (selectedColors: number[]) => void;
  loading?: boolean;
}


const ColorFilterComponent: React.FC<ColorFilterProps> = ({
  selectedColors,
  onChange,
  loading = false
}) => {
  const [colors, setColors] = useState<ColorTerm[]>([]);
  const [loadingColors, setLoadingColors] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchColors = useCallback(async () => {
    try {
      setLoadingColors(true);
      setError(null);
      
      // Pobierz dane kolorów z custom endpointa który zawiera RGB values
      const response = await fetch(
        `${config.getApiUrl()}/wp-json/modeo/v1/color-swatches`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const colorTerms = await response.json();
      
      console.log('🎨 CUSTOM ENDPOINT DATA:', colorTerms.slice(0, 3)); // Debug first 3 terms
      
      // Dane już zawierają swatch_value z WordPress - użyj ich bezpośrednio
      const finalColors: ColorTerm[] = colorTerms.map((term: ColorTerm) => {
        // Użyj swatch_value z WordPress lub fallback na mapowanie nazw
        const finalColor = (term.swatch_value && term.swatch_type === 'color' && term.swatch_value !== '') 
          ? term.swatch_value 
          : inferColorFromName(term.name);
        
        // Debug - sprawdź żółty kolor
        const isYellow = term.name.toLowerCase().includes('żółt') || 
                        term.name.toLowerCase().includes('zolt') ||
                        term.name.toLowerCase().includes('yellow');
                        
        if (isYellow) {
          console.log('🟡 WORDPRESS SWATCH DEBUG:', {
            name: term.name,
            slug: term.slug,
            id: term.id,
            swatch_type: term.swatch_type,
            swatch_value: term.swatch_value,
            finalColor: finalColor,
            hasValidSwatch: !!(term.swatch_value && term.swatch_type === 'color' && term.swatch_value !== '')
          });
        }
        
        return {
          ...term,
          color: finalColor
        };
      });
      
      // Sort colors by count (descending) and then by name
      const sortedColors = finalColors.sort((a: ColorTerm, b: ColorTerm) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name, 'pl');
      });
      
      setColors(sortedColors);
    } catch {
      setError('Nie udało się załadować kolorów');
    } finally {
      setLoadingColors(false);
    }
  }, []);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]); // fetchColors is stable due to useCallback

  const handleColorToggle = useCallback((colorId: number) => {
    if (loading) {
      return;
    }
    
    const newColors = selectedColors.includes(colorId) 
      ? selectedColors.filter(id => id !== colorId)
      : [...selectedColors, colorId];
    
    onChange(newColors);
  }, [loading, selectedColors, onChange]);

  const getColorStyle = useCallback((colorTerm: ColorTerm): React.CSSProperties => {
    // Użyj color property które już jest przetworzone
    const color = colorTerm.color || '#E5E7EB'; // Fallback to gray if no color
    
    if (color.startsWith('linear-gradient')) {
      return { 
        background: color,
        border: '1px solid #D1D5DB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      };
    }
    
    const isLightColor = color === '#FFFFFF' || color === '#F8FAFC' || color === '#FEF3C7' || color === '#FEF7ED';
    
    return {
      backgroundColor: color,
      border: isLightColor ? '1px solid #D1D5DB' : '1px solid transparent',
      boxShadow: isLightColor ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
    };
  }, []);

  if (loadingColors) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchColors}
          className="text-sm text-primary hover:text-primary-hover"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Selected colors counter and names */}
      {selectedColors.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Wybrano: {selectedColors.length} {selectedColors.length === 1 ? 'kolor' : 'kolorów'}
          </p>
          <div className="flex flex-wrap gap-1">
            {colors
              .filter(color => selectedColors.includes(color.id))
              .map(color => (
                <span
                  key={color.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                >
                  {color.name}
                  <button
                    onClick={() => handleColorToggle(color.id)}
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/20 transition-colors"
                    aria-label={`Usuń filtr ${color.name}`}
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Color grid */}
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color.id);
          return (
            <button
              key={color.id}
              onClick={() => handleColorToggle(color.id)}
              disabled={loading}
              className={`
                relative w-8 h-8 rounded-full transition-all duration-200
                ${isSelected 
                  ? 'ring-2 ring-primary ring-offset-2 scale-110' 
                  : 'hover:scale-105 hover:ring-1 hover:ring-gray-400 hover:ring-offset-1'
                }
                ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={getColorStyle(color)}
              title={`${color.name} (${color.count} ${color.count === 1 ? 'produkt' : 'produktów'})`}
              aria-label={`Filtruj po kolorze: ${color.name}`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Color list for accessibility */}
      <div className="sr-only">
        <p>Dostępne kolory:</p>
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              {color.name} - {color.count} {color.count === 1 ? 'produkt' : 'produktów'}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset colors */}
      {selectedColors.length > 0 && (
        <button
          onClick={() => onChange([])}
          disabled={loading}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          Wyczyść wybrane kolory
        </button>
      )}
    </div>
  );
};

// Memoized export to prevent unnecessary re-renders
export const ColorFilter = memo(ColorFilterComponent);