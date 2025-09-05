import React from 'react';
import { CompanyInfo, ContactInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  effectiveDate: string;
}

export const TermsHeader: React.FC<Props> = ({ 
  companyInfo, 
  contactInfo, 
  effectiveDate 
}) => {
  return (
    <header className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Regulamin sklepu internetowego
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Informacje o firmie
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">{companyInfo.name}</p>
            <p>{companyInfo.address}</p>
            <p>{companyInfo.city}, {companyInfo.region}</p>
            <p>NIP: {companyInfo.nip}</p>
            <p>REGON: {companyInfo.regon}</p>
            <p className="text-blue-600">Data powstania: {companyInfo.foundedDate}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
            Kontakt
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-center">
              <span className="font-medium text-gray-700 w-16">Email:</span>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {contactInfo.email}
              </a>
            </p>
            <p className="flex items-center">
              <span className="font-medium text-gray-700 w-16">Telefon:</span>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {contactInfo.phone}
              </a>
            </p>
            <p className="flex items-start">
              <span className="font-medium text-gray-700 w-16 mt-1">Adres:</span>
              <span>{contactInfo.address}</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-sm border border-gray-200">
          <span className="text-sm text-gray-500 mr-2">Obowiązuje od:</span>
          <span className="text-sm font-medium text-gray-900">
            {new Date(effectiveDate).toLocaleDateString('pl-PL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </header>
  );
};