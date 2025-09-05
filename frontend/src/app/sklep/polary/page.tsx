'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PolaryPage() {
  const shopData = useCategoryShop({
    categorySlug: 'polary',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie polarów..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Polary"
        categorySlug="polary"
        showFilters={true}
      />
    </Suspense>
  );
}