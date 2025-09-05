'use client';

import { AboutFeatureCardProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutFeatureCard({ feature, className }: AboutFeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6",
      "border border-white/20 hover:bg-white/20",
      "transition-all duration-300 hover:-translate-y-1",
      "text-white shadow-lg",
      className
    )}>
      <div className="space-y-3">
        {/* Icon */}
        <div className="w-10 h-10 md:w-12 md:h-12">
          <IconComponent className="w-full h-full text-primary" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold">
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className="text-white/90 leading-relaxed text-sm md:text-base">
          {feature.description}
        </p>
      </div>
    </div>
  );
}