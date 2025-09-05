'use client';

import { memo, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { HeroHeader } from './hero';
import { SectionWrapper } from './layout';
import { customCollectionData } from '../data/customCollectionData';
import { collectionBenefitsData } from '../../collection-benefits/data/collectionBenefitsData';
import { useImagePreload } from '../hooks';
import { BackgroundCTA } from '@/components/ui';

// Lazy load components for better performance
const ProductShowcase = dynamic(
  () => import('./showcase').then(mod => ({ default: mod.ProductShowcase })),
  { 
    loading: () => <div className="animate-pulse h-96 bg-gray-100 rounded-lg" />,
    ssr: true 
  }
);

const ContentSection = dynamic(
  () => import('./content').then(mod => ({ default: mod.ContentSection })),
  { ssr: true }
);

const ProcessStepsSection = dynamic(
  () => import('./process').then(mod => ({ default: mod.ProcessStepsSection })),
  { 
    loading: () => <div className="animate-pulse h-64 bg-gray-50 rounded-lg" />,
    ssr: true 
  }
);

const ProductCategoriesSection = dynamic(
  () => import('./product-categories').then(mod => ({ default: mod.ProductCategoriesSection })),
  { 
    loading: () => <div className="animate-pulse h-96 bg-white rounded-lg" />,
    ssr: true 
  }
);

const BusinessPartnerSection = dynamic(
  () => import('./business-partner').then(mod => ({ default: mod.BusinessPartnerSection })),
  { 
    loading: () => <div className="animate-pulse h-96 bg-gray-50 rounded-lg" />,
    ssr: true 
  }
);

const ExpertServicesSection = dynamic(
  () => import('../../expert-services').then(mod => ({ default: mod.ExpertServicesSection })),
  { 
    loading: () => <div className="animate-pulse h-48 bg-gray-50 rounded-lg" />,
    ssr: true 
  }
);

const CollectionBenefitsSection = dynamic(
  () => import('../../collection-benefits').then(mod => ({ default: mod.CollectionBenefitsSection })),
  { 
    loading: () => <div className="animate-pulse h-96 bg-white rounded-lg" />,
    ssr: true 
  }
);

const CustomCollectionSectionComponent = () => {
  const allImages = useMemo(() => [
    customCollectionData.images.mainImage,
    ...customCollectionData.images.showcaseImages,
    customCollectionData.productCategories.image,
    customCollectionData.businessPartner.image,
    collectionBenefitsData.productImage
  ], []);
  
  useImagePreload(allImages);

  return (
    <>
      <SectionWrapper>
        <HeroHeader data={customCollectionData.hero} />
        <ProductShowcase images={customCollectionData.images} />
        <ContentSection description={customCollectionData.hero.description} />
      </SectionWrapper>
      
      <ExpertServicesSection />
      <CollectionBenefitsSection />
      <ProcessStepsSection data={customCollectionData.processSteps} />
      <ProductCategoriesSection data={customCollectionData.productCategories} />
      <BusinessPartnerSection data={customCollectionData.businessPartner} />
      <BackgroundCTA
        title="Masz większe zamówienie lub specyficzne wymagania?"
      />
      
    </>
  );
};

export const CustomCollectionSection = memo(CustomCollectionSectionComponent);