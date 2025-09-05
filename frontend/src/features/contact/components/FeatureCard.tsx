'use client';

import { FeatureCardProps } from '../types';
import { cn } from '@/lib/utils';

export function FeatureCard({ feature, className }: FeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 text-center space-y-6",
      "shadow-sm border border-gray-100 hover:shadow-lg",
      "hover:border-gray-200 transition-all duration-300",
      "transform hover:-translate-y-1",
      className
    )}>
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-gray-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {feature.description}
        </p>
      </div>
    </div>
  );
}