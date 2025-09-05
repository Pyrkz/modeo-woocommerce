import Image from 'next/image';
import { memo } from 'react';
import type { CorporateWearHeroProps } from '../../types';
import { useCorporateWearData } from '../../hooks';
import { generateImagePlaceholder } from '../../utils';
import SectionBadge from '@/components/ui/SectionBadge';

interface CorporateWearHeroComponentProps {
  data: CorporateWearHeroProps;
}

function CorporateWearHero({ data }: CorporateWearHeroComponentProps) {
  const optimizedData = useCorporateWearData(data);
  const { badge, title, subtitle, description, features, stats } = optimizedData;

  return (
    <section className="relative min-h-[80vh] bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {badge && (
              <SectionBadge variant="primary">
                {badge}
              </SectionBadge>
            )}
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {title}{' '}
                <span className="text-red-600">{subtitle.split(' ')[0]}</span>{' '}
                <span className="text-black">{subtitle.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/resources/odziez-firmowa-twoje-logo.jpg"
                alt="Odzież firmowa z Twoim logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL={generateImagePlaceholder(800, 600)}
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CorporateWearHero);