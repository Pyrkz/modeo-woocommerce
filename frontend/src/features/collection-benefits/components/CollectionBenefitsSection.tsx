'use client';

import { memo } from 'react';
import { 
  CollectionTitle, 
  CollectionDescription, 
  CallToAction, 
  BenefitsList, 
  ProductImage 
} from './ui';
import { CollectionBenefitsWrapper } from './layout';
import { useCollectionBenefitsData } from '../hooks';

const CollectionBenefitsSectionComponent = () => {
  const data = useCollectionBenefitsData();
  return (
    <CollectionBenefitsWrapper>
      {/* Left Column - Product Image */}
      <div className="order-2 lg:order-1">
        <ProductImage
          src={data.productImage.src}
          alt={data.productImage.alt}
          width={data.productImage.width}
          height={data.productImage.height}
        />
      </div>

      {/* Right Column - Content */}
      <div className="order-1 lg:order-2 space-y-6">
        <CollectionTitle
          title={data.title}
          subtitle={data.subtitle}
        />
        
        <CollectionDescription
          intro={data.description.intro}
          highlight={data.description.highlight}
          conclusion={data.description.conclusion}
        />
        
        <CallToAction
          title={data.callToAction.title}
          highlight={data.callToAction.highlight}
        />
        
        <BenefitsList benefits={data.benefits} />
      </div>
    </CollectionBenefitsWrapper>
  );
};

export const CollectionBenefitsSection = memo(CollectionBenefitsSectionComponent);