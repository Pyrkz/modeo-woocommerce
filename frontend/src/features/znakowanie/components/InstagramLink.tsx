// Instagram link component with animated gradient
'use client';

import React, { useMemo, useState } from 'react';
import { getFadeInUpStyles, getScaleStyles, getRotatingStyles, getBounceStyles } from '../utils/nativeAnimations';
import { useAnimationClasses } from '../hooks';

interface InstagramLinkProps {
  shouldAnimate: boolean;
  isInView: boolean;
}

export const InstagramLink = React.memo(({
  shouldAnimate,
  isInView
}: InstagramLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const { isVisible: containerVisible } = useAnimationClasses(isInView, shouldAnimate, 0.8);

  const containerStyle = useMemo(() => 
    getFadeInUpStyles(containerVisible, shouldAnimate, 0.8),
    [containerVisible, shouldAnimate]
  );

  const linkStyle = useMemo(() => 
    getScaleStyles(isHovered, isPressed, shouldAnimate),
    [isHovered, isPressed, shouldAnimate]
  );

  const rotatingStyle = useMemo(() => 
    getRotatingStyles(shouldAnimate),
    [shouldAnimate]
  );

  const bounceStyle = useMemo(() => 
    getBounceStyles(shouldAnimate),
    [shouldAnimate]
  );

  return (
    <div
      className="flex justify-center mt-6 sm:mt-8"
      style={containerStyle}
    >
      <a
        href="https://www.instagram.com/modeo_nadruki/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="group bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-0.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        style={linkStyle}
      >
        <div className="bg-white rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 group-hover:bg-gray-50 transition-colors">
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10 sm:w-6 sm:h-6">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#instagram-gradient)" strokeWidth="2"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instagram-gradient)" strokeWidth="2"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#instagram-gradient)" strokeWidth="2"/>
              <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Animated gradient background */}
            {shouldAnimate && (
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full opacity-20"
                style={rotatingStyle}
              />
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-xs sm:text-sm">
              Śledź nas na Instagram
            </span>
            <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
              @modeo_nadruki
            </span>
          </div>
          
          {shouldAnimate && (
            <div
              className="text-gray-400 group-hover:text-gray-600"
              style={bounceStyle}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                <path d="M7 17l9.2-9.2M17 17V7H7"/>
              </svg>
            </div>
          )}
        </div>
      </a>
    </div>
  );
});

InstagramLink.displayName = 'InstagramLink';