'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { XMarkIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { ShopFilters as ShopFiltersType } from '../../types';
import { CategoryHierarchy } from '@/types/category';
import { ImprovedCategoryFilter } from './ImprovedCategoryFilter';
import { ColorFilter } from './ColorFilter';
import { SearchInput } from '../search';
import { PriceRangeSlider } from '@/components/ui/PriceRangeSlider';
import { config } from '@/lib/config';

interface EnhancedFiltersProps {
  filters: ShopFiltersType;
  categories: CategoryHierarchy[];
  categoriesLoading?: boolean;
  loading?: boolean;
  priceRange: { min: number; max: number };
  onFiltersChange: (filters: Partial<ShopFiltersType>) => void;
  onResetFilters: () => void;
  className?: string;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  categoryName?: string;
  categorySlug?: string;
}

// Collapsible section component
const FilterSection = memo<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  itemCount?: number;
}>(({ title, children, defaultOpen = true, itemCount }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-gray-900 hover:text-gray-700"
      >
        <div className="flex items-center gap-2">
          <span>{title}</span>
          {itemCount !== undefined && itemCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
              {itemCount}
            </span>
          )}
        </div>
        <ChevronDownIcon 
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
});
FilterSection.displayName = 'FilterSection';

// Active filters display
const ActiveFilters = memo<{
  filters: ShopFiltersType;
  categories: CategoryHierarchy[];
  onRemoveFilter: (filterType: 'search' | 'category' | 'colors' | 'price' | 'inStock', value?: string | number | boolean | number[]) => void;
  onResetAll: () => void;
  colorTerms?: Array<{id: number, name: string}>; // Pass color data from parent
  categoryName?: string;
  categorySlug?: string;
}>(({ filters, categories, onRemoveFilter, onResetAll, colorTerms = [], categoryName, categorySlug }) => {
  // Helper function to find category names by IDs or slugs
  const getCategoryNames = (categoryIds: string | number[]): string => {
    let ids: number[] = [];
    let slugs: string[] = [];
    
    if (Array.isArray(categoryIds)) {
      ids = categoryIds;
    } else if (typeof categoryIds === 'string') {
      // Check if it's a numeric ID list (e.g., "1,2,3") or a slug (e.g., "koszulki")
      const parts = categoryIds.split(',');
      const numericParts = parts.map(id => parseInt(id)).filter(id => !isNaN(id));
      
      if (numericParts.length === parts.length) {
        // All parts are numeric IDs
        ids = numericParts;
      } else {
        // It's a slug or contains slugs
        slugs = parts.map(slug => slug.trim());
      }
    } else {
      return 'Kategoria';
    }
    
    const names: string[] = [];
    
    const findCategory = (cats: CategoryHierarchy[], targetId?: number, targetSlug?: string): CategoryHierarchy | null => {
      for (const cat of cats) {
        if ((targetId && cat.id === targetId) || (targetSlug && cat.slug === targetSlug)) {
          return cat;
        }
        const found = findCategory(cat.children, targetId, targetSlug);
        if (found) return found;
      }
      return null;
    };
    
    // Find by IDs
    ids.forEach(id => {
      const category = findCategory(categories, id, undefined);
      if (category) names.push(category.name);
    });
    
    // Find by slugs
    slugs.forEach(slug => {
      const category = findCategory(categories, undefined, slug);
      if (category) names.push(category.name);
    });
    
    // If we couldn't find the category name but we have it from props, use it
    if (names.length === 0 && categoryName && categorySlug && slugs.includes(categorySlug)) {
      return categoryName;
    }
    
    return names.length > 0 ? names.join(', ') : 'Kategoria';
  };

  // Helper function to find color names by IDs
  const getColorNames = (colorIds: number[]): string => {
    if (!colorIds || !Array.isArray(colorIds) || colorIds.length === 0) return 'Kolory';
    
    // If color terms are not loaded yet, show generic labels
    if (colorTerms.length === 0) {
      return colorIds.length === 1 ? 'Kolor' : `Kolory (${colorIds.length})`;
    }
    
    const colorNames = colorIds.map(id => {
      const color = colorTerms.find(c => c.id === id);
      return color ? color.name : `Kolor ${id}`;
    });
    
    return colorNames.join(', ');
  };

  const activeFilters = [];
  
  if (filters.search) {
    activeFilters.push({
      type: 'search' as const,
      label: `"${filters.search}"`,
      value: filters.search
    });
  }
  
  if (filters.category) {
    activeFilters.push({
      type: 'category' as const,
      label: getCategoryNames(filters.category),
      value: filters.category
    });
  }
  
  if (filters.colors && filters.colors.length > 0) {
    activeFilters.push({
      type: 'colors' as const,
      label: getColorNames(filters.colors),
      value: filters.colors
    });
  }
  
  if (filters.minPrice || filters.maxPrice) {
    activeFilters.push({
      type: 'price' as const,
      label: 'Cena',
      value: `${filters.minPrice || 0} - ${filters.maxPrice || '∞'} zł`
    });
  }
  
  if (filters.inStock) {
    activeFilters.push({
      type: 'inStock' as const,
      label: 'Dostępne',
      value: true
    });
  }
  
  
  if (activeFilters.length === 0) return null;
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">Aktywne filtry</span>
        <button
          onClick={onResetAll}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Wyczyść wszystko
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <span
            key={`${filter.type}-${index}`}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary text-white"
          >
            {filter.label}
            <button
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="ml-1 hover:bg-primary-dark rounded-full p-0.5"
            >
              <XMarkIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
});
ActiveFilters.displayName = 'ActiveFilters';

export function EnhancedFilters({
  filters,
  categories,
  categoriesLoading = false,
  loading = false,
  priceRange,
  onFiltersChange,
  onResetFilters,
  className = '',
  isMobile = false,
  // isOpen = true, // Removed unused param
  onClose,
  categoryName,
  categorySlug
}: EnhancedFiltersProps) {
  // State for color terms to share between ColorFilter and ActiveFilters
  const [colorTerms, setColorTerms] = useState<Array<{id: number, name: string}>>([]);
  
  // Fetch color terms once when component mounts
  useEffect(() => {
    const fetchColorTerms = async () => {
      try {
        const response = await fetch(`${config.getApiUrl()}/wp-json/modeo/v1/color-swatches`);
        if (response.ok) {
          const colors = await response.json();
          setColorTerms(colors.map((c: {id: number, name: string}) => ({ id: c.id, name: c.name })));
        }
      } catch (error) {
        console.error('Failed to fetch color terms:', error);
      }
    };
    fetchColorTerms();
  }, []);
  
  const handleSearchChange = useCallback((value: string) => {
    onFiltersChange({ search: value || undefined });
  }, [onFiltersChange]);
  
  const handleColorChange = useCallback((colors: number[]) => {
    onFiltersChange({ colors: colors.length > 0 ? colors : undefined });
  }, [onFiltersChange]);
  
  const handleCheckboxChange = useCallback((filterType: 'inStock', checked: boolean) => {
    onFiltersChange({ [filterType]: checked || undefined });
  }, [onFiltersChange]);
  
  const handleRemoveFilter = useCallback((filterType: 'search' | 'category' | 'colors' | 'price' | 'inStock') => {
    switch (filterType) {
      case 'search':
        onFiltersChange({ search: undefined });
        break;
      case 'category':
        onFiltersChange({ category: undefined });
        break;
      case 'colors':
        onFiltersChange({ colors: undefined });
        break;
      case 'price':
        onFiltersChange({ minPrice: undefined, maxPrice: undefined });
        break;
      case 'inStock':
        onFiltersChange({ inStock: undefined });
        break;
    }
  }, [onFiltersChange]);
  
  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.colors?.length) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.inStock) count++;
    return count;
  }, [filters]);
  
  const getSelectedCategories = useCallback(() => {
    if (!filters.category) return [];
    if (typeof filters.category === 'string') {
      return filters.category.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
    }
    return Array.isArray(filters.category) ? filters.category : [];
  }, [filters.category]);
  
  const activeFilterCount = getActiveFilterCount();
  
  return (
    <div className={`${className} ${isMobile ? 'block' : 'hidden lg:block'}`}>
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">
              Filtry
            </h2>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-primary text-white">
                {activeFilterCount}
              </span>
            )}
          </div>
          {onClose && (
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
      
      <div className={`${isMobile ? 'p-4' : 'px-1'} space-y-0`}>
        {/* Active filters */}
        <ActiveFilters
          filters={filters}
          categories={categories}
          onRemoveFilter={handleRemoveFilter}
          onResetAll={onResetFilters}
          colorTerms={colorTerms}
          categoryName={categoryName}
          categorySlug={categorySlug}
        />
        
        {/* Search */}
        <FilterSection title="Wyszukaj" defaultOpen>
          <SearchInput
            value={filters.search || ''}
            onChange={handleSearchChange}
            placeholder="Szukaj produktów..."
            showClearButton={true}
          />
        </FilterSection>
        
        {/* Categories */}
        <div className="border-b border-gray-200 pb-4">
          <ImprovedCategoryFilter
            categories={categories}
            selectedCategories={getSelectedCategories()}
            onChange={(selectedCategories: number[]) => {
              // Convert selected category IDs to string format
              const categoryString = selectedCategories.length > 0 
                ? selectedCategories.map(id => id.toString()).join(',')
                : undefined;
              onFiltersChange({ category: categoryString });
            }}
            loading={categoriesLoading}
          />
        </div>
        
        {/* Colors */}
        <FilterSection 
          title="Kolory" 
          defaultOpen={false}
          itemCount={filters.colors?.length}
        >
          <ColorFilter
            selectedColors={filters.colors || []}
            onChange={handleColorChange}
            loading={loading}
          />
        </FilterSection>
        
        {/* Price Range */}
        <FilterSection title="Cena" defaultOpen={false}>
          <PriceRangeSlider
            min={priceRange.min}
            max={priceRange.max}
            value={[
              filters.minPrice || priceRange.min,
              filters.maxPrice || priceRange.max
            ]}
            onChange={(value: [number, number]) => {
              const [min, max] = value;
              onFiltersChange({
                minPrice: min > priceRange.min ? min : undefined,
                maxPrice: max < priceRange.max ? max : undefined
              });
            }}
            step={1}
            formatValue={(val) => `${val.toFixed(0)} zł`}
          />
        </FilterSection>
        
        {/* Availability & Features */}
        <FilterSection title="Dostępność" defaultOpen={false}>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Tylko dostępne</span>
            </label>
            
          </div>
        </FilterSection>
        
        {/* Mobile apply button */}
        {isMobile && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Zastosuj filtry {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}