'use client';

import { memo } from 'react';
import { UseShopReturn } from '../types';
import { ShopContent } from './ShopContent';
import { ShopNotificationContainer } from './ShopNotificationContainer';
import Breadcrumbs, { BreadcrumbItem } from '@/components/ui/Breadcrumbs';

interface CategoryLayoutProps extends UseShopReturn {
  categoryName: string;
  categorySlug: string;
  showFilters?: boolean;
}

export const CategoryLayout = memo<CategoryLayoutProps>(({
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
  categoryName,
  categorySlug,
  showFilters = true
}) => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Sklep', href: '/sklep' },
    { label: categoryName, href: `/sklep/${categorySlug}`, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
      
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
        categoryName={categoryName}
        categorySlug={categorySlug}
      />
      
      {/* Notifications */}
      <ShopNotificationContainer 
        notifications={notifications}
        onHideNotification={hideNotification}
      />
    </div>
  );
});

CategoryLayout.displayName = 'CategoryLayout';