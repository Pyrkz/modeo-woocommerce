'use client';

import { memo, useState, useMemo } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useCategories } from '../hooks/useCategories';
import { EnhancedFilters } from './filters/EnhancedFilters';
import { usePriceRange } from '../hooks/usePriceRange';
import { ProductGridSkeleton, FiltersSkeleton } from './loading';
import { VirtualizedProductGrid } from './product/VirtualizedProductGrid';
import { useOptimizedShop } from '../hooks/useOptimizedShop';

interface SmartShopContentProps {
  showFilters?: boolean;
  perPage?: number;
  enableInfiniteScroll?: boolean;
  initialFilters?: Partial<import('../types').ShopFilters>;
}

// Memoized components for better performance
const ShopProductsInfo = memo<{ 
  totalProducts: number; 
  currentCount: number;
  searchQuery?: string;
}>(({ totalProducts, currentCount, searchQuery }) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {searchQuery ? `Wyniki wyszukiwania: "${searchQuery}"` : 'Wszystkie Produkty'}
      </h2>
      <p className="text-gray-600">
        {totalProducts > 0 
          ? `Pokazano ${currentCount} z ${totalProducts} produktów`
          : `Znaleziono ${currentCount} produktów`
        }
      </p>
    </div>
  </div>
));
ShopProductsInfo.displayName = 'ShopProductsInfo';

// Memoized mobile filter toggle
const MobileFilterToggle = memo<{
  onToggle: () => void;
  activeFilterCount: number;
}>(({ onToggle, activeFilterCount }) => (
  <button
    onClick={onToggle}
    className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-6"
  >
    <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
    <span className="text-sm font-medium text-gray-700">Filtry</span>
    {activeFilterCount > 0 && (
      <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">
        {activeFilterCount}
      </span>
    )}
  </button>
));
MobileFilterToggle.displayName = 'MobileFilterToggle';

// Error component
const ErrorDisplay = memo<{ error: string }>(({ error }) => (
  <section className="py-16 bg-white">
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Błąd ładowania</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  </section>
));
ErrorDisplay.displayName = 'ErrorDisplay';

export const SmartShopContent = memo<SmartShopContentProps>(({
  showFilters = true,
  perPage = 8,
  enableInfiniteScroll = true,
  initialFilters = {}
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Use optimized shop hook with performance improvements
  const {
    products,
    filters,
    pagination,
    loading,
    loadingMore,
    error,
    updateFilters,
    resetFilters,
    loadMore,
    cacheInfo
  } = useOptimizedShop({
    perPage,
    autoFetch: true,
    enableInfiniteScroll,
    initialFilters,
    cacheTimeout: 200 // Very fast debouncing for instant feedback
  });

  // Fetch categories (cached)
  const {
    categoryHierarchy,
    loading: categoriesLoading,
  } = useCategories({
    autoFetch: true,
    hideEmpty: true,
    buildHierarchy: true,
  });
  
  // Get dynamic price range (cached)
  const { priceRange } = usePriceRange();

  // Memoize active filter count calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.colors?.length) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.inStock) count++;
    if (filters.featured) count++;
    return count;
  }, [filters]);

  // Performance logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SmartShop] Cache: ${cacheInfo.hasCache ? 'HIT' : 'MISS'}, Products: ${products.length}, Loading: ${loading}`);
  }

  // Loading state with skeleton
  if (loading && products.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters skeleton */}
            {showFilters && (
              <div className="lg:col-span-1">
                <div className="px-3 py-4 bg-gray-50 rounded-lg">
                  <FiltersSkeleton />
                </div>
              </div>
            )}
            
            {/* Products skeleton */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <div className="px-2 sm:px-0">
                <div className="mb-6">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <ProductGridSkeleton count={perPage} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar - only rerender when categories change */}
          {showFilters && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar px-3 py-4 bg-gray-50 rounded-lg">
                <EnhancedFilters
                  filters={filters}
                  categories={categoryHierarchy}
                  categoriesLoading={categoriesLoading}
                  loading={false} // Don't show loading in filters when products are loading
                  priceRange={priceRange}
                  onFiltersChange={updateFilters}
                  onResetFilters={resetFilters}
                />
              </div>
            </aside>
          )}

          {/* Main Content - optimized rendering */}
          <div className="flex-1 min-w-0 px-2 sm:px-0">
            {/* Mobile Filter Toggle - only rerender when count changes */}
            {showFilters && (
              <MobileFilterToggle 
                onToggle={() => setMobileFiltersOpen(true)}
                activeFilterCount={activeFilterCount}
              />
            )}

            {/* Products Info - only rerender when totals change */}
            <ShopProductsInfo 
              totalProducts={pagination.totalProducts}
              currentCount={products.length}
              searchQuery={filters.search}
            />
            
            {/* Product Grid - highly optimized with memoization */}
            <VirtualizedProductGrid 
              products={products}
              loadingMore={loadingMore}
              hasMore={pagination.hasMore}
              onLoadMore={loadMore}
              className="mb-8"
            />
          </div>
        </div>

        {/* Mobile Filters Modal - only render when open */}
        {showFilters && mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative bg-white w-full h-full overflow-y-auto">
              <EnhancedFilters
                filters={filters}
                categories={categoryHierarchy}
                categoriesLoading={categoriesLoading}
                loading={false}
                priceRange={priceRange}
                onFiltersChange={updateFilters}
                onResetFilters={resetFilters}
                isMobile={true}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

SmartShopContent.displayName = 'SmartShopContent';