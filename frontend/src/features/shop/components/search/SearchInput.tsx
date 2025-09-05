'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/features/shop/hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minSearchLength?: number;
  debounceMs?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  showClearButton?: boolean;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Szukaj produktów...',
  className = '',
  minSearchLength = 2,
  debounceMs = 300,
  onFocus,
  onBlur,
  showClearButton = true,
  autoFocus = false
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce the search value
  const debouncedValue = useDebounce(localValue, debounceMs);
  
  // Update parent component when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value && (debouncedValue.length === 0 || debouncedValue.length >= minSearchLength)) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange, minSearchLength]);
  
  // Sync with parent value changes
  useEffect(() => {
    if (value !== localValue && !isFocused) {
      setLocalValue(value);
    }
  }, [value, localValue, isFocused]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);
  
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  }, [handleClear]);
  
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon 
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused ? 'text-primary' : 'text-gray-400'
            }`} 
            aria-hidden="true" 
          />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            block w-full rounded-lg border bg-white py-2.5 pl-10 pr-10
            text-gray-900 placeholder-gray-500
            transition-all duration-200
            ${isFocused 
              ? 'border-primary ring-2 ring-primary ring-opacity-20' 
              : 'border-gray-300 hover:border-gray-400'
            }
            focus:outline-none
          `}
          aria-label="Wyszukaj produkty"
        />
        
        {showClearButton && localValue.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Wyczyść wyszukiwanie"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
      
      {/* Search hint */}
      {localValue.length > 0 && localValue.length < minSearchLength && (
        <p className="mt-1 text-xs text-gray-500">
          Wpisz przynajmniej {minSearchLength} znaki aby wyszukać
        </p>
      )}
    </div>
  );
}