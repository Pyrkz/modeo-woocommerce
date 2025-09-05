'use client';

import React, { MouseEvent, ReactNode } from 'react';
import { useSmoothScroll } from './SmoothScrollProvider';
import type { ScrollToOptions } from '../types';

interface SmoothScrollAnchorProps {
  href: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  duration?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Anchor component with smooth scroll behavior
 */
export const SmoothScrollAnchor: React.FC<SmoothScrollAnchorProps> = ({
  href,
  children,
  className = '',
  offset = -100, // Account for fixed header
  duration,
  onClick,
}) => {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Only handle internal anchors
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const options: ScrollToOptions = {
          offset,
        };
        
        if (duration) {
          options.duration = duration;
        }
        
        scrollTo(targetElement, options);
      }
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};