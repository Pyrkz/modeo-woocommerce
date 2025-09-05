import { memo } from 'react';

interface WhyChooseUsHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

function WhyChooseUsHeader({ 
  badge, 
  title, 
  subtitle, 
  description,
  className = '' 
}: WhyChooseUsHeaderProps) {
  return (
    <div className={`text-center space-y-4 mb-16 ${className}`}>
      <div className="inline-block">
        <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}{' '}
        <span className="text-red-600">{subtitle}</span>
      </h2>
      
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
        {description}
      </p>
    </div>
  );
}

export default memo(WhyChooseUsHeader);