import React from 'react';
import { privacyPolicyData } from '../data/privacyPolicyData';
import { PrivacyPolicyHeader } from './PrivacyPolicyHeader';
import { PrivacyPolicySection } from './PrivacyPolicySection';
import { PrivacyPolicyFooter } from './PrivacyPolicyFooter';
import { PrivacyPolicyStructuredData } from './PrivacyPolicyStructuredData';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PrivacyPolicyStructuredData
        companyInfo={privacyPolicyData.companyInfo}
        lastUpdated={privacyPolicyData.lastUpdated}
      />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PrivacyPolicyHeader
            companyInfo={privacyPolicyData.companyInfo}
            contactInfo={privacyPolicyData.contactInfo}
            lastUpdated={privacyPolicyData.lastUpdated}
          />
          
          <main className="prose max-w-none">
            {privacyPolicyData.sections.map((section) => (
              <PrivacyPolicySection
                key={section.id}
                section={section}
              />
            ))}
          </main>
          
          <PrivacyPolicyFooter
            companyInfo={privacyPolicyData.companyInfo}
          />
        </div>
      </div>
    </>
  );
};