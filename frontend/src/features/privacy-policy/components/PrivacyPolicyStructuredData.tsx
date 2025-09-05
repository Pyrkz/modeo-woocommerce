import React from 'react';
import { CompanyInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
  lastUpdated: string;
}

export const PrivacyPolicyStructuredData: React.FC<Props> = ({ 
  companyInfo, 
  lastUpdated 
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Polityka Prywatności",
    "description": "Polityka prywatności sklepu internetowego Modeo.pl",
    "url": "https://modeo.pl/polityka-prywatnosci",
    "lastReviewed": lastUpdated,
    "about": {
      "@type": "Organization",
      "name": companyInfo.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": companyInfo.address,
        "addressLocality": companyInfo.city.split(' ')[1] || companyInfo.city,
        "addressRegion": companyInfo.region,
        "postalCode": companyInfo.city.split(' ')[0] || "42-202",
        "addressCountry": "PL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": companyInfo.phone,
        "email": companyInfo.email,
        "contactType": "customer service",
        "availableLanguage": "Polish"
      },
      "taxID": companyInfo.nip,
      "vatID": `PL${companyInfo.nip}`,
      "identifier": {
        "@type": "PropertyValue",
        "name": "REGON",
        "value": companyInfo.regon
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hurtownia Tekstylna Modeo S.C.",
      "url": "https://modeo.pl"
    },
    "mainEntity": {
      "@type": "Article",
      "headline": "Polityka Prywatności",
      "datePublished": lastUpdated,
      "dateModified": lastUpdated,
      "author": {
        "@type": "Organization",
        "name": companyInfo.name
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hurtownia Tekstylna Modeo S.C.",
        "url": "https://modeo.pl"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};