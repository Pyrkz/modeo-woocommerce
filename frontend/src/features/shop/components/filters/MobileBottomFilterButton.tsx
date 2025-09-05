'use client';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { ShopFilters } from '../../types';

interface MobileBottomFilterButtonProps {
  filters: ShopFilters;
  onOpen: () => void;
  className?: string;
  isVisible?: boolean;
}

export function MobileBottomFilterButton({
  filters,
  onOpen,
  className = '',
  isVisible = true
}: MobileBottomFilterButtonProps) {
  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.colors?.length) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.inStock) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-40 lg:hidden
        ${className}
      `}
    >
      <button
        onClick={onOpen}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full shadow-lg
          font-medium text-sm transition-all duration-200
          ${activeFilterCount > 0 
            ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/25' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-gray-200/50'
          }
          hover:scale-105 hover:shadow-xl
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `}
        style={{ zIndex: 999 }}
        aria-label={`Zastosuj filtry${activeFilterCount > 0 ? ` (${activeFilterCount} aktywnych)` : ''}`}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        
        <span className="font-medium">
          Zastosuj filtry
          {activeFilterCount > 0 && (
            <span className={`
              ml-1 inline-flex items-center justify-center
              min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-bold
              ${activeFilterCount > 0 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'bg-primary text-white'
              }
            `}>
              {activeFilterCount}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}

// Alternative compact version (just icon + badge)
export function MobileBottomFilterButtonCompact({
  filters,
  onOpen,
  className = '',
  isVisible = true
}: MobileBottomFilterButtonProps) {
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.colors?.length) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.inStock) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-40 lg:hidden
        ${className}
      `}
    >
      <button
        onClick={onOpen}
        className={`
          relative flex items-center justify-center
          w-14 h-14 rounded-full shadow-lg
          transition-all duration-200
          ${activeFilterCount > 0 
            ? 'bg-primary hover:bg-primary-dark text-white shadow-primary/25' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-gray-200/50'
          }
          hover:scale-105 hover:shadow-xl
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `}
        style={{ zIndex: 999 }}
        aria-label={`Zastosuj filtry${activeFilterCount > 0 ? ` (${activeFilterCount} aktywnych)` : ''}`}
      >
        <AdjustmentsHorizontalIcon className="h-6 w-6" />
        
        {activeFilterCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
            {activeFilterCount > 9 ? '9+' : activeFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}