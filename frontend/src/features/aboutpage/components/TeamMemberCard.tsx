'use client';

import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { TeamMemberCardProps } from '../types';
import { cn } from '@/lib/utils';

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  const avatarBgClass = {
    black: 'bg-gray-800',
    primary: 'bg-primary',
    gray: 'bg-gray-600'
  }[member.avatarBgColor];

  return (
    <div className={cn(
      "text-center space-y-4",
      className
    )}>
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center overflow-hidden",
          avatarBgClass
        )}>
          <Image
            src={member.avatar}
            alt={member.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      {/* Name */}
      <h3 className="text-xl font-bold text-gray-900">
        {member.name}
      </h3>
      
      {/* Role */}
      <p className="text-sm text-gray-600 font-medium">
        {member.role}
      </p>
      
      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {member.description}
      </p>
      
      {/* Contact Info */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-center space-x-2">
          <EnvelopeIcon className="w-4 h-4 text-primary" />
          <a 
            href={`mailto:${member.email}`}
            className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
          >
            {member.email}
          </a>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <PhoneIcon className="w-4 h-4 text-primary" />
          <a 
            href={`tel:${member.phone.replace(/\s/g, '')}`}
            className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
          >
            {member.phone}
          </a>
        </div>
      </div>
    </div>
  );
}