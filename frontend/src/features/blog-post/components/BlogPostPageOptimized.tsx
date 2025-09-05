'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { BlogPost, BlogApi } from '@/features/blog';
import { useBlogPostPreload } from '../hooks/useBlogPostPreload';
import { useBlogPostSEO } from '../hooks/useBlogPostSEO';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Link from 'next/link';

// Dynamic imports for better code splitting and performance
const BlogPostHeader = dynamic(
  () => import('./sections/BlogPostHeader').then(mod => ({ default: mod.BlogPostHeader })),
  { ssr: true }
);

const BlogPostContent = dynamic(
  () => import('./sections/BlogPostContent').then(mod => ({ default: mod.BlogPostContent })),
  { 
    loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
    ssr: true
  }
);

const BlogPostNavigation = dynamic(
  () => import('./sections/BlogPostNavigation').then(mod => ({ default: mod.BlogPostNavigation })),
  { 
    loading: () => <div className="h-16 border-t border-gray-200 mt-12" />,
    ssr: false 
  }
);

interface BlogPostPageOptimizedProps {
  slug: string;
}

export const BlogPostPageOptimized = React.memo<BlogPostPageOptimizedProps>(({ slug }) => {
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Performance optimizations
  useBlogPostPreload(post, {
    preloadRelated: true,
    preloadImages: true,
    preloadNext: false
  });
  
  // SEO optimization
  useBlogPostSEO({ post });

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const postData = await BlogApi.fetchPostBySlug(slug);
      setPost(postData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd pobierania artykułu';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, fetchPost]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <LoadingSpinner size="lg" text="Ładowanie artykułu..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Artykuł nie został znaleziony</h1>
              <p className="text-gray-600 mb-6">
                {error || 'Nie można znaleźć tego artykułu. Mógł zostać przeniesiony lub usunięty.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Wszystkie artykuły
              </Link>
              
              <button
                onClick={fetchPost}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Spróbuj ponownie
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Breadcrumbs data
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.title.rendered, href: `/blog/${post.slug}`, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <BlogPostHeader post={post} />

        {/* Content Section */}
        <BlogPostContent post={post} className="mb-8" />

        {/* Navigation Section */}
        <BlogPostNavigation />
      </article>
    </div>
  );
});

BlogPostPageOptimized.displayName = 'BlogPostPageOptimized';