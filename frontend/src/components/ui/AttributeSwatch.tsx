'use client';

import Image from 'next/image';
import { ProductAttributeTerm } from '@/types/product';
import { inferColorFromName, isLightColor } from '@/utils/colorMapping';

interface AttributeSwatchProps {
  term: ProductAttributeTerm;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const AttributeSwatch = ({ term, isSelected, onClick, className = '' }: AttributeSwatchProps) => {
  const { swatch_type, swatch_value, name } = term;

  // Debug colors
  if (name.toLowerCase().includes('żółt') || name.toLowerCase().includes('zolt') || name.toLowerCase().includes('yellow')) {
    console.log('🟡 ATTRIBUTESWATCH DEBUG:', {
      name,
      swatch_type,
      swatch_value,
      fullTerm: term
    });
  }

  // Render based on swatch type
  const renderSwatch = () => {
    switch (swatch_type) {
      case 'image':
        if (swatch_value) {
          return (
            <button
              onClick={onClick}
              className={`
                relative w-12 h-12 rounded border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden
                ${isSelected 
                  ? 'border-primary shadow-lg scale-110' 
                  : 'border-gray-300 hover:border-gray-400'
                }
                ${className}
              `}
              title={name}
              aria-label={`Wybierz: ${name}`}
            >
              <Image 
                src={swatch_value} 
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs font-medium text-gray-700">${name}</span>`;
                  }
                }}
              />
              {/* Selection indicator overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              )}
            </button>
          );
        }
        break;

      case 'color':
        if (swatch_value) {
          const isLight = isLightColor(swatch_value);
          return (
            <button
              onClick={onClick}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${isSelected 
                  ? 'border-primary shadow-lg scale-110' 
                  : isLight 
                    ? 'border-gray-300 hover:border-gray-400' 
                    : 'border-gray-200 hover:border-gray-300'
                }
                ${className}
              `}
              style={{ backgroundColor: swatch_value }}
              title={name}
              aria-label={`Wybierz kolor: ${name}`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${isLight ? 'bg-gray-900' : 'bg-white shadow-sm'}`}></div>
                </div>
              )}
            </button>
          );
        }
        break;

      case 'label':
        if (swatch_value) {
          return (
            <button
              onClick={onClick}
              className={`
                px-3 py-2 text-sm border rounded-md transition-colors min-w-[3rem] text-center font-medium
                ${isSelected
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }
                ${className}
              `}
              title={name}
              aria-label={`Wybierz: ${name}`}
            >
              {swatch_value}
            </button>
          );
        }
        break;

      default:
        // Fallback for 'none' type or missing swatch data
        // Try to infer color from name for legacy color attributes
        const colorValue = inferColorFromName(name);
        if (colorValue && colorValue !== name.toLowerCase()) {
          const isLight = isLightColor(colorValue);
          const isGradient = colorValue.startsWith('linear-gradient');
          
          return (
            <button
              onClick={onClick}
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${isSelected 
                  ? 'border-primary shadow-lg scale-110' 
                  : isLight 
                    ? 'border-gray-300 hover:border-gray-400' 
                    : 'border-gray-200 hover:border-gray-300'
                }
                ${className}
              `}
              style={isGradient ? { background: colorValue } : { backgroundColor: colorValue }}
              title={name}
              aria-label={`Wybierz kolor: ${name}`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${isLight || isGradient ? 'bg-gray-900' : 'bg-white shadow-sm'}`}></div>
                </div>
              )}
            </button>
          );
        }
        
        // Default text button
        return (
          <button
            onClick={onClick}
            className={`
              px-3 py-2 text-sm border rounded-md transition-colors
              ${isSelected
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }
              ${className}
            `}
            title={name}
            aria-label={`Wybierz: ${name}`}
          >
            {name}
          </button>
        );
    }

    // Final fallback
    return (
      <button
        onClick={onClick}
        className={`
          px-3 py-2 text-sm border rounded-md transition-colors
          ${isSelected
            ? 'border-primary bg-primary text-white'
            : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
          }
          ${className}
        `}
        title={name}
        aria-label={`Wybierz: ${name}`}
      >
        {name}
      </button>
    );
  };

  return renderSwatch();
};

export default AttributeSwatch;