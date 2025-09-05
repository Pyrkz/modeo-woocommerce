'use client';

import { memo } from 'react';
import Link from 'next/link';
import { BlogPostNavigationProps } from '../../types';
import { cn } from '@/lib/utils';

export const BlogPostNavigation = memo<BlogPostNavigationProps>(({ 
  className
}) => {
  return (
    <nav className={cn('mt-12 pt-8 border-t border-gray-200', className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors group"
        >
          <svg 
            className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Wszystkie artykuły
        </Link>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: document.title,
                url: window.location.href,
              });
            } else {
              // Fallback - copy to clipboard
              navigator.clipboard.writeText(window.location.href);
              // You could show a toast here
            }
          }}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Udostępnij
        </button>
      </div>
    </nav>
  );
});

BlogPostNavigation.displayName = 'BlogPostNavigation';