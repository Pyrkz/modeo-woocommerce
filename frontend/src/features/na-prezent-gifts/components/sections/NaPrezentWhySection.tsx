'use client';

import React from 'react';
import { naPrezentFeatures } from '../../data/naPrezentData';

export const NaPrezentWhySection = React.memo(() => (
  <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Dlaczego wybierać personalizowane prezenty?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Nasze prezenty to nie tylko produkty, to sposób na wyrażenie uczuć 
          i stworzenie niezapomnianych wspomnień.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {naPrezentFeatures.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 text-center"
          >
            <div className="text-4xl mb-4">
              {feature.icon}
            </div>
            <h3 className={`text-xl font-bold mb-3 ${feature.color}`}>
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Benefits */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Co nas wyróżnia?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <span className="text-gray-700">
                  <strong>Bezpłatne projekty</strong> - Każdy projekt graficzny jest darmowy
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <span className="text-gray-700">
                  <strong>Szybka realizacja</strong> - Większość zamówień w 2-3 dni robocze
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <span className="text-gray-700">
                  <strong>Gwarancja jakości</strong> - 100% satysfakcji lub zwrot pieniędzy
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <span className="text-gray-700">
                  <strong>Pomocna obsługa</strong> - Wsparcie na każdym etapie realizacji
                </span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6">
              <div className="text-4xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-700 font-semibold mb-1">zadowolonych klientów</div>
              <div className="text-sm text-gray-600">
                Na podstawie 5000+ opinii
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
));

NaPrezentWhySection.displayName = 'NaPrezentWhySection';