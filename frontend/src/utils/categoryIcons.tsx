import { ReactElement } from 'react';
import { 
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  HomeModernIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  HeartIcon,
  SparklesIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  CameraIcon,
  GiftIcon,
  BeakerIcon,
  PaintBrushIcon,
  CogIcon,
  ArchiveBoxIcon,
  StarIcon,
  TagIcon,
  SunIcon,
  EyeIcon,
  FireIcon,
  HandRaisedIcon,
  CalendarDaysIcon,
  FaceSmileIcon,
  BuildingStorefrontIcon,
  BoltIcon,
  RectangleStackIcon,
  CubeIcon,
  ScissorsIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
  HomeIcon
} from '@heroicons/react/24/outline';

export interface CategoryIconMapping {
  [key: string]: ReactElement;
}

// Category icon mapping based on actual store categories
// Keys should be lowercase category names or slugs
export const categoryIcons: CategoryIconMapping = {
  // Existing categories - updated with better matches
  'akcesoria': <SparklesIcon className="w-4 h-4" />,
  'akcesoria do sprzątania': <WrenchScrewdriverIcon className="w-4 h-4" />,
  'akcesoria kuchenne': <CubeIcon className="w-4 h-4" />,
  'bluzy': <UserIcon className="w-4 h-4" />,
  'boże narodzenie': <GiftIcon className="w-4 h-4" />,
  'czapki': <UserIcon className="w-4 h-4" />,
  'czapki z daszkiem': <UserIcon className="w-4 h-4" />,
  'dom i ogród': <HomeModernIcon className="w-4 h-4" />,
  'dziecko': <FaceSmileIcon className="w-4 h-4" />,
  'kapibary': <HeartIcon className="w-4 h-4" />,
  'koce': <RectangleStackIcon className="w-4 h-4" />,
  'koszulki': <UserIcon className="w-4 h-4" />,
  'kubki': <BeakerIcon className="w-4 h-4" />,
  'kuchnia': <FireIcon className="w-4 h-4" />,
  'narzędzia i akcesoria': <WrenchScrewdriverIcon className="w-4 h-4" />,
  'narzuty': <RectangleStackIcon className="w-4 h-4" />,
  'okulary': <EyeIcon className="w-4 h-4" />,
  'organizacja przestrzeni': <Squares2X2Icon className="w-4 h-4" />,
  'personalizowane': <PaintBrushIcon className="w-4 h-4" />,
  'pieluchy': <FaceSmileIcon className="w-4 h-4" />,
  'polo': <UserIcon className="w-4 h-4" />,
  'pościele': <HomeIcon className="w-4 h-4" />,
  'prześcieradła': <HomeIcon className="w-4 h-4" />,
  'rękawiczki': <HandRaisedIcon className="w-4 h-4" />,
  'rękawiczki ogrodowe': <HandRaisedIcon className="w-4 h-4" />,
  'standard': <StarIcon className="w-4 h-4" />,
  'święta i okazje': <CalendarDaysIcon className="w-4 h-4" />,
  'sypialnia': <HomeIcon className="w-4 h-4" />,
  'tendy': <FireIcon className="w-4 h-4" />,
  'torba zakupowa': <ShoppingBagIcon className="w-4 h-4" />,
  'uncategorized': <TagIcon className="w-4 h-4" />,
  'wentylatory': <BoltIcon className="w-4 h-4" />,
  'wyposażenie': <CubeIcon className="w-4 h-4" />,
  'zasłony': <ScissorsIcon className="w-4 h-4" />,

  // Additional common e-commerce categories for future use
  'elektronika': <DevicePhoneMobileIcon className="w-4 h-4" />,
  'telefony': <DevicePhoneMobileIcon className="w-4 h-4" />,
  'komputery': <ComputerDesktopIcon className="w-4 h-4" />,
  'laptopy': <ComputerDesktopIcon className="w-4 h-4" />,
  'kamery': <CameraIcon className="w-4 h-4" />,
  'audio': <MusicalNoteIcon className="w-4 h-4" />,
  'tv': <ComputerDesktopIcon className="w-4 h-4" />,
  'gaming': <PuzzlePieceIcon className="w-4 h-4" />,
  'odzież': <UserIcon className="w-4 h-4" />,
  'ubrania': <UserIcon className="w-4 h-4" />,
  'moda': <SparklesIcon className="w-4 h-4" />,
  'buty': <UserIcon className="w-4 h-4" />,
  'dom': <HomeModernIcon className="w-4 h-4" />,
  'ogród': <SunIcon className="w-4 h-4" />,
  'meble': <CubeIcon className="w-4 h-4" />,
  'dekoracje': <PaintBrushIcon className="w-4 h-4" />,
  'zdrowie': <HeartIcon className="w-4 h-4" />,
  'uroda': <SparklesIcon className="w-4 h-4" />,
  'kosmetyki': <BeakerIcon className="w-4 h-4" />,
  'perfumy': <BeakerIcon className="w-4 h-4" />,
  'książki': <BookOpenIcon className="w-4 h-4" />,
  'muzyka': <MusicalNoteIcon className="w-4 h-4" />,
  'filmy': <CameraIcon className="w-4 h-4" />,
  'sport': <StarIcon className="w-4 h-4" />,
  'fitness': <StarIcon className="w-4 h-4" />,
  'turystyka': <ArchiveBoxIcon className="w-4 h-4" />,
  'narzędzia': <WrenchScrewdriverIcon className="w-4 h-4" />,
  'motoryzacja': <CogIcon className="w-4 h-4" />,
  'auto': <CogIcon className="w-4 h-4" />,
  'prezenty': <GiftIcon className="w-4 h-4" />,
  'zabawki': <GiftIcon className="w-4 h-4" />,
  'artykuły biurowe': <ArchiveBoxIcon className="w-4 h-4" />,
  'sklep': <BuildingStorefrontIcon className="w-4 h-4" />,

  // Default fallback
  'default': <TagIcon className="w-4 h-4" />
};

/**
 * Get icon for a category based on its name or slug
 */
export const getCategoryIcon = (categoryName: string, categorySlug?: string): ReactElement => {
  const name = categoryName.toLowerCase();
  const slug = categorySlug?.toLowerCase();

  // Try exact match first
  if (categoryIcons[name]) {
    return categoryIcons[name];
  }

  // Try slug match
  if (slug && categoryIcons[slug]) {
    return categoryIcons[slug];
  }

  // Try partial matches for category name
  for (const key of Object.keys(categoryIcons)) {
    if (key !== 'default' && (name.includes(key) || key.includes(name))) {
      return categoryIcons[key];
    }
  }

  // Return default icon
  return categoryIcons['default'];
};

/**
 * List of available category icons for reference
 */
export const availableCategoryIcons = Object.keys(categoryIcons).filter(key => key !== 'default');