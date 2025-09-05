'use client';

import { ContactCardProps } from '../types';
import { cn } from '@/lib/utils';

export function ContactCard({ info, className }: ContactCardProps) {
  const IconComponent = info.icon;
  
  const handleClick = () => {
    if (info.href) {
      if (info.type === 'address') {
        window.open(info.href, '_blank');
      } else {
        window.location.href = info.href;
      }
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
        "hover:shadow-lg hover:border-red-100 transition-all duration-300",
        "cursor-pointer transform hover:-translate-y-1",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label={`${info.title}: ${info.value}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300",
          info.type === 'email' && "bg-red-50 text-red-500 group-hover:bg-red-100",
          info.type === 'phone' && "bg-red-50 text-red-500 group-hover:bg-red-100", 
          info.type === 'address' && "bg-red-50 text-red-500 group-hover:bg-red-100"
        )}>
          <IconComponent className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
            {info.title}
          </h3>
          <div className={cn(
            "text-sm font-medium transition-colors duration-300",
            info.type === 'email' && "text-red-600 group-hover:text-red-700",
            info.type === 'phone' && "text-red-600 group-hover:text-red-700",
            info.type === 'address' && "text-red-600 group-hover:text-red-700"
          )}>
            {info.type === 'address' ? (
              <div className="whitespace-pre-line">
                {info.value}
              </div>
            ) : (
              info.value
            )}
          </div>
        </div>
      </div>
    </div>
  );
}