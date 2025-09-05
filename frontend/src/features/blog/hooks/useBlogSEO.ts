'use client';

import { useEffect } from 'react';
import { BlogPost } from '../types';
import { BlogApi } from '../api/blog.api';

interface UseBlogSEOOptions {
  post?: BlogPost;
  title?: string;
  description?: string;
  canonical?: string;
}

export const useBlogSEO = (options: UseBlogSEOOptions) => {
  const { post, title, description, canonical } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set page title
    const pageTitle = post 
      ? `${post.title.rendered} | modeo. Blog`
      : title 
      ? `${title} | modeo. Blog`
      : 'Blog | modeo.';
    
    document.title = pageTitle;

    // Set meta description
    const metaDescription = post 
      ? post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...').trim().substring(0, 160)
      : description 
      ? description.substring(0, 160)
      : 'Poznaj świat odzieży i gadżetów - trendy, porady eksperckie i inspiracje dla Twojego biznesu.';

    let metaDescElement = document.querySelector('meta[name="description"]');
    if (!metaDescElement) {
      metaDescElement = document.createElement('meta');
      metaDescElement.setAttribute('name', 'description');
      document.head.appendChild(metaDescElement);
    }
    metaDescElement.setAttribute('content', metaDescription);

    // Set canonical URL
    const canonicalUrl = canonical || (post ? `${window.location.origin}/blog/${post.slug}` : window.location.href);
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonicalUrl);

    // Set Open Graph tags for social sharing
    if (post) {
      const featuredImage = BlogApi.getFeaturedImageUrl(post, 'large');
      
      // OG Title
      let ogTitleElement = document.querySelector('meta[property="og:title"]');
      if (!ogTitleElement) {
        ogTitleElement = document.createElement('meta');
        ogTitleElement.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitleElement);
      }
      ogTitleElement.setAttribute('content', post.title.rendered);

      // OG Description
      let ogDescElement = document.querySelector('meta[property="og:description"]');
      if (!ogDescElement) {
        ogDescElement = document.createElement('meta');
        ogDescElement.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescElement);
      }
      ogDescElement.setAttribute('content', metaDescription);

      // OG Image
      if (featuredImage) {
        let ogImageElement = document.querySelector('meta[property="og:image"]');
        if (!ogImageElement) {
          ogImageElement = document.createElement('meta');
          ogImageElement.setAttribute('property', 'og:image');
          document.head.appendChild(ogImageElement);
        }
        ogImageElement.setAttribute('content', featuredImage);
      }

      // OG URL
      let ogUrlElement = document.querySelector('meta[property="og:url"]');
      if (!ogUrlElement) {
        ogUrlElement = document.createElement('meta');
        ogUrlElement.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrlElement);
      }
      ogUrlElement.setAttribute('content', canonicalUrl);
    }

    // Cleanup function to reset title on unmount
    return () => {
      document.title = 'modeo.';
    };
  }, [post, title, description, canonical]);

  return {
    // SEO utilities
    formatTitle: (postTitle: string) => `${postTitle} | modeo. Blog`,
    formatDescription: (excerpt: string) => excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    getCanonicalUrl: (slug: string) => `${window.location.origin}/blog/${slug}`
  };
};