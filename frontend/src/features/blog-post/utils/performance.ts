

/**
 * Calculate estimated reading time for a blog post
 * @param content - HTML content of the post
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 */
export const calculateReadingTime = (content: string, wordsPerMinute = 200): number => {
  if (!content) return 0;
  
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.trim().split(/\s+/).length;
  
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Extract plain text from HTML content for meta descriptions
 * @param html - HTML content
 * @param maxLength - Maximum length of extracted text
 */
export const extractPlainText = (html: string, maxLength = 160): string => {
  if (!html) return '';
  
  const plainText = html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
    
  return plainText.length > maxLength 
    ? `${plainText.slice(0, maxLength)}...`
    : plainText;
};

/**
 * Preload critical blog post resources
 * @param slug - Post slug to preload
 */
export const preloadBlogPost = (slug: string): void => {
  if (typeof window === 'undefined') return;
  
  // Preload blog post API endpoint
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = `/api/blog/${slug}`;
  document.head.appendChild(link);
};

/**
 * Preload related posts
 * @param categoryIds - Category IDs for related posts
 */
export const preloadRelatedPosts = (categoryIds: number[]): void => {
  if (typeof window === 'undefined' || !categoryIds.length) return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = `/api/blog?categories=${categoryIds.join(',')}`;
  document.head.appendChild(link);
};

/**
 * Preload blog post image
 * @param imageUrl - Image URL to preload
 */
export const preloadImage = (imageUrl: string): void => {
  if (typeof window === 'undefined' || !imageUrl) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  document.head.appendChild(link);
};

/**
 * Optimize image URL for different screen sizes
 * @param imageUrl - Original image URL
 * @param size - Requested size
 */
export const getOptimizedImageUrl = (
  imageUrl: string
): string => {
  if (!imageUrl) return '';
  
  // For now, just return the original URL since WordPress API should already provide optimized URLs
  // The BlogApi.getFeaturedImageUrl already handles size selection from WordPress media_details
  return imageUrl;
};

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Smooth scroll to element
 * @param elementId - ID of element to scroll to
 * @param offset - Offset from element (default: 80px for fixed header)
 */
export const smoothScrollTo = (elementId: string, offset = 80): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.offsetTop - offset;
  
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
};