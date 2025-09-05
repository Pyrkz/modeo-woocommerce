'use client';

import { memo } from 'react';
import { SolutionCardProps } from '../../types/solutions';

const SolutionCard = memo(({
  solution,
  className = ''
}: SolutionCardProps) => (
  <div className={`
    bg-white p-6 text-center
    transition-all duration-200
    ${className}
  `}>
    {/* Icon */}
    <div className="mb-4 flex justify-center">
      <div className="text-4xl">
        {solution.icon}
      </div>
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      {solution.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
      {solution.description}
    </p>

    {/* Services */}
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-gray-900 mb-2">
        Co robimy
      </h4>
      {solution.services.map((service, index) => (
        <p key={index} className="text-sm text-gray-600">
          {service}
        </p>
      ))}
    </div>
  </div>
));

SolutionCard.displayName = 'SolutionCard';

export default SolutionCard;