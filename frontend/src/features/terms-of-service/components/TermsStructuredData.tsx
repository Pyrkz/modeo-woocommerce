import React from 'react';
import { CompanyInfo } from '../types';

interface Props {
  companyInfo: CompanyInfo;
  effectiveDate: string;
}

export const TermsStructuredData: React.FC<Props> = ({ 
  companyInfo, 
  effectiveDate 
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Regulamin sklepu internetowego",
    "description": "Regulamin sklepu internetowego Modeo.pl - zasady korzystania, składania zamówień, płatności i dostaw",
    "url": "https://modeo.pl/regulamin",
    "lastReviewed": effectiveDate,
    "datePublished": effectiveDate,
    "inLanguage": "pl",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Modeo.pl",
      "url": "https://modeo.pl"
    },
    "about": [
      {
        "@type": "Organization",
        "name": companyInfo.name,
        "foundingDate": "1993-12-27",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": companyInfo.address,
          "addressLocality": companyInfo.city.split(' ')[1] || companyInfo.city,
          "addressRegion": companyInfo.region,
          "postalCode": companyInfo.city.split(' ')[0] || "42-202",
          "addressCountry": "PL"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": companyInfo.phone,
            "email": companyInfo.email,
            "contactType": "customer service",
            "availableLanguage": "Polish"
          }
        ],
        "taxID": companyInfo.nip,
        "vatID": `PL${companyInfo.nip}`,
        "identifier": {
          "@type": "PropertyValue",
          "name": "REGON",
          "value": companyInfo.regon
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Odzież z personalizacją",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Sitodruk na odzieży",
                "category": "Personalizacja"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Haft komputerowy",
                "category": "Personalizacja"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Nadruki cyfrowe",
                "category": "Personalizacja"
              }
            }
          ]
        }
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Hurtownia Tekstylna Modeo S.C.",
      "url": "https://modeo.pl"
    },
    "mainEntity": {
      "@type": "Article",
      "headline": "Regulamin sklepu internetowego Modeo.pl",
      "datePublished": effectiveDate,
      "dateModified": effectiveDate,
      "author": {
        "@type": "Organization",
        "name": companyInfo.name
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hurtownia Tekstylna Modeo S.C.",
        "url": "https://modeo.pl"
      },
      "articleSection": [
        "Informacje ogólne",
        "Definicje",
        "Warunki korzystania ze sklepu", 
        "Składanie zamówień",
        "Ceny i płatności",
        "Realizacja zamówień i dostawa",
        "Prawo odstąpienia od umowy",
        "Reklamacje i gwarancja",
        "Ochrona danych osobowych",
        "Postanowienia końcowe"
      ]
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