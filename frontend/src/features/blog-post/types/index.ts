import { BlogPost } from '@/features/blog/types';

export interface BlogPostPageProps {
  slug: string;
}

export interface BlogPostHeaderProps {
  post: BlogPost;
  className?: string;
}

export interface BlogPostContentProps {
  post: BlogPost;
  className?: string;
}

export interface BlogPostMetaProps {
  post: BlogPost;
  showAuthor?: boolean;
  showDate?: boolean;
  showReadTime?: boolean;
  className?: string;
}

export interface BlogPostImageProps {
  post: BlogPost;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export interface BlogPostCategoriesProps {
  post: BlogPost;
  linkable?: boolean;
  className?: string;
}

export interface BlogPostNavigationProps {
  className?: string;
}

export interface BlogPostSidebarProps {
  currentPost: BlogPost;
  className?: string;
}

export interface BlogPostRelatedProps {
  currentPost: BlogPost;
  maxPosts?: number;
  className?: string;
}

export interface BlogPostPreloadOptions {
  preloadRelated?: boolean;
  preloadImages?: boolean;
  preloadNext?: boolean;
}