'use client';

import { memo, useState, lazy, Suspense } from 'react';
import { ReviewReply } from '../../types';

// Lazy load reply form
const ReplyForm = lazy(() => import('../forms/ReplyForm').then(module => ({ 
  default: module.ReplyForm 
})));

interface OptimizedReplyItemProps {
  reply: ReviewReply;
  productId: number;
  onReplyAdded?: () => void;
  depth?: number;
}

export const OptimizedReplyItem = memo(function OptimizedReplyItem({
  reply,
  productId,
  onReplyAdded,
  depth = 0
}: OptimizedReplyItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    onReplyAdded?.();
  };

  const handleShowReplyForm = () => {
    setShowReplyForm(true);
  };

  const handleHideReplyForm = () => {
    setShowReplyForm(false);
  };

  return (
    <div className={`relative ${depth > 0 ? 'border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="bg-gray-50 rounded-lg p-4">
        {/* Reply Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              {reply.reviewer.charAt(0).toUpperCase()}
            </div>
            
            {/* Author Info */}
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium text-gray-900 text-sm">{reply.reviewer}</h5>
                {reply.is_admin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Zespół
                  </span>
                )}
              </div>
              <time className="text-xs text-gray-500">{formatDate(reply.date_created)}</time>
            </div>
          </div>
        </div>

        {/* Reply Content */}
        <div className="mb-3">
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {reply.reply}
          </p>
        </div>

        {/* Reply Actions */}
        {depth < 2 && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <button
              onClick={handleShowReplyForm}
              className="inline-flex items-center text-xs text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Odpowiedz
            </button>
          </div>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4">
          <Suspense 
            fallback={
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <span className="text-xs text-gray-600">Ładowanie...</span>
              </div>
            }
          >
            <ReplyForm
              parentId={reply.id}
              productId={productId}
              onSuccess={handleReplySuccess}
              onCancel={handleHideReplyForm}
              placeholder="Odpowiedz na ten komentarz..."
            />
          </Suspense>
        </div>
      )}
    </div>
  );
});

OptimizedReplyItem.displayName = 'OptimizedReplyItem';