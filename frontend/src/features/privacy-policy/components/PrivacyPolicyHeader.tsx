import React from 'react';
import { CompanyInfo, ContactInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  lastUpdated: string;
}

export const PrivacyPolicyHeader: React.FC<Props> = ({ 
  companyInfo, 
  contactInfo, 
  lastUpdated 
}) => {
  return (
    <header className="mb-12 bg-gray-50 rounded-lg p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Polityka prywatności
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Informacje o firmie
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">{companyInfo.name}</p>
            <p>{companyInfo.address}</p>
            <p>{companyInfo.city}, {companyInfo.region}</p>
            <p>NIP: {companyInfo.nip}</p>
            <p>REGON: {companyInfo.regon}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Kontakt w sprawach ochrony danych
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {contactInfo.email}
              </a>
            </p>
            <p>
              <span className="font-medium">Telefon:</span>{' '}
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {contactInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Ostatnia aktualizacja: {new Date(lastUpdated).toLocaleDateString('pl-PL')}
        </p>
      </div>
    </header>
  );
};