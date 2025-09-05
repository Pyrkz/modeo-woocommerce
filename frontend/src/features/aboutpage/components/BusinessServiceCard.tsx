'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { BusinessServiceCardProps } from '../types';
import { cn } from '@/lib/utils';

export function BusinessServiceCard({ service, className }: BusinessServiceCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-3xl p-8 shadow-sm border border-gray-100",
      "hover:shadow-md transition-all duration-300",
      className
    )}>
      <div className="space-y-6">
        {/* Star Icon */}
        <div>
          <StarIcon className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm">
          {service.description}
        </p>
        
        {/* CTA Button */}
        <div className="pt-2">
          <Button
            variant={service.ctaVariant === 'primary' ? 'primary' : 'secondary'}
            size="md"
            className={cn(
              "font-semibold",
              service.ctaVariant === 'primary' 
                ? "bg-primary hover:bg-primary-dark text-white" 
                : "bg-gray-900 hover:bg-black text-white"
            )}
            onClick={() => window.location.href = service.ctaHref}
          >
            {service.ctaText}
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}