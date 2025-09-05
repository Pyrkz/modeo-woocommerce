'use client';

import { memo } from 'react';
import SectionBadge from '@/components/ui/SectionBadge';
import { BusinessServicesProps } from '../../types/services';
import BusinessServiceCard from './BusinessServiceCard';

const BusinessServices = memo<BusinessServicesProps>(({ 
  badge, 
  title, 
  subtitle, 
  description, 
  services 
}) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <SectionBadge variant="primary">
              {badge}
            </SectionBadge>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-6">
            {subtitle}
          </h3>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.slice(0, 3).map((service) => (
            <BusinessServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Second Row */}
        {services.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            {services.slice(3, 5).map((service) => (
              <BusinessServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
});

BusinessServices.displayName = 'BusinessServices';

export default BusinessServices;