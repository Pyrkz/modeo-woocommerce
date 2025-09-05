'use client';

import { memo } from 'react';
import { SectionHeader } from './header';
import { GiftGrid } from './grid';
import { GiftCard } from '../types';
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { CategoryFilter } from '../types/categories';

interface SmartGiftsSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  gifts: GiftCard[];
  categoryId?: string; // Current category context (e.g., 'dzien-matki', 'dzien-taty')
  categoryFilter?: CategoryFilter;
  className?: string;
  maxItems?: number;
}

const SmartGiftsSection = memo(({ 
  title, 
  subtitle, 
  badgeText, 
  gifts,
  categoryId,
  categoryFilter,
  className = '',
  maxItems
}: SmartGiftsSectionProps) => {
  const { filteredGifts, filteredCount } = useCategoryFilter({
    gifts,
    categoryFilter,
    currentCategory: categoryId
  });

  // If no gifts after filtering, don't render
  if (!filteredGifts.length) return null;

  // Limit items if specified
  const displayGifts = maxItems ? filteredGifts.slice(0, maxItems) : filteredGifts;

  return (
    <section 
      className={`py-16 sm:py-20 lg:py-24 bg-white ${className}`}
      aria-labelledby="smart-gifts-section-title"
      role="region"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badgeText={badgeText}
          title={title}
          subtitle={subtitle}
        />
        
        {/* Show filtering info if applicable */}
        {categoryId && filteredCount < gifts.length && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500">
              Pokazujemy {filteredCount} z {gifts.length} dostępnych produktów, 
              dostosowanych do kategorii &quot;{categoryId.replace('-', ' ')}&quot;
            </p>
          </div>
        )}
        
        <div role="list" aria-label="Inteligentnie dobrane prezenty">
          <GiftGrid gifts={displayGifts} />
        </div>

        {/* Show "see more" if items were limited */}
        {maxItems && filteredGifts.length > maxItems && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              i {filteredGifts.length - maxItems} więcej produktów...
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

SmartGiftsSection.displayName = 'SmartGiftsSection';

export { SmartGiftsSection };