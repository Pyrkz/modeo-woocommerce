'use client';

import { memo, useEffect } from 'react';
import { ReviewReply } from '../../types';
import { ReplyItem } from './ReplyItem';

interface ReplyThreadProps {
  replies: ReviewReply[];
  productId: number;
  onReplyAdded?: () => void;
  depth?: number;
}

export const ReplyThread = memo(function ReplyThread({ 
  replies, 
  productId, 
  onReplyAdded, 
  depth = 0 
}: ReplyThreadProps) {
  // Limit depth to prevent infinite nesting (max 3 levels)
  const maxDepth = 3;
  
  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && replies.length > 0) {
      console.log(`[ReplyThread] Depth ${depth}: ${replies.length} replies`);
    }
  }, [replies, depth]);
  
  if (depth > maxDepth) {
    return null;
  }

  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <div key={`reply-${reply.id}-depth-${depth}`}>
          <ReplyItem
            reply={reply}
            productId={productId}
            onReplyAdded={onReplyAdded}
            depth={depth}
          />
          
          {/* Render nested replies recursively */}
          {reply.replies && reply.replies.length > 0 && (
            <div className={`mt-4 ${depth < 2 ? 'ml-8' : 'ml-4'}`}>
              <ReplyThread
                replies={reply.replies}
                productId={productId}
                onReplyAdded={onReplyAdded}
                depth={depth + 1}
              />
            </div>
          )}
        </div>
      ))}
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && replies.length > 0 && (
        <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded mt-2">
          🔄 ReplyThread: {replies.length} replies at depth {depth}
        </div>
      )}
    </div>
  );
});

ReplyThread.displayName = 'ReplyThread';