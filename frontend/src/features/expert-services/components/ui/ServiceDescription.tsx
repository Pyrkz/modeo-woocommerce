import { memo } from 'react';

interface ServiceDescriptionProps {
  intro: string;
  highlight: string;
  conclusion: string;
  className?: string;
}

export const ServiceDescription = memo<ServiceDescriptionProps>(({ 
  intro, 
  highlight, 
  conclusion,
  className = '' 
}) => (
  <div className={`text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl ${className}`}>
    <p className="mb-0">
      {intro}
      <span className="text-red-600 font-semibold"> {highlight}</span>
      {conclusion}
    </p>
  </div>
));

ServiceDescription.displayName = 'ServiceDescription';