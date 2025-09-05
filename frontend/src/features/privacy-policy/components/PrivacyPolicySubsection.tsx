import React from 'react';
import { PrivacyPolicySubsection as PrivacyPolicySubsectionType } from '../types';

interface Props {
  subsection: PrivacyPolicySubsectionType;
}

export const PrivacyPolicySubsection: React.FC<Props> = ({ subsection }) => {
  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} className="mb-3 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ));
    }
    return content && (
      <p className="mb-3 text-gray-700 leading-relaxed">
        {content}
      </p>
    );
  };

  return (
    <div className="ml-4 space-y-3">
      {subsection.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {subsection.title}
        </h3>
      )}
      
      {renderContent(subsection.content)}
      
      {subsection.list && (
        <ul className="list-disc list-inside space-y-2 ml-4">
          {subsection.list.map((item) => (
            <li key={item.id} className="text-gray-700 leading-relaxed">
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};