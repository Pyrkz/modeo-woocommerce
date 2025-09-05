'use client';

import { memo } from 'react';
import type { ProcessStep as ProcessStepType } from '../../types';

interface ProcessStepProps {
  step: ProcessStepType;
  className?: string;
}

export const ProcessStep = memo<ProcessStepProps>(({ step, className = '' }) => {
  return (
    <div className={`group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full ${className}`}>
      {/* Step Number Badge */}
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold mr-3" style={{ backgroundColor: 'var(--primary)' }}>
          {step.id}
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {step.stepLabel}
        </span>
      </div>
      
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {step.icon}
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {step.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {step.description}
        </p>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 pointer-events-none" style={{ borderColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(204, 22, 22, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'} />
    </div>
  );
});

ProcessStep.displayName = 'ProcessStep';