'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CTAButtonProps {
  href: string;
  size: 'small' | 'medium' | 'large' | 'wide';
  title: string;
}

const CTAButton = memo(({ href, size, title }: CTAButtonProps) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-5 py-2.5 text-sm',
    large: 'px-6 py-3 text-base',
    wide: 'px-5 py-2.5 text-sm'
  };

  return (
    <Link 
      href={href}
      className={`
        inline-flex items-center justify-center gap-2
        bg-white/90 hover:bg-white text-gray-900 font-semibold
        rounded-full transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
        backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-opacity-75
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        group/button
        ${sizeClasses[size]}
      `}
      aria-label={`Zobacz ${title} - otwiera w nowej karcie`}
      role="button"
      tabIndex={0}
    >
      <span>Zobacz więcej</span>
      <ArrowRightIcon 
        className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" 
        aria-hidden="true"
      />
    </Link>
  );
});

CTAButton.displayName = 'CTAButton';

export { CTAButton };