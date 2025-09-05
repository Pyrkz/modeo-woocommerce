'use client';

import { AboutValueCard } from './AboutValueCard';
import { aboutValuesData } from '../data/aboutData';
import { AboutValuesProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutValues({ className }: AboutValuesProps) {
  return (
    <section className={cn(
      "py-20 bg-gray-50",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
          {aboutValuesData.map((value) => (
            <AboutValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}