'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UbraniaRoboczePage() {
  const shopData = useCategoryShop({
    categorySlug: 'ubrania-robocze',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie ubrań roboczych..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Ubrania robocze"
        categorySlug="ubrania-robocze"
        showFilters={true}
      />
    </Suspense>
  );
}