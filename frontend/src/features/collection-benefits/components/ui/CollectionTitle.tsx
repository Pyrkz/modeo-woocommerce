import { memo } from 'react';

interface CollectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const CollectionTitle = memo<CollectionTitleProps>(({ 
  title, 
  subtitle,
  className = '' 
}) => (
  <div className={className}>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
      {subtitle}
    </h3>
    {/* Red underline */}
    <div className="w-16 h-1 bg-red-600 mb-8" />
  </div>
));

CollectionTitle.displayName = 'CollectionTitle';