// Re-export the modular ZnakowanieGallery component
"use client";

// Import the modular, optimized component from the znakowanie feature
import { ZnakowanieGallery } from '@/features/znakowanie';

// Re-export as default for backward compatibility
export default function InstagramZnakowanieGallery() {
  return <ZnakowanieGallery />;
}