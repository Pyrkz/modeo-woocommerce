'use client';

import { memo } from 'react';
import { ReviewReply } from '../../types';
import { OptimizedReplyItem } from './OptimizedReplyItem';

interface OptimizedReplyThreadProps {
  replies: ReviewReply[];
  productId: number;
  onReplyAdded?: () => void;
  depth?: number;
}

export const OptimizedReplyThread = memo(function OptimizedReplyThread({ 
  replies, 
  productId, 
  onReplyAdded, 
  depth = 0 
}: OptimizedReplyThreadProps) {
  const maxDepth = 3;
  
  if (depth > maxDepth) {
    return null;
  }

  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <div key={`reply-${reply.id}`}>
          <OptimizedReplyItem
            reply={reply}
            productId={productId}
            onReplyAdded={onReplyAdded}
            depth={depth}
          />
          
          {/* Nested replies */}
          {reply.replies && reply.replies.length > 0 && (
            <div className={`mt-4 ${depth < 2 ? 'ml-8' : 'ml-4'}`}>
              <OptimizedReplyThread
                replies={reply.replies}
                productId={productId}
                onReplyAdded={onReplyAdded}
                depth={depth + 1}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

OptimizedReplyThread.displayName = 'OptimizedReplyThread';