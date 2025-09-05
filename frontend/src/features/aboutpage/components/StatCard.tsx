'use client';

import { StatCardProps } from '../types';
import { cn } from '@/lib/utils';

export function StatCard({ stat, className }: StatCardProps) {
  const IconComponent = stat.icon;

  return (
    <div className={cn(
      "bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100",
      "hover:shadow-md transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            stat.iconBgColor
          )}>
            <IconComponent className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        
        {/* Number */}
        <div className="text-3xl md:text-4xl font-bold text-primary">
          {stat.number}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">
          {stat.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
}