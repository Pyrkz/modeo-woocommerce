'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 10000,
  value,
  onChange,
  step = 1,
  formatValue = (val) => `${val.toFixed(0)} zł`,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange - only call when not dragging
  const debouncedOnChange = useCallback((newValue: [number, number]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Only trigger onChange if we're not actively dragging
      if (!isDragging) {
        onChange(newValue);
      }
    }, 500); // Increased delay to prevent API calls during drag
  }, [onChange, isDragging]);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPercentage = useCallback((percentage: number) => {
    const val = min + (percentage * (max - min)) / 100;
    return Math.round(val / step) * step;
  }, [min, max, step]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    setLocalValue(prevValue => {
      let newLocalValue: [number, number];
      
      if (isDragging === 'min') {
        newLocalValue = [Math.min(newValue, prevValue[1]), prevValue[1]];
      } else {
        newLocalValue = [prevValue[0], Math.max(newValue, prevValue[0])];
      }
      
      // Don't call debouncedOnChange during drag - only update on drag end
      return newLocalValue;
    });
  }, [isDragging, getValueFromPercentage]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      // Trigger immediate onChange when drag ends
      onChange(localValue);
    }
    setIsDragging(null);
  }, [isDragging, localValue, onChange]);

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch events
  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    setLocalValue(prevValue => {
      let newLocalValue: [number, number];
      
      if (isDragging === 'min') {
        newLocalValue = [Math.min(newValue, prevValue[1]), prevValue[1]];
      } else {
        newLocalValue = [prevValue[0], Math.max(newValue, prevValue[0])];
      }
      
      // Don't call debouncedOnChange during drag - only update on drag end
      return newLocalValue;
    });
  }, [isDragging, getValueFromPercentage]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      // Trigger immediate onChange when touch drag ends
      onChange(localValue);
    }
    setIsDragging(null);
  }, [isDragging, localValue, onChange]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const minPercentage = getPercentage(localValue[0]);
  const maxPercentage = getPercentage(localValue[1]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Value Display */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">
          {formatValue(localValue[0])}
        </div>
        <div className="text-sm text-gray-500">do</div>
        <div className="text-sm font-medium text-gray-700">
          {formatValue(localValue[1])}
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative">
        <div 
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Active Range */}
          <div
            className="absolute h-2 bg-primary rounded-full transition-all duration-150"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          
          {/* Min Thumb */}
          <div
            className={`
              absolute w-6 h-6 bg-white border-2 border-primary rounded-full cursor-grab
              transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md
              hover:shadow-lg hover:scale-110 active:cursor-grabbing
              transition-all duration-150
              ${isDragging === 'min' ? 'shadow-lg scale-110' : ''}
              touch-manipulation
            `}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={localValue[1]}
            aria-valuenow={localValue[0]}
            aria-label="Minimalna cena"
            tabIndex={0}
          />
          
          {/* Max Thumb */}
          <div
            className={`
              absolute w-6 h-6 bg-white border-2 border-primary rounded-full cursor-grab
              transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md
              hover:shadow-lg hover:scale-110 active:cursor-grabbing
              transition-all duration-150
              ${isDragging === 'max' ? 'shadow-lg scale-110' : ''}
              touch-manipulation
            `}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
            role="slider"
            aria-valuemin={localValue[0]}
            aria-valuemax={max}
            aria-valuenow={localValue[1]}
            aria-label="Maksymalna cena"
            tabIndex={0}
          />
        </div>
        
        {/* Min/Max Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>

      {/* Manual Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Od (zł)</label>
          <input
            type="number"
            min={min}
            max={localValue[1]}
            step={step}
            value={localValue[0]}
            onChange={(e) => {
              const newMin = Math.max(min, Math.min(Number(e.target.value) || min, localValue[1]));
              const newValue: [number, number] = [newMin, localValue[1]];
              setLocalValue(newValue);
              debouncedOnChange(newValue);
            }}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Do (zł)</label>
          <input
            type="number"
            min={localValue[0]}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={(e) => {
              const newMax = Math.max(localValue[0], Math.min(Number(e.target.value) || max, max));
              const newValue: [number, number] = [localValue[0], newMax];
              setLocalValue(newValue);
              debouncedOnChange(newValue);
            }}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
};