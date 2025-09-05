'use client';

import React, { useState } from 'react';

interface Color {
  name: string;
  value: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor?: string;
  onColorChange?: (color: Color) => void;
  className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorChange,
  className = ''
}) => {
  const [activeColor, setActiveColor] = useState(selectedColor || colors[0]?.value);

  const handleColorClick = (color: Color) => {
    setActiveColor(color.value);
    onColorChange?.(color);
  };

  return (
    <div className={className}>
      <p className="text-sm text-slate-600 mb-3">Popularne kolory sublimacji:</p>
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className={`
              w-6 h-6 sm:w-8 sm:h-8 rounded-full 
              border-2 transition-all duration-200 hover:scale-110
              ${activeColor === color.value 
                ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Wybierz kolor ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};