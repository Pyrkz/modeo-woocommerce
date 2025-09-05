'use client';

import { Button } from '@/components/ui/Button';
import { TeamContactProps } from '../types';
import { cn } from '@/lib/utils';

export function TeamContact({ className }: TeamContactProps) {
  return (
    <div className={cn(
      "text-center bg-gray-50 py-16",
      className
    )}>
      <div className="container mx-auto px-4">
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Masz pytania? Skontaktuj się z nami bezpośrednio lub napisz na ogólny adres biura.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            variant="primary"
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-semibold"
            onClick={() => window.location.href = 'mailto:sklep@modeo.pl'}
          >
            sklep@modeo.pl
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
          
          <div className="flex items-center gap-4 text-lg">
            <span className="text-gray-600">lub zadzwoń:</span>
            <a 
              href="tel:+48123456789"
              className="text-primary hover:text-primary-dark font-bold transition-colors"
            >
              +48 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}