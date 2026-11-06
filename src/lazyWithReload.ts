import { lazy, type ComponentType } from 'react';

/**
 * React.lazy that survives deployments: when a visitor still has an old index.html cached and a
 * code-split chunk no longer exists, the import fails and the page would stay blank. Instead we
 * reload once so the browser picks up the fresh file list.
 */
export function lazyWithReload<T extends ComponentType<any>>(importer: () => Promise<{ default: T }>) {
  return lazy(() =>
    importer().catch((error: unknown) => {
      const key = 'swaraj-chunk-reload';
      let alreadyReloaded = false;
      try {
        alreadyReloaded = sessionStorage.getItem(key) === '1';
        if (!alreadyReloaded) sessionStorage.setItem(key, '1');
      } catch {
        // storage unavailable; fall through to a single reload attempt
      }
      if (!alreadyReloaded) {
        window.location.reload();
        return new Promise<{ default: T }>(() => undefined); // never resolves; page is reloading
      }
      throw error;
    }),
  );
}
