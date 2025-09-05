import { ReactElement } from 'react';
import CustomIcon from '@/components/ui/CustomIcon';

export interface CustomCategoryIconMapping {
  [key: string]: ReactElement;
}

// Custom category icon mapping using local SVG files
export const customCategoryIcons: CustomCategoryIconMapping = {
  // Main categories with custom SVG icons
  'koszulki': <CustomIcon src="/icons/Znakowanie koszulki.svg" alt="Koszulki" className="w-5 h-5" />,
  'bluzy': <CustomIcon src="/icons/Znakowanie bluzy.svg" alt="Bluzy" className="w-5 h-5" />,
  'kurtki': <CustomIcon src="/icons/Znakowanie Kurtki.svg" alt="Kurtki" className="w-5 h-5" />,
  'czapki': <CustomIcon src="/icons/Znakowanie czapki.svg" alt="Czapki" className="w-5 h-5" />,
  'softshelle': <CustomIcon src="/icons/Znakowanie Softshelle.svg" alt="Softshelle" className="w-5 h-5" />,
  'polary': <CustomIcon src="/icons/Znakowanie Polar.svg" alt="Polary" className="w-5 h-5" />,
  'plecaki-torby': <CustomIcon src="/icons/Znakowanie torby plecaki.svg" alt="Plecaki i torby" className="w-5 h-5" />,
  'akcesoria': <CustomIcon src="/icons/Znakowanie akcesoria.svg" alt="Akcesoria" className="w-5 h-5" />,
  'ubrania-sportowe': <CustomIcon src="/icons/Znakowanie ubrania sportowe.svg" alt="Ubrania sportowe" className="w-5 h-5" />,
  'ubrania-robocze': <CustomIcon src="/icons/Znakowanie ubrania robocze.svg" alt="Ubrania robocze" className="w-5 h-5" />,
  
  // For categories without specific icons, use Quality as default
  'dom-ogrod': <CustomIcon src="/icons/Quality.svg" alt="Dom i ogród" className="w-5 h-5" />,
  'okulary': <CustomIcon src="/icons/Quality.svg" alt="Okulary" className="w-5 h-5" />,
  
  // Aliases for different naming variations
  'dom i ogród': <CustomIcon src="/icons/Quality.svg" alt="Dom i ogród" className="w-5 h-5" />,
  'plecaki i torby': <CustomIcon src="/icons/Znakowanie torby plecaki.svg" alt="Plecaki i torby" className="w-5 h-5" />,
  
  // Default fallback
  'default': <CustomIcon src="/icons/Quality.svg" alt="Kategoria" className="w-5 h-5" />
};

/**
 * Get custom icon for a category based on its name or slug
 */
export const getCustomCategoryIcon = (categoryName: string, categorySlug?: string): ReactElement => {
  const name = categoryName.toLowerCase();
  const slug = categorySlug?.toLowerCase();

  // Try exact slug match first
  if (slug && customCategoryIcons[slug]) {
    return customCategoryIcons[slug];
  }

  // Try exact name match
  if (customCategoryIcons[name]) {
    return customCategoryIcons[name];
  }

  // Try partial matches for category name
  for (const key of Object.keys(customCategoryIcons)) {
    if (key !== 'default' && (name.includes(key) || key.includes(name))) {
      return customCategoryIcons[key];
    }
  }

  // Return default icon
  return customCategoryIcons['default'];
};

/**
 * List of available custom category icons for reference
 */
export const availableCustomCategoryIcons = Object.keys(customCategoryIcons).filter(key => key !== 'default');