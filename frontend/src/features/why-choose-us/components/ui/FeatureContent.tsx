import { memo } from 'react';

interface FeatureContentProps {
  title: string;
  description: string;
  className?: string;
}

function FeatureContent({ title, description, className = '' }: FeatureContentProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default memo(FeatureContent);