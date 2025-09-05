'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ChevronRightIcon } from '../icons';

interface HeroCTAProps {
  text: string;
  href?: string;
}

export const HeroCTA = memo<HeroCTAProps>(({ text, href }) => {
  const buttonContent = (
    <Button 
      variant="primary"
      size="lg"
      className="px-8 py-4 group relative overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <span className="relative z-10 flex items-center gap-2">
        {text}
        <ChevronRightIcon 
          className="transition-transform duration-300 group-hover:translate-x-1" 
          size={20}
        />
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );

  if (href) {
    return (
      <Link href={href} prefetch>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
});

HeroCTA.displayName = 'HeroCTA';