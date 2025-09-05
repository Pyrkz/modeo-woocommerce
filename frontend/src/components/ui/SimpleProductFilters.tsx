import { useState } from 'react';

interface SimpleProductFiltersProps {
  onFiltersChange: (filtersUrl: string) => void;
  className?: string;
}

const SimpleProductFilters = ({ onFiltersChange, className = '' }: SimpleProductFiltersProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  // Simple price and availability filters for now
  const applyFilters = () => {
    const baseUrl = 'http://localhost:8080/wp-json/wc/store/products';
    const params = new URLSearchParams();

    // Add price range filter
    if (minPrice) {
      params.append('min_price', (parseInt(minPrice) * 100).toString()); // Convert to grosze
    }
    if (maxPrice) {
      params.append('max_price', (parseInt(maxPrice) * 100).toString()); // Convert to grosze
    }

    // Add stock filter
    if (inStock) {
      params.append('stock_status', 'instock');
    }

    // Add sale filter
    if (onSale) {
      params.append('on_sale', 'true');
    }

    const filtersUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    onFiltersChange(filtersUrl);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setInStock(false);
    setOnSale(false);
    onFiltersChange('http://localhost:8080/wp-json/wc/store/products');
  };

  const activeFiltersCount = 
    (minPrice ? 1 : 0) + 
    (maxPrice ? 1 : 0) + 
    (inStock ? 1 : 0) + 
    (onSale ? 1 : 0);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Header with clear button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Filtry 
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-white text-sm px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            Wyczyść
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Zakres cen</h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Od (zł)</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Do (zł)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stock & Sale Filters */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Dostępność</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-gray-700">Tylko dostępne</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-gray-700">Na promocji</span>
          </label>
        </div>
      </div>

      {/* Apply Button */}
      <div>
        <button
          onClick={applyFilters}
          className="w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Zastosuj filtry
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className={`hidden lg:block bg-white border border-gray-200 rounded-lg ${className}`}>
        <div className="p-6">
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Filtry
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-white text-sm px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtry</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <FiltersContent />

              {/* Apply and Close Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    applyFilters();
                    setShowMobileFilters(false);
                  }}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors"
                >
                  Zastosuj i zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleProductFilters;