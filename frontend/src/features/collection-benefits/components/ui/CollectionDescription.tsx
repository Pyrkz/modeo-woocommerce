import { memo } from 'react';

interface CollectionDescriptionProps {
  intro: string;
  highlight: string;
  conclusion?: string;
  className?: string;
}

export const CollectionDescription = memo<CollectionDescriptionProps>(({ 
  intro, 
  highlight,
  conclusion = '',
  className = '' 
}) => (
  <div className={`text-gray-700 text-lg leading-relaxed mb-6 ${className}`}>
    <p>
      {intro}{' '}
      <span className="text-red-600 font-semibold">{highlight}</span>
      {conclusion && ` ${conclusion}`}
    </p>
  </div>
));

CollectionDescription.displayName = 'CollectionDescription';