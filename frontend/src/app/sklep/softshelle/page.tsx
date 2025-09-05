'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function SoftshellePage() {
  const shopData = useCategoryShop({
    categorySlug: 'softshelle',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie kurtek softshell..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Softshelle"
        categorySlug="softshelle"
        showFilters={true}
      />
    </Suspense>
  );
}