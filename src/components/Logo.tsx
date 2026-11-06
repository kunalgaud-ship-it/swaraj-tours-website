import React from 'react';

interface LogoProps {
  /** Retained for existing call sites; the new logo has its own navy and amber colors. */
  theme?: 'dark' | 'light';
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LOGO_WIDTH = {
  sm: 'w-40',
  md: 'w-52',
  lg: 'w-60',
};

/** Shivraj Cab wordmark based on the supplied navy, amber and car logo. */
export const Logo: React.FC<LogoProps> = ({ theme = 'dark', size = 'md', className = '' }) => (
  <img
    src={`${import.meta.env.BASE_URL}assets/logo-shivraj.svg`}
    alt="Shivraj Cab — Reliable, Safe, Travel"
    className={`block h-auto ${LOGO_WIDTH[size]} max-w-full ${theme === 'light' ? 'rounded-lg bg-slate-100 p-1.5' : ''} ${className}`}
    decoding="async"
  />
);
