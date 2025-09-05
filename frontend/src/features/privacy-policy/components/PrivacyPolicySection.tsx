import React from 'react';
import { PrivacyPolicySection as PrivacyPolicySectionType } from '../types';
import { PrivacyPolicySubsection } from './PrivacyPolicySubsection';

interface Props {
  section: PrivacyPolicySectionType;
}

export const PrivacyPolicySection: React.FC<Props> = ({ section }) => {
  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ));
    }
    return content && (
      <p className="mb-4 text-gray-700 leading-relaxed">
        {content}
      </p>
    );
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
        {section.title}
      </h2>
      
      <div className="space-y-4">
        {renderContent(section.content)}
        
        {section.subsections?.map((subsection) => (
          <PrivacyPolicySubsection
            key={subsection.id}
            subsection={subsection}
          />
        ))}
      </div>
    </section>
  );
};