'use client';

import { memo } from 'react';
import { SectionBadge } from '@/components/ui';

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  subtitle: string;
  highlightWords?: string[];
}

const SectionHeader = memo(({ 
  badgeText, 
  title, 
  subtitle, 
  highlightWords = ['więcej', 'prezent'] 
}: SectionHeaderProps) => {
  const renderTitle = () => {
    return title.split(' ').map((word, index) => {
      const isHighlighted = highlightWords.includes(word.toLowerCase());
      const isLastWord = index === title.split(' ').length - 1;
      
      return (
        <span key={index} className={isHighlighted ? 'text-primary' : ''}>
          {word}{!isLastWord ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <header className="text-center mb-16">
      <SectionBadge className="mb-6">
        {badgeText}
      </SectionBadge>
      
      <h2 
        id="gifts-section-title"
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
      >
        {renderTitle()}
      </h2>
      
      <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
        {subtitle}
      </p>
    </header>
  );
});

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };