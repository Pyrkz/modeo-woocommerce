'use client';

import { FeatureCard } from './FeatureCard';
import { contactFeaturesData } from '../data/contactData';

export function ContactFeatures() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {contactFeaturesData.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}