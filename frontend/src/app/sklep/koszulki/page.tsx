'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function KoszulkiPage() {
  const shopData = useCategoryShop({
    categorySlug: 'koszulki',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie koszulek..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Koszulki"
        categorySlug="koszulki"
        showFilters={true}
      />
    </Suspense>
  );
}