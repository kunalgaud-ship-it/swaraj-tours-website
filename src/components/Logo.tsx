import React from 'react';

/**
 * Brand mark: a navy coin with an amber "S" road and two route markers.
 * Drawn inline so it stays crisp at any size and needs no extra request.
 */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-11 w-11' }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="swaraj-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fde68a" />
        <stop offset=".5" stopColor="#f59e0b" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
      <radialGradient id="swaraj-coin" cx="50%" cy="35%" r="70%">
        <stop offset="0" stopColor="#2b4f7e" />
        <stop offset="1" stopColor="#0b1a2e" />
      </radialGradient>
      <linearGradient id="swaraj-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fde68a" />
        <stop offset=".45" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="swaraj-road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#64748b" stopOpacity=".0" />
        <stop offset="1" stopColor="#94a3b8" stopOpacity=".55" />
      </linearGradient>
      <radialGradient id="swaraj-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Gold ring and navy coin */}
    <circle cx="50" cy="50" r="49" fill="url(#swaraj-ring)" />
    <circle cx="50" cy="50" r="43.5" fill="url(#swaraj-coin)" />
    <circle cx="50" cy="50" r="43.5" fill="none" stroke="#ffffff" strokeOpacity=".12" strokeWidth="1" />
    {/* Road in perspective */}
    <path d="M18 88 L43 58 H57 L82 88 Z" fill="url(#swaraj-road)" />
    <path d="M50 64 V86" stroke="#ffffff" strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 4" />
    {/* Motion swooshes */}
    <path d="M12 52 q10-9 22-6" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeOpacity=".95" />
    <path d="M9 62 q9-6 18-5" fill="none" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" strokeOpacity=".6" />
    <path d="M88 52 q-10-9-22-6" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeOpacity=".95" />
    <path d="M91 62 q-9-6-18-5" fill="none" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" strokeOpacity=".6" />
    {/* Roof sign */}
    <rect x="40" y="25" width="20" height="7.5" rx="2.5" fill="url(#swaraj-body)" />
    <rect x="43" y="27.5" width="3" height="2.5" rx=".8" fill="#0b1a2e" />
    <rect x="48.5" y="27.5" width="3" height="2.5" rx=".8" fill="#0b1a2e" />
    <rect x="54" y="27.5" width="3" height="2.5" rx=".8" fill="#0b1a2e" />
    <rect x="48" y="32.5" width="4" height="3" fill="#b45309" />
    {/* Cabin */}
    <path d="M33 52 L38.5 38.5 Q39.5 35.5 42.5 35.5 H57.5 Q60.5 35.5 61.5 38.5 L67 52 Z" fill="url(#swaraj-body)" />
    <path d="M37 50 L41 40.5 Q41.5 39 43 39 H57 Q58.5 39 59 40.5 L63 50 Z" fill="#1e3a5f" />
    <path d="M43.5 40.5 L40.5 48 H45.5 L48.5 40.5 Z" fill="#ffffff" fillOpacity=".35" />
    {/* Mirrors */}
    <rect x="27" y="45" width="6" height="4" rx="1.5" fill="#f59e0b" />
    <rect x="67" y="45" width="6" height="4" rx="1.5" fill="#f59e0b" />
    {/* Lower body */}
    <rect x="28" y="51" width="44" height="20" rx="5" fill="url(#swaraj-body)" />
    <rect x="31" y="66" width="38" height="5" rx="2.5" fill="#d97706" />
    {/* Grille and plate */}
    <rect x="43" y="56" width="14" height="6" rx="1.5" fill="#0b1a2e" />
    <path d="M45 58h10M45 60h10" stroke="#f59e0b" strokeWidth=".8" strokeOpacity=".7" />
    <rect x="44" y="63.5" width="12" height="2.5" rx=".8" fill="#fffbeb" />
    {/* Headlights with glow */}
    <circle cx="36" cy="59" r="7" fill="url(#swaraj-glow)" />
    <circle cx="64" cy="59" r="7" fill="url(#swaraj-glow)" />
    <ellipse cx="36" cy="59" rx="4.2" ry="3.2" fill="#ffffff" />
    <ellipse cx="64" cy="59" rx="4.2" ry="3.2" fill="#ffffff" />
    {/* Wheels */}
    <rect x="30" y="70" width="9" height="6" rx="2" fill="#0b1a2e" />
    <rect x="61" y="70" width="9" height="6" rx="2" fill="#0b1a2e" />
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
      <LogoMark className={`${s.mark} shrink-0 drop-shadow-[0_2px_4px_rgba(11,26,46,0.35)]`} />
      <span className="flex flex-col leading-none">
        <span className={`${s.name} font-black tracking-tight whitespace-nowrap`}>
          <span className={light ? 'text-white' : 'text-slate-900'}>SWARAJ</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600"> CAB</span>
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
