import { memo } from 'react';

interface ProductCategoriesHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

function ProductCategoriesHeader({ 
  title, 
  subtitle, 
  description,
  className = '' 
}: ProductCategoriesHeaderProps) {
  return (
    <div className={`text-center space-y-4 mb-8 md:mb-12 ${className}`}>
      {subtitle && (
        <div className="inline-block">
          <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
            {subtitle}
          </span>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

export default memo(ProductCategoriesHeader);