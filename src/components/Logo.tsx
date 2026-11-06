import React from 'react';

interface LogoProps {
  /** Retained for existing call sites; the new logo has its own navy and amber colors. */
  theme?: 'dark' | 'light';
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LOGO_WIDTH = {
  sm: 'w-44',
  md: 'w-52 sm:w-60',
  lg: 'w-60 sm:w-64',
};

/** Shivraj Cab wordmark based on the supplied navy, amber and car logo. */
export const Logo: React.FC<LogoProps> = ({ theme = 'dark', size = 'md', className = '' }) => (
  <img
    src={`${import.meta.env.BASE_URL}assets/${theme === 'light' ? 'logo-shivraj-v9-light.svg' : 'logo-shivraj-v9.svg'}`}
    alt="Shivraj Cab — Reliable, Safe, Travel"
    width={720}
    height={184}
    className={`block h-auto aspect-[90/23] object-contain ${LOGO_WIDTH[size]} max-w-full ${theme === 'light' ? 'rounded-xl shadow-md' : ''} ${className}`}
    decoding="async"
  />
);
