'use client';

import { useEffect } from 'react';
import { BlogPost } from '@/features/blog/types';
import { extractPlainText } from '../utils/performance';

interface UseBlogPostSEOProps {
  post: BlogPost | null;
}

/**
 * Hook for optimizing SEO metadata for blog posts
 * @param post - Current blog post
 */
export const useBlogPostSEO = ({ post }: UseBlogPostSEOProps) => {
  useEffect(() => {
    if (!post || typeof window === 'undefined') return;

    // Update document title
    const title = `${post.title.rendered} | Modeo Blog`;
    document.title = title;

    // Update meta description
    const description = extractPlainText(post.excerpt?.rendered || post.content.rendered);
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Open Graph metadata
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', post.title.rendered);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:type', 'article');
    updateOrCreateMeta('og:url', `${window.location.origin}/blog/${post.slug}`);

    // Featured image for Open Graph
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      updateOrCreateMeta('og:image', post._embedded['wp:featuredmedia'][0].source_url);
    }

    // Article metadata
    updateOrCreateMeta('article:published_time', post.date);
    updateOrCreateMeta('article:modified_time', post.modified);
    
    if (post._embedded?.author?.[0]?.name) {
      updateOrCreateMeta('article:author', post._embedded.author[0].name);
    }

    // Categories
    if (post._embedded?.['wp:term']?.[0]) {
      const categories = post._embedded['wp:term'][0].map(cat => cat.name).join(', ');
      updateOrCreateMeta('article:section', categories);
    }

    // Twitter Card metadata
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', post.title.rendered);
    updateOrCreateTwitterMeta('twitter:description', description);
    
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      updateOrCreateTwitterMeta('twitter:image', post._embedded['wp:featuredmedia'][0].source_url);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/blog/${post.slug}`);

    // Cleanup function
    return () => {
      // Reset document title when component unmounts
      document.title = 'Modeo.pl - Personalizowane koszulki, bluzy i gadżety z nadrukiem';
    };
  }, [post]);
};