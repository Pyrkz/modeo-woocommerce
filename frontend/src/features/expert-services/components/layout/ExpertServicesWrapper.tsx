import { memo, ReactNode } from 'react';

interface ExpertServicesWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ExpertServicesWrapper = memo<ExpertServicesWrapperProps>(({ 
  children, 
  className = '' 
}) => (
  <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {children}
      </div>
    </div>
  </section>
));

ExpertServicesWrapper.displayName = 'ExpertServicesWrapper';