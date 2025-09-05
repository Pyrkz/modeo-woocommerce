import { forwardRef } from 'react';
import Image from 'next/image';
import { cn, getUserInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  user?: {
    firstName?: string;
    lastName?: string;
    name?: string;
  };
  fallback?: string;
}

const avatarSizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', user, fallback, ...props }, ref) => {
    const initials = user ? getUserInitials(user) : fallback || '?';

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          'bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold',
          'overflow-hidden select-none',
          avatarSizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || 'Avatar'}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            onError={(e) => {
              // Hide image on error, show initials fallback
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span className="font-medium">{initials}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';