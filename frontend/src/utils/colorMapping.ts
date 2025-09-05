// Shared color mapping utility for product variants and filters
// This ensures consistent color representation across the entire application

// Enhanced color palette with more accurate Polish color mappings
const COLOR_PALETTE: Record<string, string> = {
  // Podstawowe kolory
  'bialy': '#FFFFFF',
  'czarny': '#000000',
  'czerwony': '#DC2626',
  'granatowy': '#1E3A8A',
  'niebieski': '#2563EB',
  'chabrowy': '#3B82F6',
  'zielony': '#16A34A',
  'zielen-butelkowa': '#14532D',
  
  // Odcienie szarości
  'szary': '#6B7280',
  'ciemnoszary-melanz': '#374151',
  'jasnoszary-melanz': '#9CA3AF',
  
  // Ciepłe kolory
  'brazowy': '#92400E',
  'bezowy': '#D2B48C',
  'zolty': '#EAB308',
  'pomaranczowy': '#EA580C',
  
  // Pastelowe i delikatne
  'rozowy': '#EC4899',
  'fioletowy': '#7C3AED',
  
  // Metaliczne
  'srebrny': '#C0C0C0',
  'zloty': '#FFD700',
  
  // Specjalne
  'bezbarwny': '#F8FAFC',
  'wielokolorowy': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)'
};

// Comprehensive Polish color name mappings with variations
const INTELLIGENT_COLOR_MAPPINGS: Record<string, string> = {
  // Czerwone odcienie
  'czerwony': '#DC2626',
  'czerwien': '#DC2626',
  'bordowy': '#7F1D1D',
  'winny': '#881337',
  'koralowy': '#F87171',
  'karminowy': '#BE123C',
  'ceglasty': '#DC2626',
  'rdzawy': '#B45309',
  
  // Niebieskie odcienie
  'niebieski': '#2563EB',
  'granatowy': '#1E3A8A',
  'chabrowy': '#3B82F6',
  'turkusowy': '#06B6D4',
  'morski': '#0E7490',
  'pruski': '#1E40AF',
  'lazurowy': '#0EA5E9',
  'kobaltowy': '#1D4ED8',
  
  // Zielone odcienie
  'zielony': '#16A34A',
  'zielen': '#16A34A',
  'limonkowy': '#65A30D',
  'oliwkowy': '#365314',
  'butelkowy': '#14532D',
  'miętowy': '#10B981',
  'khaki': '#84CC16',
  'sosnowy': '#14532D',
  'jodlowy': '#1F2937',
  
  // Żółte odcienie
  'zolty': '#EAB308',
  'żółty': '#EAB308',
  'zółty': '#EAB308',
  'zolt': '#EAB308',
  'żółt': '#EAB308',
  'zolc': '#EAB308',
  'żółć': '#EAB308',
  'zolte': '#EAB308',
  'żółte': '#EAB308',
  'yellow': '#EAB308',
  'cytrynowy': '#FDE047',
  'sloneczny': '#F59E0B',
  'słoneczny': '#F59E0B',
  'kanarkowy': '#FBBF24',
  
  // Pomarańczowe odcienie
  'pomaranczowy': '#EA580C',
  'pomarańczowy': '#EA580C',
  'pomarancz': '#EA580C',
  'pomarańcz': '#EA580C',
  'mandarynkowy': '#FB923C',
  'brzoskwiniowy': '#FDBA74',
  'morelowy': '#FED7AA',
  
  // Fioletowe odcienie
  'fioletowy': '#7C3AED',
  'fiolet': '#7C3AED',
  'lawendowy': '#A78BFA',
  'śliwkowy': '#6B21A8',
  'sliwkowy': '#6B21A8',
  'purpurowy': '#A21CAF',
  'liliowy': '#C084FC',
  'ametystowy': '#8B5CF6',
  
  // Różowe odcienie
  'rozowy': '#EC4899',
  'różowy': '#EC4899',
  'roz': '#EC4899',
  'róż': '#EC4899',
  'fuksja': '#E11D48',
  'magenta': '#DB2777',
  'pudrowy': '#F9A8D4',
  'łososiowy': '#FCA5A5',
  'lososiowy': '#FCA5A5',
  
  // Brązowe odcienie
  'brązowy': '#92400E',
  'braz': '#92400E',
  'brąz': '#92400E',
  'kawowy': '#78350F',
  'czekoladowy': '#78350F',
  'kasztanowy': '#A16207',
  'bezowy': '#D2B48C',
  'beżowy': '#D2B48C',
  'bez': '#D2B48C',
  'beż': '#D2B48C',
  'piaskowy': '#FDE68A',
  'karmelowy': '#D97706',
  'toffi': '#92400E',
  
  // Szare odcienie
  'szary': '#6B7280',
  'siwy': '#6B7280',
  'grafitowy': '#374151',
  'antracytowy': '#1F2937',
  'popolowy': '#9CA3AF',
  'popołowy': '#9CA3AF',
  'perłowy': '#E5E7EB',
  'perlowy': '#E5E7EB',
  'stalowy': '#64748B',
  'platynowy': '#F1F5F9',
  'melanz': '#6B7280',
  'melanż': '#6B7280',
  
  // Białe odcienie
  'bialy': '#FFFFFF',
  'biały': '#FFFFFF',
  'biał': '#FFFFFF',
  'śnieżnobiały': '#FEFEFE',
  'sniezniobialy': '#FEFEFE',
  'kremowy': '#FEF3C7',
  'kośćsloniowej': '#FEF7ED',
  'koscsloniowej': '#FEF7ED',
  'ecru': '#F5F5DC',
  'mleczny': '#FFFEF7',
  
  // Czarne odcienie
  'czarny': '#000000',
  'czerń': '#000000',
  'czern': '#000000',
  'ebonowy': '#0F172A',
  'węglowy': '#111827',
  'weglowy': '#111827',
  
  // Metaliczne  
  'srebrny': '#C0C0C0',
  'srebro': '#C0C0C0',
  'złoty': '#FFD700',
  'zloty': '#FFD700',
  'zloto': '#FFD700',
  'złoto': '#FFD700',
  'miedzany': '#EA580C',
  'mosiężny': '#F59E0B',
  'mosiezny': '#F59E0B',
  'bronzowy': '#92400E',
  
  // Specjalne
  'bezbarwny': '#F8FAFC',
  'przezroczysty': '#F8FAFC',
  'wielokolorowy': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)',
  'tęczowy': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)',
  'teczowy': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)',
  'kolorowy': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)',
  'mix': 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #F9CA24)',
  
  // Angielskie nazwy dla kompatybilności
  'white': '#FFFFFF',
  'black': '#000000',
  'gray': '#6B7280',
  'grey': '#6B7280',
  'red': '#DC2626',
  'blue': '#2563EB',
  'green': '#16A34A',
  'orange': '#EA580C',
  'pink': '#EC4899',
  'purple': '#7C3AED',
  'brown': '#92400E',
  'beige': '#D2B48C',
  'navy': '#1E3A8A',
  'burgundy': '#7F1D1D',
  'olive': '#365314',
  'gold': '#FFD700',
  'silver': '#C0C0C0'
};

/**
 * Intelligent color detection based on color names with Polish language support
 * @param colorName - The name of the color in Polish or English
 * @returns CSS color value (hex or gradient)
 */
export const inferColorFromName = (colorName: string): string => {
  // Normalize the input: lowercase, remove diacritics, trim whitespace
  const normalizedName = colorName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
  
  // Debug dla żółtego i wszystkich kolorów
  const isYellowColor = colorName.toLowerCase().includes('żółt') || 
                       colorName.toLowerCase().includes('zolt') ||
                       colorName.toLowerCase().includes('yellow');
                       
  if (isYellowColor) {
    console.log('🟡 YELLOW COLOR DEBUG:', {
      original: colorName,
      normalized: normalizedName,
      paletteMatch: COLOR_PALETTE[normalizedName],
      intelligentMatch: INTELLIGENT_COLOR_MAPPINGS[normalizedName],
      allPossibleMatches: Object.keys(INTELLIGENT_COLOR_MAPPINGS).filter(key => 
        key.includes('zolt') || key.includes('żółt') || key.includes('yellow')
      )
    });
  }
  
  // First try direct palette mapping (for exact slug matches)
  if (COLOR_PALETTE[normalizedName]) {
    return COLOR_PALETTE[normalizedName];
  }
  
  // Then try intelligent mappings (for name variations)
  if (INTELLIGENT_COLOR_MAPPINGS[normalizedName]) {
    return INTELLIGENT_COLOR_MAPPINGS[normalizedName];
  }
  
  // Try partial matches for compound color names
  for (const [key, color] of Object.entries(INTELLIGENT_COLOR_MAPPINGS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      if (colorName.toLowerCase().includes('żółt') || colorName.toLowerCase().includes('zolt')) {
        console.log('Partial match found:', { key, color, normalizedName });
      }
      return color;
    }
  }
  
  // Final fallback to neutral color
  console.log('No color match found for:', colorName, '-> using gray fallback');
  return '#9CA3AF';
};

/**
 * Get color style object for CSS styling
 * @param slug - Color slug from WooCommerce
 * @param colorName - Display name of the color
 * @param colorValue - Optional predefined color value
 * @returns CSS style object with backgroundColor, border, and boxShadow
 */
export const getColorStyle = (slug: string, colorName: string, colorValue?: string): React.CSSProperties => {
  // Use provided color value or infer from name/slug
  const color = colorValue || COLOR_PALETTE[slug] || inferColorFromName(colorName);
  
  if (color.startsWith('linear-gradient')) {
    return { 
      background: color,
      border: '1px solid #D1D5DB',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    };
  }
  
  const isLightColor = [
    '#FFFFFF', '#F8FAFC', '#FEF3C7', '#FEF7ED', 
    '#F5F5DC', '#FFFEF7', '#FDE047', '#FDE68A',
    '#E5E7EB', '#F1F5F9'
  ].some(lightColor => color.toUpperCase() === lightColor.toUpperCase());
  
  return {
    backgroundColor: color,
    border: isLightColor ? '1px solid #D1D5DB' : '1px solid transparent',
    boxShadow: isLightColor ? '0 1px 2px rgba(0, 0, 0, 0.05)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
  };
};

/**
 * Check if a color should be considered light (for determining text/icon color)
 * @param colorValue - CSS color value
 * @returns boolean indicating if the color is light
 */
export const isLightColor = (colorValue: string): boolean => {
  // Handle gradient colors
  if (colorValue.startsWith('linear-gradient')) {
    return false; // Gradients are considered dark for contrast
  }
  
  // Define light colors
  const lightColors = [
    '#FFFFFF', '#F8FAFC', '#FEF3C7', '#FEF7ED', 
    '#F5F5DC', '#FFFEF7', '#FDE047', '#FDE68A',
    '#E5E7EB', '#F1F5F9', '#D2B48C', '#FDBA74',
    '#FED7AA', '#F9A8D4', '#FCA5A5'
  ];
  
  return lightColors.some(lightColor => 
    colorValue.toUpperCase() === lightColor.toUpperCase()
  );
};