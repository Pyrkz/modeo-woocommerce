'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { AboutValueCardProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutValueCard({ value, className }: AboutValueCardProps) {
  return (
    <div className={cn(
      "text-center space-y-4",
      className
    )}>
      {/* Star Icon */}
      <div className="flex justify-center">
        <StarIcon className="w-12 h-12 text-primary" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900">
        {value.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}