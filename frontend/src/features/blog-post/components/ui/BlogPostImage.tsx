'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import { BlogPostImageProps } from '../../types';
import { BlogApi } from '@/features/blog';
import { cn } from '@/lib/utils';

export const BlogPostImage = memo<BlogPostImageProps>(({
  post,
  priority = true,
  sizes = '(max-width: 768px) 100vw, 896px',
  className
}) => {
  const [imageError, setImageError] = useState(false);
  const featuredImage = BlogApi.getFeaturedImageUrl(post, 'large');
  
  console.log('🖼️ BlogPostImage Debug:');
  console.log('Post embedded:', post._embedded);
  console.log('Featured media details:', post._embedded?.['wp:featuredmedia']?.[0]);
  console.log('Available sizes:', post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes);
  console.log('Featured image URL:', featuredImage);
  
  // Try to get source_url directly as fallback
  const directUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  console.log('Direct source URL:', directUrl);
  
  // Use featuredImage or fallback to directUrl
  const imageUrl = featuredImage || directUrl;
  
  if (!imageUrl) {
    console.log('❌ No featured image found');
    return (
      <div className={cn('relative w-full h-64 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center', className)}>
        <p className="text-gray-500 text-sm">Brak obrazu wyróżnionego</p>
      </div>
    );
  }

  

  const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

  console.log('🎯 Using image URL:', imageUrl);
  console.log('📝 Alt text:', altText);

  if (imageError) {
    return (
      <div className={cn('relative w-full h-64 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center', className)}>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Błąd ładowania obrazu</p>
          <p className="text-gray-400 text-xs mt-1">URL: {imageUrl}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full rounded-2xl overflow-hidden bg-gray-100', className)}>
      <Image
        src={imageUrl}
        alt={altText}
        width={1200}
        height={600}
        sizes={sizes}
        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
        priority={priority}
        quality={90}
        onError={(e) => {
          console.error('❌ Image failed to load:', imageUrl);
          console.error('Error details:', e);
          setImageError(true);
        }}
        onLoad={() => {
          console.log('✅ Image loaded successfully:', imageUrl);
        }}
      />
    </div>
  );
});

BlogPostImage.displayName = 'BlogPostImage';