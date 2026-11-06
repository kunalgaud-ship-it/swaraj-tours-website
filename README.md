# Swaraj Cab – website

Nashik cab, outstation taxi and tour package website. React 19 + Vite + Tailwind, with Vercel serverless functions in `api/` for booking and inquiry emails and the admin panel.

## Run locally

```
npm install
npm run dev        # http://localhost:3000
npm run lint       # TypeScript check
npm run build      # production build into dist/ + prerendered SEO pages + sitemap
```

Node 20.19+ or 22 is required by Vite 8.

## Environment variables

Copy `.env.example` to `.env` for local work. On Vercel, add the same keys under Project → Settings → Environment Variables.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Final public domain, e.g. `https://swarajcab.in`. Needed at build time for canonical URLs, `sitemap.xml`, absolute social-preview images and structured data. |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps JavaScript + Places key. Restrict it to this domain (HTTP referrers) in Google Cloud Console. |
| `RESEND_API_KEY`, `BOOKING_FROM_EMAIL`, `BOOKING_NOTIFICATION_EMAIL` | Booking and inquiry emails. `BOOKING_FROM_EMAIL` must use a domain verified in Resend. Until these are set, forms fall back to WhatsApp. |
| `SUPABASE_*`, `VITE_SUPABASE_*` | Admin panel at `/admin` and the booking inbox. See `ADMIN_SETUP.md`. |

## Preview on GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes `dist/` to https://kunalgaud-ship-it.github.io/swaraj-tours-website/ on every push to `main` (repo must be public, Settings → Pages → Source: GitHub Actions). Add `VITE_GOOGLE_MAPS_API_KEY` under Settings → Secrets → Actions so the map and city autocomplete work. The `api/` functions do not run there, so the booking and inquiry forms hand off to WhatsApp. Use Vercel for the real launch.

The build serves from a sub-folder via `BASE_PATH`; leave it unset on Vercel or a custom domain.

## Pages

Routes and their titles / descriptions live in `src/pageMeta.js`; the build prerenders one `index.html` per route so each page has its own meta tags. `/policies` is the crawlable copy of the Terms, Privacy and Refund text shown in the footer modal.

## Images

Photos are bundled from `src/assets/images`. After adding new photos, run `npm run optimize-images` to resize them to 1600px and recompress. Attribution for Wikimedia Commons photos is in `public/photo-credits.html`.

## Launch checklist

1. Set `SITE_URL` and the keys above on Vercel, then redeploy.
2. Verify the domain in Google Search Console and submit `https://<domain>/sitemap.xml`.
3. Create the Google Business Profile (see `google-business-profile.md`) and paste its review and Maps links into `googleReviewUrl` / `googleMapsUrl` in `src/data/travelData.ts` or via the admin panel.
4. Send one real booking and one contact inquiry from the live site and confirm both emails arrive.
5. Run PageSpeed Insights on the homepage and the Services page.
