import { BlogPost, BlogCategory, BlogTag, BlogAuthor, BlogFilters } from '../types';
import { config } from '@/lib/config';

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export class BlogApi {
  private static buildPostsUrl(filters: BlogFilters = {}, page: number = 1, perPage: number = 6): string {
    const url = new URL(`${config.getApiUrl()}/wp-json/wp/v2/posts`);
    
    // Pagination
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('page', page.toString());
    
    // Embed related data
    url.searchParams.set('_embed', 'wp:featuredmedia,wp:term,author');
    
    // Search
    if (filters.search?.trim()) {
      url.searchParams.set('search', filters.search.trim());
    }
    
    // Categories filter
    if (filters.categories && filters.categories.length > 0) {
      url.searchParams.set('categories', filters.categories.join(','));
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      url.searchParams.set('tags', filters.tags.join(','));
    }
    
    // Author filter
    if (filters.author) {
      url.searchParams.set('author', filters.author.toString());
    }
    
    // Sorting
    const orderby = filters.sortBy || 'date';
    const order = filters.sortOrder || 'desc';
    url.searchParams.set('orderby', orderby);
    url.searchParams.set('order', order);
    
    // Only published posts
    url.searchParams.set('status', 'publish');
    
    return url.toString();
  }

  static async fetchPosts(
    filters: BlogFilters = {}, 
    page: number = 1, 
    perPage: number = 6
  ): Promise<BlogPostsResponse> {
    const url = this.buildPostsUrl(filters, page, perPage);
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    const totalHeader = response.headers.get('X-WP-Total');
    const totalPagesHeader = response.headers.get('X-WP-TotalPages');
    
    const total = totalHeader ? parseInt(totalHeader) : posts.length;
    const totalPages = totalPagesHeader ? parseInt(totalPagesHeader) : 1;
    const hasMore = posts.length >= perPage && page < totalPages;
    
    return {
      posts,
      total,
      totalPages,
      currentPage: page,
      hasMore,
    };
  }

  static async fetchCategories(): Promise<BlogCategory[]> {
    const url = `${config.getApiUrl()}/wp-json/wp/v2/categories?per_page=100&orderby=count&order=desc`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  static async fetchTags(): Promise<BlogTag[]> {
    const url = `${config.getApiUrl()}/wp-json/wp/v2/tags?per_page=100&orderby=count&order=desc`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  static async fetchAuthors(): Promise<BlogAuthor[]> {
    const url = `${config.getApiUrl()}/wp-json/wp/v2/users?per_page=50&orderby=post_count&order=desc`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  static async fetchPostBySlug(slug: string): Promise<BlogPost> {
    const url = `${config.getApiUrl()}/wp-json/wp/v2/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term,author`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    if (posts.length === 0) {
      throw new Error('Post not found');
    }
    
    return posts[0];
  }

  /**
   * Extract featured image URL from post data
   */
  static getFeaturedImageUrl(post: BlogPost, size: string = 'medium_large'): string | null {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    if (!media) return null;
    
    // Try to get specific size, fallback to source_url
    const sizeUrl = media.media_details?.sizes?.[size]?.source_url;
    return sizeUrl || media.source_url || null;
  }

  /**
   * Extract categories from post data
   */
  static getPostCategories(post: BlogPost): Array<{id: number; name: string; slug: string}> {
    const terms = post._embedded?.['wp:term'];
    if (!terms || !terms[0]) return [];
    
    return terms[0].filter(term => post.categories.includes(term.id));
  }

  /**
   * Extract tags from post data
   */
  static getPostTags(post: BlogPost): Array<{id: number; name: string; slug: string}> {
    const terms = post._embedded?.['wp:term'];
    if (!terms || !terms[1]) return [];
    
    return terms[1].filter(term => post.tags.includes(term.id));
  }

  /**
   * Extract author from post data
   */
  static getPostAuthor(post: BlogPost): {id: number; name: string; slug: string; avatar_urls: {[key: string]: string}} | null {
    return post._embedded?.author?.[0] || null;
  }

  /**
   * Clean excerpt text
   */
  static cleanExcerpt(excerpt: string): string {
    return excerpt
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\[&hellip;\]/g, '...') // Replace WordPress ellipsis
      .trim();
  }

  /**
   * Format date for display
   */
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
}