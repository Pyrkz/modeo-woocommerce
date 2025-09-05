'use client';

import { StatCard } from './StatCard';
import { statisticsData } from '../data/aboutData';
import { AboutStatsProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutStats({ className }: AboutStatsProps) {
  return (
    <section className={cn(
      "py-20 bg-gray-50",
      className
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            Nasze osiągnięcia
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Liczby, które mówią same za siebie
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Ponad 30 lat na rynku to nie tylko doświadczenie, ale przede wszystkim tysiące zadowolonych 
            klientów i miliony wyprodukowanych sztuk odzieży.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
          {statisticsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">
            Te liczby to efekt ciągłego rozwoju, inwestowania w najnowsze technologie i przede wszystkim 
            słuchania potrzeb naszych klientów. Każdy projekt to dla nas nowe wyzwanie i możliwość 
            pokazania, że jesteśmy najlepsi w tym, co robimy.
          </p>
        </div>
      </div>
    </section>
  );
}