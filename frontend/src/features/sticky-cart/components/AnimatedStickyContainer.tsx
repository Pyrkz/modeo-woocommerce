'use client';

import { memo, ReactNode } from 'react';
import { AnimationType } from '../types/animations';

interface AnimatedStickyContainerProps {
  children: ReactNode;
  isVisible: boolean;
  animationType?: AnimationType;
  className?: string;
  role?: string;
  ariaLabel?: string;
}

/**
 * Animated container for sticky cart components with multiple animation types
 * Optimized for 60fps performance with GPU acceleration
 */
export const AnimatedStickyContainer = memo<AnimatedStickyContainerProps>(({
  children,
  isVisible,
  animationType = 'slide',
  className = '',
  role = 'toolbar',
  ariaLabel
}) => {
  const getAnimationClasses = () => {
    const baseClasses = `
      fixed bottom-0 left-0 right-0 z-50 
      bg-white border-t border-gray-100 
      shadow-[0_-2px_12px_rgba(0,0,0,0.06)]
      safe-area-inset-bottom
      will-change-transform
    `;

    switch (animationType) {
      case 'slide':
        return `
          ${baseClasses}
          transform transition-all duration-300 cubic-bezier(0.25, 0.1, 0.25, 1)
          ${isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
          }
        `;
        
      case 'bounce':
        return `
          ${baseClasses}
          transform transition-all duration-600 cubic-bezier(0.68, -0.55, 0.265, 1.55)
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95'
          }
        `;
        
      case 'fade-scale':
        return `
          ${baseClasses}
          transform transition-all duration-400 cubic-bezier(0.25, 0.46, 0.45, 0.94)
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-90'
          }
        `;
        
      case 'flip':
        return `
          ${baseClasses}
          transform transition-all duration-500 cubic-bezier(0.215, 0.61, 0.355, 1)
          transform-style-preserve-3d
          ${isVisible 
            ? 'translate-y-0 opacity-100 rotateX-0' 
            : 'translate-y-full opacity-0 rotateX-90'
          }
        `;
        
      case 'elastic':
        return `
          ${baseClasses}
          transform transition-all duration-800 cubic-bezier(0.68, -0.6, 0.32, 1.6)
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-80'
          }
        `;
        
      case 'glow':
        return `
          ${baseClasses}
          transform transition-all duration-450 cubic-bezier(0.19, 1, 0.22, 1)
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100 shadow-[0_-4px_20px_rgba(59,130,246,0.15)]' 
            : 'translate-y-full opacity-0 scale-95 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]'
          }
        `;
        
      default:
        return baseClasses;
    }
  };

  const getInnerAnimationClasses = () => {
    if (!isVisible) return 'transform scale-95 opacity-75';
    
    switch (animationType) {
      case 'bounce':
        return 'transform scale-100 opacity-100 animate-[bounceIn_0.6s_ease-out]';
      case 'fade-scale':
        return 'transform scale-100 opacity-100 animate-[fadeScaleIn_0.4s_ease-out]';
      case 'elastic':
        return 'transform scale-100 opacity-100 animate-[elasticIn_0.8s_ease-out]';
      case 'glow':
        return 'transform scale-100 opacity-100 animate-[glowIn_0.45s_ease-out]';
      default:
        return 'transform scale-100 opacity-100';
    }
  };

  return (
    <>
      {/* Custom keyframes styles */}
      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.3) translateY(100%);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) translateY(-10px);
            opacity: 0.8;
          }
          70% {
            transform: scale(0.9) translateY(0);
            opacity: 0.9;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeScaleIn {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes elasticIn {
          0% {
            transform: scale(0.1) translateY(100%);
            opacity: 0;
          }
          60% {
            transform: scale(1.2) translateY(-15px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes glowIn {
          0% {
            transform: scale(0.9) translateY(50px);
            opacity: 0;
            box-shadow: 0 -4px 20px rgba(59, 130, 246, 0);
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 -4px 30px rgba(59, 130, 246, 0.2);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            box-shadow: 0 -4px 20px rgba(59, 130, 246, 0.15);
          }
        }

        .rotateX-0 {
          transform: rotateX(0deg);
        }
        
        .rotateX-90 {
          transform: rotateX(90deg);
        }
      `}</style>

      <div 
        className={`${getAnimationClasses()} ${className}`}
        role={role}
        aria-label={ariaLabel}
      >
        <div 
          className={`
            max-w-7xl mx-auto px-4 py-3 
            transition-all duration-300 ease-out
            ${getInnerAnimationClasses()}
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
});

AnimatedStickyContainer.displayName = 'AnimatedStickyContainer';