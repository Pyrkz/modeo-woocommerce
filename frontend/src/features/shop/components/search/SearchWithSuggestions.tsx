'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { SearchInput } from './SearchInput';
import { useDebounce } from '@/features/shop/hooks/useDebounce';
import { Product } from '@/features/shop/types';
import { ShopApi } from '@/features/shop/api/shop.api';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/format';

interface SearchWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onProductClick?: (product: Product) => void;
  maxSuggestions?: number;
  className?: string;
}

export function SearchWithSuggestions({
  value, // Use value prop for initial state
  onChange,
  onProductClick,
  maxSuggestions = 5,
  className = ''
}: SearchWithSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  
  const fetchSuggestions = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const response = await ShopApi.fetchProducts(
        { search: query },
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

  // Fetch suggestions when search query changes
  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      fetchSuggestions(debouncedSearchQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery, fetchSuggestions]);
  
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
  
  const handleSearchChange = useCallback((newValue: string) => {
    setSearchQuery(newValue);
    onChange(newValue);
  }, [onChange]);
  
  const handleProductClick = useCallback((product: Product) => {
    onProductClick?.(product);
    setIsOpen(false);
    setSearchQuery('');
    onChange('');
  }, [onProductClick, onChange]);
  
  const handleFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  }, [suggestions]);
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleFocus}
        placeholder="Szukaj produktów po nazwie, SKU..."
        debounceMs={200}
        minSearchLength={2}
      />
      
      {/* Suggestions dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="inline-flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-gray-500">Szukam...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/produkt/${product.slug}`}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Product image */}
                    <div className="flex-shrink-0 w-12 h-12 relative bg-gray-100 rounded">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.name}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <p className="text-sm text-gray-500">
                        {product.sku && `SKU: ${product.sku}`}
                      </p>
                    </div>
                    
                    {/* Product price */}
                    <div className="flex-shrink-0 text-right">
                      {product.prices.sale_price && product.prices.regular_price ? (
                        <>
                          <p className="text-sm font-medium text-red-600">
                            {formatPrice(product.prices.price)}
                          </p>
                          <p className="text-xs text-gray-500 line-through">
                            {formatPrice(product.prices.regular_price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(product.prices.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Brak wyników dla &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}