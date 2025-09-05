'use client';

import { memo } from 'react';
import { BlogSectionProps } from '../../types';
import { BlogSectionHeader } from './BlogSectionHeader';
import { FeaturedBlogCard } from './FeaturedBlogCard';
import { BlogListCard } from './BlogListCard';
import { BlogLoadingSkeleton } from '../ui/BlogLoadingSkeleton';

const HomepageBlogSection = memo(({ 
  title, 
  subtitle, 
  badgeText, 
  posts,
  ctaText,
  ctaHref,
  maxPosts = 4,
  loading = false,
  error = null,
  className = '' 
}: BlogSectionProps) => {
  // Don't render if no posts and not loading
  if (!loading && (!posts.length || error)) return null;

  const featuredPost = posts[0];
  const sidebarPosts = posts.slice(1, maxPosts);

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogSectionHeader 
          badgeText={badgeText}
          title={title}
          subtitle={subtitle}
          ctaText={ctaText}
          ctaHref={ctaHref}
        />
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Featured Post - Left Side */}
          <div className="lg:pr-6">
            {loading ? (
              <BlogLoadingSkeleton variant="featured" />
            ) : (
              <FeaturedBlogCard 
                post={featuredPost}
                priority={true}
              />
            )}
          </div>

          {/* Posts List - Right Side */}
          <div className="flex flex-col h-full justify-between space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <BlogLoadingSkeleton 
                  key={index}
                  variant="list"
                  className="flex-1"
                />
              ))
            ) : (
              sidebarPosts.map((post, index) => (
                <BlogListCard
                  key={post.id}
                  post={post}
                  priority={index === 0}
                  className="flex-1"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

HomepageBlogSection.displayName = 'HomepageBlogSection';

export { HomepageBlogSection };