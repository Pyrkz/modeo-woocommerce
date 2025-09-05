'use client';

import { memo } from 'react';
import Link from 'next/link';
import { SectionBadge } from '@/components/ui';
import { BlogHeaderProps } from '../../types';

const BlogSectionHeader = memo(({ 
  badgeText, 
  title, 
  subtitle, 
  ctaText = 'Sprawdź wszystkie',
  ctaHref = '/blog' 
}: BlogHeaderProps) => {
  const renderTitle = () => {
    return title.split(' ').map((word, index) => {
      const highlightWords = ['bloga', 'wpisy'];
      const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
      const isLastWord = index === title.split(' ').length - 1;
      
      return (
        <span key={index} className={isHighlighted ? 'text-primary' : ''}>
          {word}{!isLastWord ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
      {/* Main Header Content */}
      <div className="flex-1">
        <SectionBadge className="mb-4">
          {badgeText}
        </SectionBadge>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {renderTitle()}
        </h2>
        
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex-shrink-0">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg group"
        >
          {ctaText}
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </header>
  );
});

BlogSectionHeader.displayName = 'BlogSectionHeader';

export { BlogSectionHeader };