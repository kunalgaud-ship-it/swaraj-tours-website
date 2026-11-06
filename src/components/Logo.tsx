import React from 'react';

/**
 * Brand mark: a navy coin with an amber "S" road and two route markers.
 * Drawn inline so it stays crisp at any size and needs no extra request.
 */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-11 w-11' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="swaraj-coin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1e3a5f" />
        <stop offset="1" stopColor="#0b1a2e" />
      </linearGradient>
      <linearGradient id="swaraj-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#swaraj-coin)" />
    <circle cx="50" cy="50" r="42.5" fill="none" stroke="#ffffff" strokeOpacity=".14" strokeWidth="1.5" />
    <path
      d="M66 27H42a11 11 0 0 0 0 22h16a11 11 0 0 1 0 22H34"
      fill="none"
      stroke="url(#swaraj-gold)"
      strokeWidth="15"
      strokeLinecap="round"
    />
    <path
      d="M66 27H42a11 11 0 0 0 0 22h16a11 11 0 0 1 0 22H34"
      fill="none"
      stroke="#0b1a2e"
      strokeOpacity=".75"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeDasharray="4.5 5"
    />
    <circle cx="66" cy="27" r="6" fill="#ffffff" />
    <circle cx="66" cy="27" r="2.4" fill="#0b1a2e" />
    <circle cx="34" cy="71" r="6" fill="#ffffff" />
    <circle cx="34" cy="71" r="2.4" fill="#0b1a2e" />
  </svg>
);

interface LogoProps {
  /** 'dark' text for light backgrounds (default), 'light' for the dark footer. */
  theme?: 'dark' | 'light';
  /** Show the small "NASHIK · 24/7 CAB SERVICE" line. */
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: { mark: 'h-9 w-9', name: 'text-[18px]', tag: 'text-[8px]' },
  md: { mark: 'h-11 w-11', name: 'text-[22px]', tag: 'text-[9px]' },
  lg: { mark: 'h-14 w-14', name: 'text-[28px]', tag: 'text-[10px]' },
};

/** Full logo: mark + "SWARAJ CAB" wordmark in the site font, with a taxi-checker rule and tagline. */
export const Logo: React.FC<LogoProps> = ({ theme = 'dark', tagline = true, size = 'md', className = '' }) => {
  const s = SIZES[size];
  const light = theme === 'light';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${s.mark} shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`${s.name} font-black tracking-tight whitespace-nowrap`}>
          <span className={light ? 'text-white' : 'text-slate-900'}>SWARAJ</span>
          <span className="text-amber-500"> CAB</span>
        </span>
        <span
          aria-hidden="true"
          className="mt-1 block h-[4px] w-full rounded-sm"
          style={{ backgroundImage: `repeating-linear-gradient(90deg, ${light ? '#f8fafc' : '#0f172a'} 0 4px, #f59e0b 4px 8px)` }}
        />
        {tagline && (
          <span className={`mt-1 ${s.tag} font-bold tracking-[0.22em] whitespace-nowrap ${light ? 'text-slate-400' : 'text-slate-500'}`}>
            NASHIK · 24/7 CAB SERVICE
          </span>
        )}
      </span>
    </span>
  );
};
