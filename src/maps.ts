/// <reference types="@types/google.maps" />
/**
 * Google Maps is loaded on demand (first focus on a location field, or when a map is shown),
 * not on page load. That keeps ~1 MB of Maps JavaScript off the critical path.
 */
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
export const GOOGLE_MAPS_OPTIONS = { region: 'IN', language: 'en', libraries: ['places'] as string[] };

declare global {
  interface Window {
    google?: typeof google;
  }
}

let bootstrapPromise: Promise<void> | null = null;

/** Injects Google's bootstrap loader once and resolves when `google.maps.importLibrary` is available. */
export function loadGoogleMaps(): Promise<void> {
  if (typeof window.google?.maps?.importLibrary === 'function') return Promise.resolve();
  if (bootstrapPromise) return bootstrapPromise;
  if (!GOOGLE_MAPS_API_KEY) return Promise.reject(new Error('Google Maps API key is not configured.'));

  bootstrapPromise = new Promise<void>((resolve, reject) => {
    const params = new URLSearchParams({
      key: GOOGLE_MAPS_API_KEY,
      v: 'weekly',
      region: GOOGLE_MAPS_OPTIONS.region,
      language: GOOGLE_MAPS_OPTIONS.language,
      libraries: GOOGLE_MAPS_OPTIONS.libraries.join(','),
      loading: 'async',
      callback: '__swarajMapsReady',
    });
    (window as unknown as Record<string, unknown>).__swarajMapsReady = () => resolve();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => {
      bootstrapPromise = null;
      reject(new Error('Google Maps script failed to load.'));
    };
    document.head.appendChild(script);
  });
  return bootstrapPromise;
}

/** Loads the Places library lazily. */
export async function loadPlacesLibrary(): Promise<google.maps.PlacesLibrary> {
  await loadGoogleMaps();
  return (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;
}
