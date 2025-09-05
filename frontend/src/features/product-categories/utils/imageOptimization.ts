/**
 * Generate optimized blur placeholder for images
 */
export function generateImagePlaceholder(width: number, height: number, color = '#f3f4f6'): string {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>`
  )}`;
}

/**
 * Get responsive image sizes based on category size
 */
export function getCategorySizes(size?: 'small' | 'medium' | 'large'): string {
  switch (size) {
    case 'large':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw';
    case 'small':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw';
    case 'medium':
    default:
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
}

/**
 * Preload critical images for performance
 */
export function preloadCriticalImages(imageUrls: string[]): void {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
}