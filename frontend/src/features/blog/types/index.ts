export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        sizes: {
          [key: string]: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  parent: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls: {
    [key: string]: string;
  };
}

export interface BlogFilters {
  categories?: number[];
  tags?: number[];
  author?: number;
  search?: string;
  sortBy?: 'date' | 'title' | 'modified';
  sortOrder?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
}

export interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  authors: BlogAuthor[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  filters: BlogFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasMore: boolean;
    perPage: number;
  };
}

export interface UseBlogReturn extends BlogState {
  loadPosts: (filters?: BlogFilters, page?: number, append?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  updateFilters: (newFilters: Partial<BlogFilters>) => void;
  resetFilters: () => void;
  loadCategories: () => Promise<void>;
  loadTags: () => Promise<void>;
}

export interface BlogCardProps {
  post: BlogPost;
  size?: 'sm' | 'md' | 'lg';
  showExcerpt?: boolean;
  showCategory?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  className?: string;
  onClick?: (post: BlogPost) => void;
}

export interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  onPostClick?: (post: BlogPost) => void;
  className?: string;
  cardSize?: 'sm' | 'md' | 'lg';
  showExcerpt?: boolean;
  showCategory?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
}

export interface BlogLayoutProps extends UseBlogReturn {
  showHeader?: boolean;
  showSidebar?: boolean;
}

// Homepage blog section types
export interface BlogSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  posts: BlogPost[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  maxPosts?: number;
  loading?: boolean;
  error?: string | null;
}

export interface BlogHeaderProps {
  badgeText: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface HomepageBlogCardProps {
  post: BlogPost;
  variant?: 'featured' | 'standard' | 'compact';
  className?: string;
  priority?: boolean;
}