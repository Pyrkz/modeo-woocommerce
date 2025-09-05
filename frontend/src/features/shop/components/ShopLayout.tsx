'use client';

import { memo } from 'react';
import { UseShopReturn } from '../types';
import { ShopHeader } from './ShopHeader';
import { ShopContent } from './ShopContent';
import { ShopNotificationContainer } from './ShopNotificationContainer';

interface ShopLayoutProps extends UseShopReturn {
  showHeader?: boolean;
  showFilters?: boolean;
}

export const ShopLayout = memo<ShopLayoutProps>(({
  products,
  loading,
  loadingMore,
  error,
  filters,
  pagination,
  notifications,
  loadProducts,
  loadMore,
  updateFilters,
  resetFilters,
  addToCart,
  showNotification,
  hideNotification,
  clearAllNotifications,
  showHeader = true,
  showFilters = true
}) => {
  return (
    <div className="min-h-screen bg-white">
      {showHeader && (
        <ShopHeader 
          totalProducts={pagination.totalProducts}
          currentProductsCount={products.length}
        />
      )}
      
      <ShopContent 
        products={products}
        loading={loading}
        loadingMore={loadingMore}
        error={error}
        filters={filters}
        pagination={pagination}
        loadProducts={loadProducts}
        loadMore={loadMore}
        updateFilters={updateFilters}
        resetFilters={resetFilters}
        addToCart={addToCart}
        showFilters={showFilters}
        notifications={notifications}
        showNotification={showNotification}
        hideNotification={hideNotification}
        clearAllNotifications={clearAllNotifications}
      />
      
      {/* Notifications */}
      <ShopNotificationContainer 
        notifications={notifications}
        onHideNotification={hideNotification}
      />
    </div>
  );
});

ShopLayout.displayName = 'ShopLayout';