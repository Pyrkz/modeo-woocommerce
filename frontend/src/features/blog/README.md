# Blog Section - Optimized Implementation

## Overview
Highly optimized, modular blog section component built for maximum performance with Next.js and WordPress integration.

## Architecture

### 📁 Directory Structure
```
features/blog/
├── components/
│   ├── homepage/           # Homepage blog section
│   │   ├── HomepageBlogSection.tsx
│   │   ├── HomepageBlogGrid.tsx
│   │   ├── HomepageBlogCard.tsx
│   │   └── BlogSectionHeader.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── OptimizedBlogImage.tsx
│   │   ├── BlogMeta.tsx
│   │   └── BlogCategory.tsx
│   └── [existing components...]
├── hooks/                  # Performance hooks
│   └── useOptimizedBlog.ts
├── utils/                  # Utilities
│   └── dateUtils.ts
├── data/
│   └── sampleBlogData.ts
├── types/
└── index.ts
```

## Key Performance Optimizations

### 🚀 Image Optimization
- **Priority loading** for featured post (first item)
- **Responsive sizes** calculated per grid position
- **WebP/AVIF support** via Next.js Image component
- **Lazy loading** with blur placeholders
- **Error handling** with fallback UI
- **Skeleton loading** states

### 📊 Grid Performance
- **CSS Grid** with auto-rows for perfect space utilization
- **Masonry-style layout** similar to gifts section
- **Responsive breakpoints**: mobile → tablet → desktop (6-column on lg)
- **Dynamic card variants** based on position
- **Memory-efficient** renders with React.memo

### 🎯 Layout Optimization
- **Featured post** (large, 2x2 grid space)
- **Standard posts** (1x1 grid space)
- **Full-width post** (last item spans entire width)
- **Smart responsive behavior**

### ⚡ Code Splitting
- **Modular components** - import only what you need
- **Tree shaking** friendly exports
- **Lazy loading** ready
- **Bundle optimization** with proper imports

## Performance Metrics Targets

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay) 
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **Bundle size**: < 12KB gzipped
- **Render time**: < 16ms per frame (60fps)

## Usage

### Basic Implementation (Homepage)
```tsx
import { HomepageBlogSection, sampleBlogPosts, blogContent } from '@/features/blog';

export default function HomePage() {
  return (
    <HomepageBlogSection
      title={blogContent.title}
      subtitle={blogContent.subtitle}
      badgeText={blogContent.badgeText}
      posts={sampleBlogPosts}
      ctaText="Sprawdź wszystkie"
      ctaHref="/blog"
      maxPosts={5}
    />
  );
}
```

### Advanced Grid Usage
```tsx
import { HomepageBlogGrid, useOptimizedBlog } from '@/features/blog';

export default function CustomBlog({ posts }) {
  const { optimizedPosts } = useOptimizedBlog({ posts });
  
  return <HomepageBlogGrid posts={optimizedPosts} maxPosts={5} />;
}
```

### With WordPress API
```tsx
import { HomepageBlogSection, BlogApi } from '@/features/blog';

export default async function HomePage() {
  const posts = await BlogApi.getPosts({ per_page: 5 });
  
  return (
    <HomepageBlogSection
      title="Ostatnie wpisy z naszego bloga"
      subtitle="Najnowsze artykuły i poradniki"
      badgeText="Blog"
      posts={posts}
    />
  );
}
```

## Component Variants

### HomepageBlogCard Variants
- **featured**: Large card (2x2 grid), first post
- **standard**: Regular card (1x1 grid), middle posts
- **compact**: Smaller card for less important posts

### Grid Layout (5 posts)
```
┌─────────────┬───┬───┬───┐
│             │ 2 │ 3 │   │
│      1      ├───┼───┤ 4 │
│  (featured) │   │   │   │
│             │   │   │   │
├─────────────┴───┴───┴───┤
│           5             │
│      (full width)       │
└─────────────────────────┘
```

## WordPress Integration

### 🔌 **API Integration**
- **WordPress REST API** v2 integration
- **Embedded data** fetching (_embed parameter)
- **Performance optimization** with caching
- **Error handling** with graceful fallbacks

### 📊 **Data Fetching**
```typescript
// Homepage optimized fetch
const { posts, loading, error } = useHomepageBlog({ 
  maxPosts: 4,
  enableCache: true 
});

// Full blog API
const response = await BlogApi.fetchPosts(filters, page, perPage);
```

### ⚡ **Performance Features**
- **5-minute cache** for homepage posts
- **Next.js caching** with revalidation
- **Optimized API calls** (only essential fields)
- **Loading skeletons** for better UX
- **Error boundaries** with fallbacks

### 🔗 **Endpoints Used**
- `GET /wp-json/wp/v2/posts` - Blog posts
- `GET /wp-json/wp/v2/categories` - Categories
- `GET /wp-json/wp/v2/tags` - Tags
- **Embedded**: featuredmedia, terms, author

### 📱 **Real URLs**
- Posts link to: `/blog/{post.slug}`
- Categories work with existing taxonomy
- **SEO-friendly** URLs and meta data
- **Date formatting** in Polish locale

## Browser Compatibility
- **Modern browsers**: Full feature support
- **Legacy browsers**: Graceful degradation
- **Mobile**: Touch-optimized interactions
- **Safari**: GPU acceleration tested

## Accessibility Features
- **Semantic HTML** structure
- **ARIA labels** where needed
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** support