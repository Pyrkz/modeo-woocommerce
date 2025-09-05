'use client';

import { useState, Suspense, lazy, memo, useCallback } from 'react';
import { Review } from '../types';
import { StarRating } from './StarRating';
import { ReplyThread } from './reply/ReplyThread';

// Lazy load the reply form for better performance
const ReplyForm = lazy(() => import('./forms/ReplyForm').then(module => ({ default: module.ReplyForm })));

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  productId: number;
  onReviewsUpdated?: () => void;
}

export const ReviewList = memo(function ReviewList({ 
  reviews, 
  loading, 
  onLoadMore, 
  hasMore, 
  productId, 
  onReviewsUpdated 
}: ReviewListProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }, []);
  
  const handleReplySuccess = useCallback(() => {
    setReplyingTo(null);
    // Force immediate refresh of reviews data
    onReviewsUpdated?.();
  }, [onReviewsUpdated]);
  
  const handleToggleReply = useCallback((reviewId: number) => {
    setReplyingTo(current => current === reviewId ? null : reviewId);
  }, []);
  
  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  if (loading && reviews.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 pb-4 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Brak recenzji</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Ten produkt nie ma jeszcze żadnych opinii od klientów. 
            Pomóż innym w podjęciu decyzji o zakupie.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="font-medium text-blue-900">Bądź pierwszą osobą, która wystawi opinię!</span>
            </div>
            <p className="text-sm text-blue-800">
              Podziel się swoimi wrażeniami z produktu i pomóż innym klientom
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
              {review.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                               bg-green-100 text-green-800 border border-green-200">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Zweryfikowany zakup
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(review.date_created)}
            </div>
          </div>
          
          <div className="mb-3">
            <StarRating rating={review.rating} readonly size="sm" />
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {review.review}
            </p>
          </div>

          {/* Reply action for main review */}
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={() => handleToggleReply(review.id)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              {replyingTo === review.id ? 'Anuluj' : 'Odpowiedz'}
            </button>
            
            {review.replies && review.replies.length > 0 && (
              <span className="text-sm text-gray-500">
                {review.replies.length} {review.replies.length === 1 ? 'odpowiedź' : 'odpowiedzi'}
              </span>
            )}
          </div>

          {/* Reply Form for main review */}
          {replyingTo === review.id && (
            <div className="mt-4 pl-6 border-l-2 border-blue-200">
              <Suspense
                fallback={
                  <div className="flex items-center gap-2 p-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">Ładowanie formularza...</span>
                  </div>
                }
              >
                <ReplyForm
                  parentId={review.id}
                  productId={productId}
                  onSuccess={handleReplySuccess}
                  onCancel={handleCancelReply}
                  placeholder={`Odpowiedz ${review.reviewer}...`}
                />
              </Suspense>
            </div>
          )}

          {/* Display replies using ReplyThread component */}
          {review.replies && review.replies.length > 0 && (
            <div className="mt-4">
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded mb-4">
                  🐛 DEBUG: Rendering {review.replies.length} replies for review {review.id}
                </div>
              )}
              <ReplyThread
                replies={review.replies}
                productId={productId}
                onReplyAdded={handleReplySuccess}
                depth={0}
              />
            </div>
          )}
          
          {/* Debug info when no replies */}
          {process.env.NODE_ENV === 'development' && (!review.replies || review.replies.length === 0) && (
            <div className="mt-2 text-xs text-gray-400 bg-blue-50 p-2 rounded">
              🔍 DEBUG: No replies for review {review.id} (replies: {review.replies ? 'empty array' : 'null/undefined'})
            </div>
          )}
        </div>
      ))}

      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md 
                     hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ładowanie...
              </span>
            ) : (
              'Pokaż więcej recenzji'
            )}
          </button>
        </div>
      )}
    </div>
  );
});

ReviewList.displayName = 'ReviewList';