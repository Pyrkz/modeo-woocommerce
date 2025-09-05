'use client';

import { Suspense } from 'react';
import { useCategoryShop, CategoryLayout } from '@/features/shop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CzapkiPage() {
  const shopData = useCategoryShop({
    categorySlug: 'czapki',
    perPage: 12,
    autoFetch: true,
    enableInfiniteScroll: true
  });

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Ładowanie czapek..." className="py-16" />}>
      <CategoryLayout
        {...shopData}
        categoryName="Czapki"
        categorySlug="czapki"
        showFilters={true}
      />
    </Suspense>
  );
}