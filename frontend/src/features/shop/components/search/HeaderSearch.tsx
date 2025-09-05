'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '../../hooks/useDebounce';
import { ShopApi } from '../../api/shop.api';
import { Product } from '../../types';
import Image from 'next/image';
// import Link from 'next/link'; // Not used directly in this component
import { formatPrice } from '@/utils/format';

interface HeaderSearchProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  showSuggestions?: boolean;
  maxSuggestions?: number;
}

export function HeaderSearch({
  placeholder = 'Szukaj produktów...',
  className = '',
  autoFocus = false,
  showSuggestions = true,
  maxSuggestions = 5
}: HeaderSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const debouncedQuery = useDebounce(query, 200);
  
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await ShopApi.fetchProducts(
        { search: searchQuery },
        1,
        maxSuggestions
      );
      setSuggestions(response.products);
      setIsOpen(response.products.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [maxSuggestions]);
  
  // Fetch suggestions when query changes
  useEffect(() => {
    if (showSuggestions && debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedQuery, showSuggestions, fetchSuggestions]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/sklep?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, [query, router]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);
  
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [suggestions]);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Delay closing to allow for click events on suggestions
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, []);
  
  const handleSuggestionClick = useCallback((product: Product) => {
    router.push(`/produkt/${product.slug}`);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  }, [router]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('');
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, []);
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
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
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`
              block w-full rounded-lg border bg-white py-2.5 pl-10 pr-4
              text-gray-900 placeholder-gray-500
              transition-all duration-200
              ${isFocused 
                ? 'border-primary ring-2 ring-primary ring-opacity-20 shadow-md' 
                : 'border-gray-300 hover:border-gray-400'
              }
              focus:outline-none
            `}
            aria-label="Wyszukaj produkty"
          />
        </div>
        
        <button type="submit" className="sr-only">
          Szukaj
        </button>
      </form>
      
      {/* Search suggestions dropdown */}
      {showSuggestions && isOpen && (
        <div className="absolute z-50 mt-2 w-full min-w-[300px] rounded-lg bg-white shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="inline-flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-gray-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm text-gray-500">Szukam...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-100">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* Product image */}
                      <div className="flex-shrink-0 w-10 h-10 relative bg-gray-100 rounded">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.name}
                            fill
                            className="object-cover rounded"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(product.prices.price)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Show all results link */}
              <div className="border-t border-gray-100 p-3">
                <button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Zobacz wszystkie wyniki dla &ldquo;{query}&rdquo;
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Brak wyników dla &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}