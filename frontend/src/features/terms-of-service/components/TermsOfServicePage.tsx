import React from 'react';
import { termsOfServiceData } from '../data/termsOfServiceData';
import { TermsHeader } from './TermsHeader';
import { TermsSection } from './TermsSection';
import { TermsFooter } from './TermsFooter';
import { TermsStructuredData } from './TermsStructuredData';

export const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <TermsStructuredData
        companyInfo={termsOfServiceData.companyInfo}
        effectiveDate={termsOfServiceData.effectiveDate}
      />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TermsHeader
            companyInfo={termsOfServiceData.companyInfo}
            contactInfo={termsOfServiceData.contactInfo}
            effectiveDate={termsOfServiceData.effectiveDate}
          />
          
          <main className="prose max-w-none">
            {termsOfServiceData.sections.map((section) => (
              <TermsSection
                key={section.id}
                section={section}
              />
            ))}
          </main>
          
          <TermsFooter
            companyInfo={termsOfServiceData.companyInfo}
          />
        </div>
      </div>
    </>
  );
};