'use client';

import { TeamMemberCard } from './TeamMemberCard';
import { TeamContact } from './TeamContact';
import { teamMembersData } from '../data/aboutData';
import { AboutTeamProps } from '../types';
import { cn } from '@/lib/utils';

export function AboutTeam({ className }: AboutTeamProps) {
  return (
    <section className={cn(
      "py-20 bg-white",
      className
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-lg mb-4 tracking-wide">
            Poznaj
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Naszą ekipę
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Poznaj ludzi, którzy codziennie pracują nad tym, żeby Twoje projekty były realizowane z 
            najwyższą jakością i dbałością o detale.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-6xl mx-auto mb-16">
          {teamMembersData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
      
      {/* Contact Section */}
      <TeamContact />
    </section>
  );
}