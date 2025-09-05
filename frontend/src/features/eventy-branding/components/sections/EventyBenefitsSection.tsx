'use client';

import React from 'react';
import { eventyBenefits, eventyStats } from '../../data/eventyData';
import { EventyStatsCard } from '../ui/EventyStatsCard';

interface EventyBenefitsSectionProps {
  id?: string;
}

export const EventyBenefitsSection = React.memo(({ id }: EventyBenefitsSectionProps) => {
  const statsData = [
    { label: 'Zrealizowanych eventów', value: eventyStats.completedProjects, icon: '🎯' },
    { label: 'Zadowolonych organizatorów', value: eventyStats.satisfiedClients, icon: '⭐' },
    { label: 'Średni czas realizacji', value: eventyStats.averageDelivery, icon: '⚡' },
    { label: 'Doświadczenia w branży', value: eventyStats.experienceYears, icon: '🏆' }
  ];

  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Liczby mówią za nas
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            15 lat doświadczenia w brandingu eventowym przekłada się na setki udanych projektów
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <EventyStatsCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego organizatorzy wybierają nas?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specjalizujemy się w brandingu eventowym i wiemy, jak ważne są terminy i jakość dla Twojego wydarzenia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventyBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                benefit.highlight
                  ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-lg'
                  : 'bg-white border border-gray-200 hover:shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto ${
                  benefit.highlight
                    ? 'bg-gradient-to-br from-primary to-secondary text-white'
                    : 'bg-gray-100'
                }`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {benefit.highlight && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      ⭐ Najczęściej wybierane
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

EventyBenefitsSection.displayName = 'EventyBenefitsSection';