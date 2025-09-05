'use client';

import { memo } from 'react';
import { ProcessStep } from './ProcessStep';
import type { ProcessStepsData } from '../../types';

interface ProcessStepsSectionProps {
  data: ProcessStepsData;
  className?: string;
}

export const ProcessStepsSection = memo<ProcessStepsSectionProps>(({ 
  data, 
  className = '' 
}) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {data.title}{' '}
            <span style={{ color: 'var(--primary)' }}>{data.subtitle}</span>
          </h2>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.steps.map((step, index) => (
            <div
              key={step.id}
              className="transform hover:-translate-y-1 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProcessStep step={step} />
            </div>
          ))}
        </div>
        
        {/* Bottom Text */}
        {data.bottomText && (
          <div className="text-center">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              {data.bottomText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

ProcessStepsSection.displayName = 'ProcessStepsSection';