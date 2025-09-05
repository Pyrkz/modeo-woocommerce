'use client';

import React from 'react';
import { useViewportAnimation } from '../../hooks/useViewportAnimation';

interface FeatureCardProps {
  icon: string;
  text: string;
  delay?: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  text, 
  delay = 0,
  className = '' 
}) => {
  const [ref, isVisible] = useViewportAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`
        bg-white/60 backdrop-blur-xl rounded-2xl p-3 lg:p-4 
        border border-white/30 shadow-lg 
        transition-all duration-500 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-5'
        }
        ${className}
      `}
      style={{ 
        transitionDelay: isVisible ? `${delay * 100}ms` : '0ms' 
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-3 text-center sm:text-left">
        <span className="text-xl lg:text-2xl">{icon}</span>
        <span className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors text-xs sm:text-sm lg:text-base">
          {text}
        </span>
      </div>
    </div>
  );
};