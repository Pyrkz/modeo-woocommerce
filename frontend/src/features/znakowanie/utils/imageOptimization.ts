/**
 * Image optimization utilities for znakowanie section
 */

// Base64 placeholder for better loading experience
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Placeholder image URLs for development
export const placeholderImages = {
  sitodruk: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=600&fit=crop&auto=format',
  dtf: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format',
  haft: 'https://images.unsplash.com/photo-1544454080-b3f7ad90c65d?w=800&h=600&fit=crop&auto=format',
  dtg: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&auto=format',
  termotransfer: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop&auto=format',
  grawerowanie: 'https://images.unsplash.com/photo-1516975274851-ef0f617dc867?w=800&h=600&fit=crop&auto=format'
};

// Image preloading for better UX
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload all slider images
export const preloadSliderImages = async (images: string[]): Promise<void> => {
  try {
    await Promise.all(images.map(preloadImage));
  } catch (error) {
    console.warn('Failed to preload some images:', error);
  }
};