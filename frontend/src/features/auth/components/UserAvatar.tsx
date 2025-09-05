'use client';

import Image from 'next/image';
import { formatUserDisplayName, getUserInitials } from '../../../lib/utils';
import { User } from '../../../types/auth';

interface UserAvatarProps {
  user: User;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showName?: boolean;
}

export function UserAvatar({ 
  user, 
  size = 'md', 
  className = '',
  showName = false 
}: UserAvatarProps) {
  const displayName = formatUserDisplayName(user);
  const userInitials = getUserInitials(user);
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm', 
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {user.avatar ? (
        <Image 
          src={user.avatar} 
          alt={displayName}
          width={64}
          height={64}
          className={`rounded-full object-cover ${sizeClasses[size]}`}
        />
      ) : (
        <div className={`rounded-full bg-primary text-white flex items-center justify-center font-semibold ${sizeClasses[size]}`}>
          {userInitials}
        </div>
      )}
      
      {showName && (
        <span className={`font-medium text-gray-700 ${textSizes[size]}`}>
          {displayName}
        </span>
      )}
    </div>
  );
}