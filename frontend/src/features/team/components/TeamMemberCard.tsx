'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TeamMemberCardProps } from '../types';

export function TeamMemberCard({ member, className = '' }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const currentImage = member.imageHover && isHovered && !imageError 
    ? member.imageHover 
    : member.image;

  return (
    <div className={`relative bg-gray-50 rounded-3xl p-8 text-center ${className}`}>
      {/* Contact Info Pills */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
          <a 
            href={`mailto:${member.email}`}
            className="text-gray-700 font-medium hover:text-red-600 transition-colors"
          >
            {member.email}
          </a>
        </div>
        <div className="bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
          <a 
            href={`tel:${member.phone.replace(/\s/g, '')}`}
            className="text-gray-700 font-medium hover:text-red-600 transition-colors"
          >
            {member.phone}
          </a>
        </div>
      </div>

      {/* Avatar */}
      <div 
        className="relative w-64 h-64 mx-auto mb-8 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
          <Image
            src={currentImage}
            alt={member.name}
            width={256}
            height={256}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={handleImageError}
            priority
          />
        </div>
      </div>

      {/* Name and Position */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-900">
          {member.name}
        </h3>
        <h4 className="text-xl font-semibold text-red-600 mb-4">
          {member.position}
        </h4>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          {member.description}
        </p>
      </div>

      {/* Quick Contact Buttons */}
      <div className="flex gap-4 justify-center mt-8">
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Email
        </a>
        <a
          href={`tel:${member.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Zadzwoń
        </a>
      </div>
    </div>
  );
}