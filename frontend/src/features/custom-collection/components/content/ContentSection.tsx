'use client';

import { memo } from 'react';

interface ContentSectionProps {
  description: string[];
}

const ContentSectionComponent = ({ description }: ContentSectionProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="prose prose-lg max-w-none">
        {description.map((paragraph, index) => (
          <p 
            key={index}
            className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg"
          >
            {paragraph}
          </p>
        ))}
        
        <p className="text-sm text-gray-600 leading-relaxed mt-8">
          <strong>Dodatkowe informacje:</strong>
        </p>
      </div>
    </div>
  );
};

export const ContentSection = memo(ContentSectionComponent);