import { memo } from 'react';
import type { CollectionBenefit } from '../../types';

interface BenefitsListProps {
  benefits: CollectionBenefit[];
  className?: string;
}

export const BenefitsList = memo<BenefitsListProps>(({ 
  benefits, 
  className = '' 
}) => (
  <ul className={`space-y-4 ${className}`}>
    {benefits.map((benefit) => (
      <li key={benefit.id} className="flex items-start gap-3">
        {/* Red bullet point */}
        <div className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-3" />
        
        {/* Benefit text */}
        <span className="text-gray-800 text-lg leading-relaxed">
          {benefit.text}
        </span>
      </li>
    ))}
  </ul>
));

BenefitsList.displayName = 'BenefitsList';