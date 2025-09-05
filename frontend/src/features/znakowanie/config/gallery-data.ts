// Gallery data configuration for Znakowanie realizacje
import { GalleryItem } from '../types/gallery';

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  { id: 1, image: '/znakowanie-realizacje/Znakowanie Agri Max Power X2.jpg', alt: 'Znakowanie Agri Max Power X2' },
  { id: 2, image: '/znakowanie-realizacje/Znakowanie ASZ Koszykówka.jpg', alt: 'Znakowanie ASZ Koszykówka' },
  { id: 3, image: '/znakowanie-realizacje/Znakowanie Bocar.jpg', alt: 'Znakowanie Bocar' },
  { id: 4, image: '/znakowanie-realizacje/Znakowanie Czenstochovia.jpg', alt: 'Znakowanie Czenstochovia' },
  { id: 5, image: '/znakowanie-realizacje/Znakowanie FSR Polska.jpg', alt: 'Znakowanie FSR Polska' },
  { id: 6, image: '/znakowanie-realizacje/Znakowanie Gmina Dąbrowa zielona.jpg', alt: 'Znakowanie Gmina Dąbrowa Zielona' },
  { id: 7, image: '/znakowanie-realizacje/Znakowanie Grom Poczesna.jpg', alt: 'Znakowanie Grom Poczesna' },
  { id: 8, image: '/znakowanie-realizacje/Znakowanie Grupa Lak.jpg', alt: 'Znakowanie Grupa Lak' },
  { id: 9, image: '/znakowanie-realizacje/Znakowanie Guide.jpg', alt: 'Znakowanie Guide' },
  { id: 10, image: '/znakowanie-realizacje/Znakowanie Kamyk harcerskielato.jpg', alt: 'Znakowanie Kamyk Harcerskie Lato' },
  { id: 11, image: '/znakowanie-realizacje/Znakowanie KGW Podlesie.jpg', alt: 'Znakowanie KGW Podlesie' },
  { id: 12, image: '/znakowanie-realizacje/Znakowanie Koło gospodyn wiejski rzeki.jpg', alt: 'Znakowanie Koło Gospodyn Wiejskich Rzeki' },
  { id: 13, image: '/znakowanie-realizacje/Znakowanie M-Volley.jpg', alt: 'Znakowanie M-Volley' },
  { id: 14, image: '/znakowanie-realizacje/Znakowanie Olympio Gymnastics.jpg', alt: 'Znakowanie Olympio Gymnastics' },
  { id: 15, image: '/znakowanie-realizacje/Znakowanie Oxygen.jpg', alt: 'Znakowanie Oxygen' },
  { id: 16, image: '/znakowanie-realizacje/Znakowanie Raków 2.jpg', alt: 'Znakowanie Raków 2' },
  { id: 17, image: '/znakowanie-realizacje/Znakowanie Raków.jpg', alt: 'Znakowanie Raków' },
  { id: 18, image: '/znakowanie-realizacje/Znakowanie TraVertyn.jpg', alt: 'Znakowanie TraVertyn' },
  { id: 19, image: '/znakowanie-realizacje/Znakowanie Zaczarowany Las.jpg', alt: 'Znakowanie Zaczarowany Las' },
  { id: 20, image: '/znakowanie-realizacje/Znakowanie Zryw Przymiechy.jpg', alt: 'Znakowanie Zryw Przymiechy' }
] as const;

// Performance configurations
export const GALLERY_CONFIG = {
  AUTOPLAY_INTERVAL: 3500,
  TRANSITION_DURATION: 0.4,
  SLIDE_TRANSITION: 0.3,
  STAGGER_DELAY: 0.2,
  PRELOAD_COUNT: 2,
  THUMBNAIL_QUALITY: 75,
  MAIN_IMAGE_QUALITY: 85,
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_MARGIN: '-50px 0px'
} as const;

// Animation easing curve optimized for smooth performance
export const PREMIUM_EASING = [0.16, 1, 0.3, 1];