import React from 'react';
import { TermsSubsection as TermsSubsectionType } from '../types';

interface Props {
  subsection: TermsSubsectionType;
}

export const TermsSubsection: React.FC<Props> = ({ subsection }) => {
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

  const renderList = (list: TermsSubsectionType['list']) => {
    if (!list) return null;
    
    return (
      <ul className="list-disc list-inside space-y-2 ml-4">
        {list.map((item) => (
          <li key={item.id} className="text-gray-700 leading-relaxed">
            <span className="font-medium">{item.text}</span>
            {item.description && (
              <span className="text-gray-600"> – {item.description}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const containerClasses = subsection.highlight 
    ? "ml-4 space-y-3 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"
    : "ml-4 space-y-3";

  return (
    <div className={containerClasses}>
      {subsection.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {subsection.title}
        </h3>
      )}
      
      {renderContent(subsection.content)}
      {renderList(subsection.list)}
    </div>
  );
};