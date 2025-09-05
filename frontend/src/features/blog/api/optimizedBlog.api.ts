import { BlogApi } from './blog.api';
import { BlogPost, BlogFilters } from '../types';
import { config } from '@/lib/config';

// Next.js cache configuration
const CACHE_CONFIG = {
  next: { 
    revalidate: 300, // 5 minutes
    tags: ['blog-posts', 'homepage-blog'] 
  }
};

export class OptimizedBlogApi {
  // Optimized method for homepage - gets only essential data
  static async getHomepagePosts(count: number = 4): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${config.getApiUrl()}/wp-json/wp/v2/posts?per_page=${count}&_embed=wp:featuredmedia,wp:term&orderby=date&order=desc&status=publish`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          ...CACHE_CONFIG
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching homepage blog posts:', error);
      // Return empty array on error - component will handle gracefully
      return [];
    }
  }

  // Preload critical blog data for better UX
  static async preloadCriticalData(): Promise<void> {
    try {
      // Preload first 4 posts for homepage
      await this.getHomepagePosts(4);
    } catch (error) {
      console.error('Error preloading blog data:', error);
    }
  }

  // Server-side optimized fetch for static generation
  static async getStaticHomepagePosts(count: number = 4): Promise<BlogPost[]> {
    try {
      const filters: BlogFilters = {
        sortBy: 'date',
        sortOrder: 'desc'
      };

      const response = await BlogApi.fetchPosts(filters, 1, count);
      return response.posts;
    } catch (error) {
      console.error('Error fetching static blog posts:', error);
      return [];
    }
  }
}