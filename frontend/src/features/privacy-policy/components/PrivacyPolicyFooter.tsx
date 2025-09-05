import React from 'react';
import { CompanyInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
}

export const PrivacyPolicyFooter: React.FC<Props> = ({ companyInfo }) => {
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="text-center space-y-2">
        <p className="font-semibold text-gray-900">
          HURTOWNIA TEKSTYLNA MODEO S.C.
        </p>
        <p className="text-gray-600">
          {companyInfo.address}, {companyInfo.city}, {companyInfo.region}
        </p>
        <p className="text-gray-600">
          NIP: 5730242273 | REGON: 150916263
        </p>
        
        <div className="mt-6 text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
          <p>
            Niniejszy wzór polityki został przygotowany w oparciu na przepisy prawa obowiązujące na dzień sporządzenia. 
            Polityka Prywatności jest jednym z elementów troski o dane osobowe i prywatność użytkownika na stronie www.
          </p>
        </div>
      </div>
    </footer>
  );
};