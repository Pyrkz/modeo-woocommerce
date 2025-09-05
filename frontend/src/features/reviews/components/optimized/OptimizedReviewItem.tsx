'use client';

import { memo, useState, lazy, Suspense } from 'react';
import { Review } from '../../types';
import { StarRating } from '../StarRating';
import { OptimizedReplyThread } from './OptimizedReplyThread';

// Lazy load reply form for better performance
const ReplyForm = lazy(() => import('../forms/ReplyForm').then(module => ({ 
  default: module.ReplyForm 
})));

interface OptimizedReviewItemProps {
  review: Review;
  productId: number;
  onInteraction: () => void;
}

export const OptimizedReviewItem = memo(function OptimizedReviewItem({
  review,
  productId,
  onInteraction
}: OptimizedReviewItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    onInteraction();
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleHideReplyForm = () => {
    setShowReplyForm(false);
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300">
      {/* Review Header */}
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {review.reviewer.charAt(0).toUpperCase()}
          </div>
          
          {/* Author Info */}
          <div>
            <h4 className="font-medium text-gray-900">{review.reviewer}</h4>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} readonly size="sm" />
              <span className="text-sm text-gray-500">
                {formatDate(review.date_created)}
              </span>
              {review.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Zweryfikowany zakup
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {review.review}
        </p>
      </div>

      {/* Review Actions */}
      <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleShowReplyForm}
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Odpowiedz
          </button>
          
          {review.replies && review.replies.length > 0 && (
            <span className="text-sm text-gray-500">
              {review.replies.length} odpowied{review.replies.length === 1 ? 'ź' : 'zi'}
            </span>
          )}
        </div>
      </footer>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-6 pt-6 border-t border-gray-200">
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
              onCancel={handleHideReplyForm}
              placeholder="Napisz odpowiedź na tę opinię..."
            />
          </Suspense>
        </div>
      )}

      {/* Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <OptimizedReplyThread
            replies={review.replies}
            productId={productId}
            onReplyAdded={onInteraction}
            depth={0}
          />
        </div>
      )}
    </article>
  );
});

OptimizedReviewItem.displayName = 'OptimizedReviewItem';