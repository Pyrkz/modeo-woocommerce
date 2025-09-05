import { memo } from 'react';

interface CallToActionProps {
  title: string;
  highlight: string;
  className?: string;
}

export const CallToAction = memo<CallToActionProps>(({ 
  title, 
  highlight,
  className = '' 
}) => (
  <div className={`text-gray-800 text-lg leading-relaxed mb-8 ${className}`}>
    <p>
      {title}{' '}
      <span className="text-red-600 font-semibold">{highlight}</span>
    </p>
  </div>
));

CallToAction.displayName = 'CallToAction';