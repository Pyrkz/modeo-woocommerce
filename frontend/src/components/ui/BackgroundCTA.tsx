'use client';

import { memo, ReactNode } from 'react';
import Link from 'next/link';

interface BackgroundCTAProps {
  backgroundText?: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'light';
}

const BackgroundCTA = memo(({
  backgroundText = 'modeo',
  title,
  subtitle,
  buttonText,
  buttonHref,
  onClick,
  children,
  className = '',
  variant = 'default'
}: BackgroundCTAProps) => {
  const variantClasses = {
    default: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    light: 'bg-white text-gray-900'
  };

  const backgroundTextClasses = {
    default: 'text-transparent',
    dark: 'text-transparent',
    light: 'text-transparent'
  };

  const backgroundStrokeClasses = {
    default: 'stroke-gray-300',
    dark: 'stroke-gray-700', 
    light: 'stroke-gray-200'
  };

  const buttonClasses = {
    default: 'bg-red-600 hover:bg-red-700 text-white',
    dark: 'bg-red-600 hover:bg-red-700 text-white', 
    light: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <section className={`
      relative py-16 lg:py-20 overflow-hidden
      ${variantClasses[variant]}
      ${className}
    `}>
      {/* Background Text with Stroke */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg 
          className="w-full h-full max-w-none" 
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className={`
              ${backgroundTextClasses[variant]}
              ${backgroundStrokeClasses[variant]}
              fill-transparent stroke-1 opacity-30
              font-black tracking-wider
              select-none
            `}
            style={{
              fontSize: 'clamp(80px, 15vw, 180px)',
              strokeWidth: '1px'
            }}
          >
            {backgroundText}
          </text>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Custom children content */}
        {children}

        {/* Button */}
        {(buttonText && (buttonHref || onClick)) && (
          <div className="mt-8">
            {buttonHref ? (
              <Link
                href={buttonHref}
                className={`
                  inline-flex items-center px-8 py-4
                  ${buttonClasses[variant]}
                  font-medium text-lg rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  shadow-lg hover:shadow-xl
                `}
              >
                {buttonText}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            ) : (
              <button
                onClick={onClick}
                className={`
                  inline-flex items-center px-8 py-4
                  ${buttonClasses[variant]}
                  font-medium text-lg rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  shadow-lg hover:shadow-xl
                `}
              >
                {buttonText}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
});

BackgroundCTA.displayName = 'BackgroundCTA';

export default BackgroundCTA;