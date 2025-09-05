'use client';

import { memo } from 'react';
import { CompleteContactSection } from '@/features/contact';
import { getTeamMemberByName } from '@/features/team';
import type { TeamMember } from '@/features/team/types';

interface TechniquePageLayoutProps {
  title: string;
  description: string;
  tagline: string;
  backgroundColor?: 'gray' | 'white';
  children?: React.ReactNode;
  expertName?: string;
}

const TechniquePageLayout = memo(({
  title,
  description,
  tagline,
  backgroundColor = 'gray',
  children,
  expertName = 'Anna Pawlak' // Default expert for production/techniques
}: TechniquePageLayoutProps) => {
  const expert = getTeamMemberByName(expertName);
  
  if (!expert) {
    console.warn(`Team member "${expertName}" not found, using fallback`);
    // Fallback team member
    const fallbackExpert: TeamMember = {
      id: 'fallback-expert',
      name: 'Specjalista Modeo',
      position: 'Specjalista ds. znakowania',
      email: 'kontakt@modeo.pl',
      phone: '+48 123 456 789',
      image: '/team/default-avatar.jpg',
      description: 'Nasz doświadczony specjalista pomoże Ci w realizacji projektu znakowania.'
    };
    
    return (
      <main className="min-h-screen">
        {children}
        <CompleteContactSection
          teamMember={fallbackExpert}
          tagline={tagline}
          title={title}
          description={description}
          backgroundColor={backgroundColor}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {children}
      <CompleteContactSection
        teamMember={expert}
        tagline={tagline}
        title={title}
        description={description}
        backgroundColor={backgroundColor}
      />
    </main>
  );
});

TechniquePageLayout.displayName = 'TechniquePageLayout';

export default TechniquePageLayout;