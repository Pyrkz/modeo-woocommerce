export interface EmbroideryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'logo' | 'text' | 'decorative' | 'complex';
  width?: number;
  height?: number;
}

export interface EmbroideryCategory {
  id: string;
  name: string;
  description: string;
  images: EmbroideryImage[];
}

export interface EmbroideryGalleryProps {
  images?: EmbroideryImage[];
  categories?: EmbroideryCategory[];
  showCategories?: boolean;
  gridCols?: 2 | 3 | 4;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}