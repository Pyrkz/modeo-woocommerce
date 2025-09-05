'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { ShopFilters as ShopFiltersType } from '../../types';
import { CategoryHierarchy } from '@/types/category';
import { CategoryFilter } from './CategoryFilter';
import { ColorFilter } from './ColorFilter';
import { SearchInput } from '../search';
import { PriceRangeSlider } from '@/components/ui/PriceRangeSlider';
import { usePriceRange } from '../../hooks/usePriceRange';

interface ShopFiltersProps {
  filters: ShopFiltersType;
  categories: CategoryHierarchy[];
  categoriesLoading?: boolean;
  loading?: boolean;
  onFiltersChange: (filters: Partial<ShopFiltersType>) => void;
  onResetFilters: () => void;
  className?: string;
  // Mobile support
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ShopFiltersPanel: React.FC<ShopFiltersProps> = ({
  filters,
  categories,
  categoriesLoading = false,
  loading = false,
  onFiltersChange,
  onResetFilters,
  className = '',
  isMobile = false,
  isOpen = true,
  onClose,
}) => {
  // Get dynamic price range from products
  const { priceRange: dynamicPriceRange, loading: priceRangeLoading } = usePriceRange();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || dynamicPriceRange.min,
    filters.maxPrice || dynamicPriceRange.max,
  ]);
  
  // Handle search changes
  const handleSearchChange = (value: string) => {
    onFiltersChange({ search: value || undefined });
  };
  

  // Sync price range when filters change (e.g., on reset)
  useEffect(() => {
    const newMin = filters.minPrice || dynamicPriceRange.min;
    const newMax = filters.maxPrice || dynamicPriceRange.max;
    
    if (priceRange[0] !== newMin || priceRange[1] !== newMax) {
      setPriceRange([newMin, newMax]);
    }
  }, [filters.minPrice, filters.maxPrice, dynamicPriceRange.min, dynamicPriceRange.max, priceRange]);
  
  // Update price range when dynamic range loads
  useEffect(() => {
    if (!priceRangeLoading && !filters.minPrice && !filters.maxPrice) {
      setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
    }
  }, [dynamicPriceRange, priceRangeLoading, filters.minPrice, filters.maxPrice]);

  // Handle category selection
  const handleCategoryChange = (selectedCategories: number[]) => {
    if (selectedCategories.length === 0) {
      onFiltersChange({ category: undefined });
    } else {
      // For WooCommerce API, we send comma-separated category IDs
      onFiltersChange({ category: selectedCategories.join(',') });
    }
  };

  // Get currently selected category IDs
  const getSelectedCategories = (): number[] => {
    if (!filters.category) return [];
    return filters.category.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
  };

  // Handle color selection
  const handleColorChange = (selectedColors: number[]) => {
    onFiltersChange({ colors: selectedColors.length > 0 ? selectedColors : undefined });
  };

  // Handle price range update
  const handlePriceRangeUpdate = (newRange: [number, number]) => {
    setPriceRange(newRange);
    
    onFiltersChange({
      minPrice: newRange[0] > dynamicPriceRange.min ? newRange[0] : undefined,
      maxPrice: newRange[1] < dynamicPriceRange.max ? newRange[1] : undefined,
    });
  };

  // Check if filters are active
  const hasActiveFilters = () => {
    return !!(
      filters.category ||
      filters.search ||
      filters.colors?.length ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.inStock ||
      filters.featured
    );
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2" />
          Filtry
        </h2>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Zamknij filtry"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Reset filters */}
      {hasActiveFilters() && (
        <button
          onClick={onResetFilters}
          className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
        >
          Resetuj wszystkie filtry
        </button>
      )}

      {/* Search */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Wyszukaj produkty
        </label>
        <SearchInput
          value={filters.search || ''}
          onChange={handleSearchChange}
          debounceMs={500}
          placeholder="Szukaj produktów..."
        />
      </div>

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        selectedCategories={getSelectedCategories()}
        onChange={handleCategoryChange}
        loading={categoriesLoading}
      />

      {/* Colors */}
      <ColorFilter
        selectedColors={filters.colors || []}
        onChange={handleColorChange}
        loading={loading}
      />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Zakres cen</h3>
        {priceRangeLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-500">Ładowanie zakresu cen...</span>
          </div>
        ) : (
          <PriceRangeSlider
            min={dynamicPriceRange.min}
            max={dynamicPriceRange.max}
            value={priceRange}
            onChange={handlePriceRangeUpdate}
            step={1}
            formatValue={(val) => `${val.toFixed(0)} zł`}
            className="px-1"
          />
        )}
      </div>

      {/* Stock & Featured */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Opcje produktów</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => onFiltersChange({ inStock: e.target.checked || undefined })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-800">Tylko dostępne w magazynie</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) => onFiltersChange({ featured: e.target.checked || undefined })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-800">Tylko produkty polecane</span>
          </label>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Sortowanie</h3>
        <div className="grid grid-cols-1 gap-2">
          <select
            value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [
                ShopFiltersType['sortBy'],
                ShopFiltersType['sortOrder']
              ];
              onFiltersChange({ sortBy, sortOrder });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="date-desc">Najnowsze</option>
            <option value="date-asc">Najstarsze</option>
            <option value="title-asc">Nazwa: A-Z</option>
            <option value="title-desc">Nazwa: Z-A</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
            <option value="popularity-desc">Najpopularniejsze</option>
            <option value="rating-desc">Najlepiej oceniane</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black transition-opacity duration-300
            ${isOpen ? 'opacity-50' : 'opacity-0'}
          `}
          onClick={onClose}
        />
        
        {/* Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl
            transform transition-transform duration-300 ease-in-out overflow-y-auto
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="p-6">
            {filterContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      {filterContent}
    </div>
  );
};