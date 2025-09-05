'use client';

import { memo, useCallback, useMemo } from 'react';
import { Review } from '../../types';
import { OptimizedReviewItem } from './OptimizedReviewItem';
import { LoadMoreButton } from './LoadMoreButton';
import { ReviewListSkeleton } from './ReviewListSkeleton';

interface OptimizedReviewListProps {
  reviews: Review[];
  loading: boolean;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  productId: number;
  onReviewsUpdated: () => void;
}

export const OptimizedReviewList = memo(function OptimizedReviewList({
  reviews,
  loading,
  onLoadMore,
  hasMore,
  productId,
  onReviewsUpdated
}: OptimizedReviewListProps) {
  
  const handleReviewInteraction = useCallback(() => {
    onReviewsUpdated();
  }, [onReviewsUpdated]);

  // Memoize review items to prevent unnecessary re-renders
  const reviewItems = useMemo(() => 
    reviews.map((review) => (
      <OptimizedReviewItem
        key={`review-${review.id}`}
        review={review}
        productId={productId}
        onInteraction={handleReviewInteraction}
      />
    )),
    [reviews, productId, handleReviewInteraction]
  );

  if (loading && reviews.length === 0) {
    return <ReviewListSkeleton count={3} />;
  }

  if (!loading && reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 rounded-xl p-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak opinii</h3>
          <p className="text-gray-500">Ten produkt nie ma jeszcze żadnych opinii.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Opinie ({reviews.length})
        </h3>
        <div className="text-sm text-gray-500">
          Najnowsze pierwsze
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviewItems}
      </div>

      {/* Load More Section */}
      {hasMore && (
        <LoadMoreButton 
          onLoadMore={onLoadMore}
          loading={loading}
        />
      )}

      {/* Loading More Indicator */}
      {loading && reviews.length > 0 && (
        <div className="py-6">
          <ReviewListSkeleton count={2} />
        </div>
      )}
    </div>
  );
});

OptimizedReviewList.displayName = 'OptimizedReviewList';