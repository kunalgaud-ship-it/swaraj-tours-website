/**
 * Site pages (routes) and which section ids live on each page.
 * Navigation anywhere in the app calls onNavigate(sectionId); the router
 * looks up the page here, switches to it, then scrolls to the section.
 */
import { PAGE_META } from './pageMeta.js';

export type PagePath = '/' | '/services' | '/nashik-airport-cabs' | '/packages' | '/about' | '/contact' | '/policies';

export interface PageMeta {
  path: PagePath;
  label: string;
  title: string;
  description: string;
  sections: string[];
}

export const PAGES: PageMeta[] = PAGE_META as PageMeta[];

export const HOME: PageMeta = PAGES[0];

/**
 * Sub-folder the site is served from, without a trailing slash: '' on Vercel / a custom domain,
 * '/swaraj-tours-website' on GitHub Pages (set through BASE_PATH at build time, see vite.config.ts).
 */
export const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** Prefix a site-root path ('/', '/services', '/og-cab.jpg') with the deployment base. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Remove the deployment base from window.location.pathname so routing sees '/services' etc. */
export function stripBase(pathname: string): string {
  const stripped = BASE_PATH && pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
  return stripped.replace(/\/+$/, '') || '/';
}

/**
 * Given an absolute page URL written by the prerender step (e.g. https://host/base/services),
 * return the site base (https://host/base) by removing the known page path.
 */
export function siteBaseFromUrl(href: string): string {
  const clean = href.replace(/\/+$/, '');
  for (const p of PAGES) {
    if (p.path !== '/' && clean.endsWith(p.path)) return clean.slice(0, -p.path.length);
  }
  return clean;
}

export function pageForSection(sectionId: string): PageMeta {
  return PAGES.find((p) => p.sections.includes(sectionId)) ?? HOME;
}

export function pageForPath(pathname: string): PageMeta {
  const clean = stripBase(pathname);
  return PAGES.find((p) => p.path === clean) ?? HOME;
}

/** True when the URL is one of our real pages; anything else gets the 404 view instead of a soft-404 homepage. */
export function isKnownPath(pathname: string): boolean {
  return PAGES.some((p) => p.path === stripBase(pathname));
}
