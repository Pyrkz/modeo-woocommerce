import { memo, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = memo<SectionWrapperProps>(({ 
  children, 
  className = '' 
}) => (
  <section className={`py-16 lg:py-24 bg-white ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  </section>
));

SectionWrapper.displayName = 'SectionWrapper';