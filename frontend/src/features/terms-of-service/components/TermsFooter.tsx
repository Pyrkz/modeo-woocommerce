import React from 'react';
import { CompanyInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
}

export const TermsFooter: React.FC<Props> = ({ companyInfo }) => {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="text-center space-y-4">
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="font-semibold text-gray-900 mb-2">
            HURTOWNIA TEKSTYLNA MODEO S.C.
          </p>
          <p className="text-gray-600 mb-1">
            {companyInfo.address}, {companyInfo.city}, {companyInfo.region}
          </p>
          <p className="text-gray-600 mb-3">
            NIP: 5730242273 | REGON: 150916263
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a 
              href={`mailto:${companyInfo.email}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {companyInfo.email}
            </a>
            <a 
              href={`tel:${companyInfo.phone}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {companyInfo.phone}
            </a>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-4">
          <p className="mb-2">
            Niniejszy regulamin został przygotowany w oparciu o przepisy prawa obowiązujące na dzień sporządzenia.
          </p>
          <p>
            Regulamin jest jednym z elementów profesjonalnej obsługi klienta w sklepie internetowym Modeo.pl.
          </p>
        </div>
      </div>
    </footer>
  );
};