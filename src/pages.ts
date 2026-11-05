/**
 * Site pages (routes) and which section ids live on each page.
 * Navigation anywhere in the app calls onNavigate(sectionId); the router
 * looks up the page here, switches to it, then scrolls to the section.
 */
import { PAGE_META } from './pageMeta.js';

export type PagePath = '/' | '/services' | '/packages' | '/about' | '/contact' | '/policies';

export interface PageMeta {
  path: PagePath;
  label: string;
  title: string;
  description: string;
  sections: string[];
}

export const PAGES: PageMeta[] = PAGE_META as PageMeta[];

export const HOME: PageMeta = PAGES[0];

export function pageForSection(sectionId: string): PageMeta {
  return PAGES.find((p) => p.sections.includes(sectionId)) ?? HOME;
}

export function pageForPath(pathname: string): PageMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PAGES.find((p) => p.path === clean) ?? HOME;
}

/** True when the URL is one of our real pages; anything else gets the 404 view instead of a soft-404 homepage. */
export function isKnownPath(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PAGES.some((p) => p.path === clean);
}
