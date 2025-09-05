import { memo } from 'react';

interface ServiceHeadingProps {
  beforeAccent: string;
  accent: string;
  afterAccent: string;
  className?: string;
}

export const ServiceHeading = memo<ServiceHeadingProps>(({ 
  beforeAccent, 
  accent, 
  afterAccent, 
  className = '' 
}) => (
  <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-8 ${className}`}>
    {beforeAccent}
    <span className="text-red-600"> {accent}</span>
    {afterAccent}
    <span className="text-red-600">.</span>
  </h1>
));

ServiceHeading.displayName = 'ServiceHeading';