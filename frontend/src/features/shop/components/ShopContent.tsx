'use client';

import { memo, useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { UseShopReturn } from '../types';
import { useCategories } from '../hooks/useCategories';
import { EnhancedFilters, MobileBottomFilterButton } from './filters';
import { usePriceRange } from '../hooks/usePriceRange';
import { ShopPageSkeleton } from './loading/ShopPageSkeleton';
import { InlineProductsSkeleton } from './loading/InlineProductsSkeleton';

// Use optimized product grid
import { OptimizedProductGrid } from './OptimizedProductGrid';

interface ShopContentProps extends UseShopReturn {
  showFilters?: boolean;
  categoryName?: string;
  categorySlug?: string;
}

const ShopProductsInfo = memo<{ 
  totalProducts: number; 
  currentCount: number 
}>(({ totalProducts, currentCount }) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Wszystkie Produkty</h2>
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

const LoadMoreButton = memo<{
  onLoadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
}>(({ onLoadMore, hasMore, loadingMore }) => {
  if (!hasMore || loadingMore) return null;

  return (
    <div className="text-center py-8">
      <button 
        onClick={onLoadMore}
        className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        Załaduj więcej produktów
      </button>
    </div>
  );
});
LoadMoreButton.displayName = 'LoadMoreButton';

const EndOfResults = memo<{ totalProducts: number }>(({ totalProducts }) => (
  <div className="text-center py-8">
    <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-800 mb-2">To wszystko!</h3>
      <p className="text-gray-600">
        Pokazano wszystkie {totalProducts} produktów w naszym sklepie.
      </p>
    </div>
  </div>
));
EndOfResults.displayName = 'EndOfResults';

export const ShopContent = memo<ShopContentProps>(({
  products,
  loading,
  loadingMore,
  error,
  filters,
  pagination,
  updateFilters,
  resetFilters,
  addToCart,
  loadMore,
  showFilters = true,
  categoryName,
  categorySlug
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Fetch categories
  const {
    categoryHierarchy,
    loading: categoriesLoading,
  } = useCategories({
    autoFetch: true,
    hideEmpty: true,
    buildHierarchy: true,
  });
  
  // Get dynamic price range
  const { priceRange } = usePriceRange();
  if (loading && products.length === 0) {
    return <ShopPageSkeleton />;
  }

  if (error) {
    return (
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
    );
  }

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

  // Mobile filter toggle button
  const MobileFilterToggle = memo(() => {
    const activeCount = getActiveFilterCount();
    
    return (
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-6"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filtry</span>
        {activeCount > 0 && (
          <span className="bg-primary text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">
            {activeCount}
          </span>
        )}
      </button>
    );
  });
  MobileFilterToggle.displayName = 'MobileFilterToggle';

  return (
    <section className="py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          {/* Desktop Filters Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar px-3 py-4 bg-gray-50 rounded-lg">
                <EnhancedFilters
                  filters={filters}
                  categories={categoryHierarchy}
                  categoriesLoading={categoriesLoading}
                  loading={loading}
                  priceRange={priceRange}
                  onFiltersChange={updateFilters}
                  onResetFilters={resetFilters}
                  categoryName={categoryName}
                  categorySlug={categorySlug}
                />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0 px-2 sm:px-0">
            {/* Mobile Filter Toggle */}
            {showFilters && <MobileFilterToggle />}

            <ShopProductsInfo 
              totalProducts={pagination.totalProducts}
              currentCount={products.length}
            />
            
            {/* Smart loading - show skeleton overlay during filtering */}
            {loading && products.length > 0 ? (
              <InlineProductsSkeleton count={8} />
            ) : (
              <OptimizedProductGrid 
                products={products}
                onAddToCart={addToCart}
                loadingMore={loadingMore}
                className="mb-8"
              />
            )}

            {/* End of Results */}
            {!pagination.hasMore && products.length > 0 && (
              <EndOfResults totalProducts={pagination.totalProducts} />
            )}

            {/* Load More Button (fallback) */}
            <LoadMoreButton 
              onLoadMore={loadMore}
              hasMore={pagination.hasMore}
              loadingMore={loadingMore}
            />
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showFilters && mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative bg-white w-full h-full overflow-y-auto">
              <EnhancedFilters
                filters={filters}
                categories={categoryHierarchy}
                categoriesLoading={categoriesLoading}
                loading={loading}
                priceRange={priceRange}
                onFiltersChange={updateFilters}
                onResetFilters={resetFilters}
                isMobile={true}
                isOpen={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                categoryName={categoryName}
                categorySlug={categorySlug}
              />
            </div>
          </div>
        )}

        {/* Mobile Bottom Filter Button */}
        {showFilters && (
          <MobileBottomFilterButton
            filters={filters}
            onOpen={() => setMobileFiltersOpen(true)}
            isVisible={!mobileFiltersOpen}
          />
        )}
      </div>
    </section>
  );
});

ShopContent.displayName = 'ShopContent';