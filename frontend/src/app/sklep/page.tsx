'use client';

import { Suspense } from 'react';
import { useShop, ShopLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PerformanceMonitor } from '@/features/shop/components/dev/PerformanceMonitor';

// Performance optimized shop page with improved search
export default function ShopPage() {
  const shopData = useShop({
    perPage: 8,
    autoFetch: true,
    enableInfiniteScroll: true,
    initialFilters: {
      sortBy: 'date',
      sortOrder: 'desc',
    }
  });

  return (
    <main>
      <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie sklepu..." className="py-16" />}>
        <ShopLayout
          {...shopData}
          showHeader={true}
          showFilters={true}
        />
      </Suspense>
      
      {/* Development Performance Monitor */}
      <PerformanceMonitor />
    </main>
  );
}