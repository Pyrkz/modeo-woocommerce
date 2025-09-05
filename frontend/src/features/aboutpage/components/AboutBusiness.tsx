'use client';

import Image from 'next/image';
import { BusinessServiceCard } from './BusinessServiceCard';
import { businessServicesData } from '../data/aboutData';
import { AboutBusinessProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutBusiness({ className }: AboutBusinessProps) {
  return (
    <section className={cn(
      "py-20 bg-white",
      className
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            Jesteśmy dla Ciebie
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
            Działamy zarówno dla biznesu, jak i dla Ciebie
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
              <Image
                src="/resources/Koszulki z nadrukiem dla mezczyzn.webp"
                alt="Modeo - miejsce na twoją grafikę"
                width={600}
                height={700}
                className="object-cover w-full h-[500px] lg:h-[600px]"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
          </div>

          {/* Right Side - Service Cards */}
          <div className="order-1 lg:order-2 space-y-8">
            {businessServicesData.map((service) => (
              <BusinessServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}