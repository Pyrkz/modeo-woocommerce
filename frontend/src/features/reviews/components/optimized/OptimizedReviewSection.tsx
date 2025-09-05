'use client';

import { useState, Suspense, lazy, useRef, useEffect, useCallback, memo } from 'react';
import { useOptimizedReviews, useOptimizedReviewStats } from '../../hooks/useOptimizedReviews';
import { ReviewStatsComponent } from '../ReviewStats';
import { StarRating } from '../StarRating';
import { OptimizedReviewList } from './OptimizedReviewList';

// Lazy load the review form for better performance
const ReviewForm = lazy(() => import('../ReviewForm').then(module => ({ default: module.ReviewForm })));

interface OptimizedReviewSectionProps {
  productId: number;
}

export const OptimizedReviewSection = memo(function OptimizedReviewSection({ 
  productId 
}: OptimizedReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { stats, loading: statsLoading } = useOptimizedReviewStats(productId);
  const { 
    reviews, 
    loading: reviewsLoading, 
    error, 
    hasMore, 
    loadMoreReviews, 
    refreshReviews 
  } = useOptimizedReviews(productId, 5); // Start with 5 reviews

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px' // Load earlier for better UX
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
    refreshReviews();
  }, [refreshReviews]);

  const handleReviewsUpdated = useCallback(() => {
    refreshReviews();
  }, [refreshReviews]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div ref={sectionRef} className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Opinie klientów
        </h2>
        {!showForm && isVisible && (
          <button
            onClick={handleShowForm}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     shadow-sm hover:shadow-md font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Napisz opinię
          </button>
        )}
      </div>

      {/* Only render content when visible */}
      {!isVisible ? (
        <div className="py-16">
          <div className="flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Review Statistics - Only show if there are reviews */}
          {stats.total_reviews > 0 ? (
            <ReviewStatsComponent stats={stats} loading={statsLoading} />
          ) : (
            /* Empty State for No Reviews */
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              
              <div className="mb-6 flex justify-center">
                <StarRating rating={0} readonly size="lg" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Brak opinii klientów</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-lg mx-auto">
                Ten produkt nie ma jeszcze żadnych recenzji. Podziel się swoją opinią 
                i pomóż innym klientom w podjęciu decyzji o zakupie.
              </p>
              
              <div className="inline-flex items-center justify-center bg-white border border-primary-200 rounded-lg px-6 py-3">
                <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium text-primary-700">Bądź pierwszą osobą, która wystawi opinię!</span>
              </div>
            </div>
          )}

          {/* Review Form */}
          {showForm && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Napisz swoją opinię
              </h3>
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Ładowanie formularza...</span>
                  </div>
                }
              >
                <ReviewForm 
                  productId={productId} 
                  onSuccess={handleFormSuccess} 
                  onCancel={handleHideForm}
                />
              </Suspense>
            </div>
          )}

          {/* Reviews List - Only show when there are reviews or errors */}
          {!statsLoading && (stats.total_reviews > 0 || reviews.length > 0 || reviewsLoading || error) && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              {error ? (
                <div className="text-center py-8 border border-red-100 bg-red-50 rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-lg font-medium text-red-900 mb-2">Błąd podczas ładowania recenzji</h3>
                  <p className="text-red-700 mb-4">Nie udało się załadować opinii klientów.</p>
                  <button 
                    onClick={refreshReviews}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Spróbuj ponownie
                  </button>
                </div>
              ) : (
                <OptimizedReviewList
                  reviews={reviews}
                  loading={reviewsLoading}
                  onLoadMore={loadMoreReviews}
                  hasMore={hasMore}
                  productId={productId}
                  onReviewsUpdated={handleReviewsUpdated}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
});

OptimizedReviewSection.displayName = 'OptimizedReviewSection';