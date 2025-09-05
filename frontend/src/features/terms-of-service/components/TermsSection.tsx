import React from 'react';
import { TermsSection as TermsSectionType } from '../types';
import { TermsSubsection } from './TermsSubsection';

interface Props {
  section: TermsSectionType;
}

export const TermsSection: React.FC<Props> = ({ section }) => {
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

  const renderList = (list: TermsSectionType['list']) => {
    if (!list) return null;
    
    return (
      <div className="ml-4 space-y-3">
        {list.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-semibold mt-1">•</span>
              <div className="flex-1">
                <span className="font-medium text-gray-900">{item.text}</span>
                {item.description && (
                  <span className="text-gray-600"> – {item.description}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-100 pb-3">
        {section.title}
      </h2>
      
      <div className="space-y-6">
        {renderContent(section.content)}
        {renderList(section.list)}
        
        {section.subsections?.map((subsection) => (
          <TermsSubsection
            key={subsection.id}
            subsection={subsection}
          />
        ))}
      </div>
    </section>
  );
};