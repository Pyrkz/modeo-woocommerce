'use client';

import { memo } from 'react';
import { GiftCard } from '../../types';
import { GiftGridItem } from './GiftGridItem';

interface FlexibleGiftGridProps {
  gifts: GiftCard[];
}

const FlexibleGiftGrid = memo(({ gifts }: FlexibleGiftGridProps) => {
  if (!gifts.length) return null;

  const giftAreas = [
    'walentynki',
    'dzien-matki', 
    'dzien-taty',
    'zwierzaki',
    'dzien-dziecka',
    'polo-shirt'
  ];

  return (
    <>
      <style jsx>{`
        .flexible-grid {
          display: grid;
          width: 100%;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          
          /* Mobile: 2 columns */
          grid-template-areas:
            "walentynki walentynki"
            "dzien-matki dzien-taty" 
            "zwierzaki zwierzaki"
            "dzien-dziecka polo-shirt";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(4, min-content);
        }
        
        @media (min-width: 1024px) {
          .flexible-grid {
            /* Desktop: 5 columns for precise control */
            grid-template-areas:
              "walentynki walentynki dzien-matki dzien-taty dzien-taty"
              "walentynki walentynki zwierzaki zwierzaki zwierzaki"
              "dzien-dziecka dzien-dziecka dzien-dziecka polo-shirt polo-shirt";
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: repeat(3, min-content);
          }
        }
        
        .grid-item {
          min-height: 280px;
          width: 100%;
        }
      `}</style>
      
      <div className="flexible-grid">
        {gifts.slice(0, 6).map((gift, index) => (
          <div
            key={gift.id}
            className="grid-item"
            style={{ gridArea: giftAreas[index] }}
          >
            <GiftGridItem
              gift={{
                ...gift,
                size: index === 0 || index === 3 ? 'large' : 
                      index === 4 || index === 5 ? 'medium' : 'small'
              }}
              className="h-full w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
});

FlexibleGiftGrid.displayName = 'FlexibleGiftGrid';

export { FlexibleGiftGrid };