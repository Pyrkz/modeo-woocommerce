'use client';

import React from 'react';
import { SzkolyFeatureCard } from '../ui/SzkolyFeatureCard';
import { SzkolyStatsCard } from '../ui/SzkolyStatsCard';
import { szkolyBenefits, szkolyStats } from '../../data/szkolyData';

interface SzkolyBenefitsSectionProps {
  className?: string;
  id?: string;
}

export const SzkolyBenefitsSection = React.memo(({ 
  className = '',
  id
}: SzkolyBenefitsSectionProps) => (
  <section id={id} className={`py-16 lg:py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Dlaczego szkoły{' '}
          <span className="text-primary">wybierają nas?</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Współpracujemy ze szkołami w całej Polsce. Poznaj korzyści, 
          które oferujemy placówkom edukacyjnym.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <SzkolyStatsCard
          title="Projektów"
          value={szkolyStats.completedProjects}
          description="dla szkół"
          icon="🎓"
        />
        <SzkolyStatsCard
          title="Zadowolenia"
          value={szkolyStats.satisfiedClients}
          description="placówek"
          icon="⭐"
        />
        <SzkolyStatsCard
          title="Realizacja"
          value={szkolyStats.averageDelivery}
          description="średnio"
          icon="⚡"
        />
        <SzkolyStatsCard
          title="Doświadczenia"
          value={szkolyStats.experienceYears}
          description="na rynku"
          icon="🏆"
        />
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {szkolyBenefits.map((benefit, index) => (
          <SzkolyFeatureCard 
            key={index}
            benefit={benefit}
            className="h-full"
          />
        ))}
      </div>

      {/* Process Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Jak przebiega{' '}
            <span className="text-primary">współpraca?</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prostý proces od konsultacji do realizacji zamówienia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
              📞
            </div>
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
              1
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Konsultacja</h4>
            <p className="text-sm text-gray-600">
              Omawiamy potrzeby szkoły i możliwości personalizacji
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
              🎨
            </div>
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
              2
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Projekt</h4>
            <p className="text-sm text-gray-600">
              Przygotowujemy projekt graficzny do akceptacji
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
              🏭
            </div>
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
              3
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Produkcja</h4>
            <p className="text-sm text-gray-600">
              Realizujemy zamówienie z najwyższą jakością
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
              🚚
            </div>
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3">
              4
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Dostawa</h4>
            <p className="text-sm text-gray-600">
              Szybka dostawa bezpośrednio do szkoły
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
));

SzkolyBenefitsSection.displayName = 'SzkolyBenefitsSection';