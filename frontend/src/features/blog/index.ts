// Hooks
export { useBlog } from './hooks/useBlog';
export { useBlogSEO } from './hooks/useBlogSEO';
export { useOptimizedBlog } from './hooks/useOptimizedBlog';
export { useHomepageBlog } from './hooks/useHomepageBlog';

// Components
export { 
  BlogCard,
  BlogGrid,
  OptimizedBlogGrid,
  BlogHeader,
  BlogLayout,
  BlogSidebar
} from './components';

// Homepage Components
export { 
  HomepageBlogSection,
  HomepageBlogGrid,
  HomepageBlogCard,
  FeaturedBlogCard,
  BlogListCard,
  BlogSectionHeader
} from './components/homepage';

// UI Components
export {
  OptimizedBlogImage,
  BlogMeta,
  BlogCategory as BlogCategoryComponent,
  BlogLoadingSkeleton
} from './components/ui';

// Utils
export { formatDate, formatDateTime, getRelativeTime } from './utils';

// Data
export { sampleBlogPosts, blogContent } from './data/sampleBlogData';

// API
export { BlogApi } from './api/blog.api';
export { OptimizedBlogApi } from './api/optimizedBlog.api';

// Types
export type { 
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  BlogFilters,
  BlogState,
  UseBlogReturn,
  BlogCardProps,
  BlogGridProps,
  BlogLayoutProps,
  BlogSectionProps,
  BlogHeaderProps,
  HomepageBlogCardProps
} from './types';