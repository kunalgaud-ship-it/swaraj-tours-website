import {
  COMPANY_INFO,
  DESTINATIONS,
  FAQS,
  OFFERS,
  POPULAR_ROUTES,
  REVIEWS,
  ROUTE_HUBS,
  SERVICES,
  TOUR_PACKAGES,
  TRAVEL_GUIDES,
  VEHICLES,
} from '../data/travelData';
import type {
  Destination,
  FaqItem,
  Offer,
  PopularRoute,
  Review,
  RouteHub,
  ServiceItem,
  TourPackage,
  TravelGuide,
  Vehicle,
} from '../types/travel';

export type SiteConfig = {
  companyInfo?: Partial<typeof COMPANY_INFO>;
  vehicles?: Vehicle[];
  routes?: PopularRoute[];
  routeHubs?: RouteHub[];
  packages?: TourPackage[];
  destinations?: Destination[];
  services?: ServiceItem[];
  reviews?: Review[];
  faqs?: FaqItem[];
  offers?: Offer[];
  travelGuides?: TravelGuide[];
};

export type CollectionKey = Exclude<keyof SiteConfig, 'companyInfo'>;

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const COLLECTIONS: { key: CollectionKey; target: object[] }[] = [
  { key: 'vehicles', target: VEHICLES },
  { key: 'routes', target: POPULAR_ROUTES },
  { key: 'routeHubs', target: ROUTE_HUBS },
  { key: 'packages', target: TOUR_PACKAGES },
  { key: 'destinations', target: DESTINATIONS },
  { key: 'services', target: SERVICES },
  { key: 'reviews', target: REVIEWS },
  { key: 'faqs', target: FAQS },
  { key: 'offers', target: OFFERS },
  { key: 'travelGuides', target: TRAVEL_GUIDES },
];

export function applySiteConfig(config: SiteConfig) {
  if (config.companyInfo && typeof config.companyInfo === 'object') {
    Object.assign(COMPANY_INFO, config.companyInfo);
  }

  for (const { key, target } of COLLECTIONS) {
    const records = config[key];
    if (!Array.isArray(records)) continue;

    const currentById = new Map(target.map((item) => [String((item as { id?: string }).id), item]));
    const merged = records.map((record) => {
      const id = String((record as { id?: string }).id ?? '');
      const current = currentById.get(id);
      return current ? { ...current, ...record } : record;
    });
    target.splice(0, target.length, ...merged);
  }
}

export function getEditableSiteConfig(): SiteConfig {
  return {
    companyInfo: clone(COMPANY_INFO),
    vehicles: clone(VEHICLES),
    routes: clone(POPULAR_ROUTES),
    routeHubs: clone(ROUTE_HUBS),
    packages: clone(TOUR_PACKAGES),
    destinations: clone(DESTINATIONS),
    services: clone(SERVICES),
    reviews: clone(REVIEWS),
    faqs: clone(FAQS),
    offers: clone(OFFERS),
    travelGuides: clone(TRAVEL_GUIDES),
  };
}

/** Keep bundled image imports out of the database; unchanged images remain bundled. */
export function stripBundledImageUrls(config: SiteConfig): SiteConfig {
  const result = clone(config);
  for (const { key, target } of COLLECTIONS) {
    const records = result[key];
    if (!Array.isArray(records)) continue;
    const bundledById = new Map(target.map((item) => [String((item as { id?: string }).id), (item as { image?: string }).image]));
    result[key] = records.map((record) => {
      const next = { ...record } as Record<string, unknown>;
      if (next.image && next.image === bundledById.get(String(next.id))) delete next.image;
      return next;
    }) as never;
  }
  return result;
}
