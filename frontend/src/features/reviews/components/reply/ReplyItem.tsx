'use client';

import { useState, Suspense, lazy, memo, useCallback } from 'react';
import { ReviewReply } from '../../types';

// Lazy load the reply form for better performance
const ReplyForm = lazy(() => import('../forms/ReplyForm').then(module => ({ default: module.ReplyForm })));

interface ReplyItemProps {
  reply: ReviewReply;
  productId: number;
  onReplyAdded?: () => void;
  depth?: number;
}

export const ReplyItem = memo(function ReplyItem({ 
  reply, 
  productId, 
  onReplyAdded,
  depth = 0 
}: ReplyItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }, []);

  const handleReplySuccess = useCallback(() => {
    setShowReplyForm(false);
    onReplyAdded?.();
  }, [onReplyAdded]);

  const handleToggleReplyForm = useCallback(() => {
    setShowReplyForm(prev => !prev);
  }, []);

  const handleCancelReply = useCallback(() => {
    setShowReplyForm(false);
  }, []);

  // Adjust styling based on depth
  const getBorderColor = (depth: number) => {
    const colors = ['border-blue-200', 'border-green-200', 'border-yellow-200', 'border-purple-200'];
    return colors[depth % colors.length];
  };

  const getBackgroundColor = (depth: number) => {
    const colors = ['bg-gray-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50'];
    return colors[depth % colors.length];
  };

  return (
    <div className={`p-4 ${getBackgroundColor(depth)} rounded-lg border-l-4 ${getBorderColor(depth)}`}>
      {/* Reply Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h5 className="font-medium text-gray-900">{reply.reviewer}</h5>
          
          {/* Admin Badge */}
          {reply.is_admin && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                           bg-blue-100 text-blue-800 border border-blue-200">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Administracja
            </span>
          )}
          
          {/* Verified Badge */}
          {reply.verified && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs 
                           bg-green-100 text-green-800 border border-green-200">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Zweryfikowany
            </span>
          )}
          
          {/* Depth indicator (dev mode) */}
          {process.env.NODE_ENV === 'development' && depth > 0 && (
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
              Poziom {depth + 1}
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {formatDate(reply.date_created)}
        </div>
      </div>

      {/* Reply Content */}
      <div className="prose prose-sm max-w-none mb-3">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-0">
          {reply.reply}
        </p>
      </div>

      {/* Reply Actions */}
      {depth < 3 && ( // Limit reply depth
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleReplyForm}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            {showReplyForm ? 'Anuluj' : 'Odpowiedz'}
          </button>
          
          {/* Reply count for nested replies */}
          {reply.replies && reply.replies.length > 0 && (
            <span className="text-sm text-gray-500">
              {reply.replies.length} {reply.replies.length === 1 ? 'odpowiedź' : 'odpowiedzi'}
            </span>
          )}
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4 pl-6 border-l-2 border-gray-200">
          <Suspense
            fallback={
              <div className="flex items-center gap-2 p-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Ładowanie formularza...</span>
              </div>
            }
          >
            <ReplyForm
              parentId={reply.id}
              productId={productId}
              onSuccess={handleReplySuccess}
              onCancel={handleCancelReply}
              placeholder={`Odpowiedz ${reply.reviewer}...`}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
});

ReplyItem.displayName = 'ReplyItem';