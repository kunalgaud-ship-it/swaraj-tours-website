import 'dotenv/config';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_META } from '../src/pageMeta.js';

const newline = String.fromCharCode(10);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sourceHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
const configuredSiteUrl = process.env.SITE_URL?.trim();
const isPlaceholderUrl = configuredSiteUrl && /your-domain\.com|example\.com/i.test(configuredSiteUrl);
// Keep any sub-folder (GitHub Pages: https://user.github.io/repo), drop the trailing slash.
const siteUrl = configuredSiteUrl && !isPlaceholderUrl ? new URL(configuredSiteUrl).href.replace(/\/+$/, '') : '';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]));

const replaceMeta = (html, attribute, key, value) => {
  const marker = `<meta ${attribute}="${key}"`;
  const start = html.indexOf(marker);
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  if (start >= 0) {
    const end = html.indexOf('>', start);
    return `${html.slice(0, start)}${tag}${html.slice(end + 1)}`;
  }
  const headEnd = html.indexOf('</head>');
  return `${html.slice(0, headEnd)}    ${tag}${newline}  ${html.slice(headEnd)}`;
};

for (const page of PAGE_META) {
  let html = sourceHtml;
  const titleStart = html.indexOf('<title>');
  const titleEnd = html.indexOf('</title>', titleStart);
  html = `${html.slice(0, titleStart)}<title>${escapeHtml(page.title)}</title>${html.slice(titleEnd + 8)}`;
  html = replaceMeta(html, 'name', 'description', page.description);
  html = replaceMeta(html, 'property', 'og:title', page.title);
  html = replaceMeta(html, 'property', 'og:description', page.description);
  html = replaceMeta(html, 'name', 'twitter:title', page.title);
  html = replaceMeta(html, 'name', 'twitter:description', page.description);

  const canonical = siteUrl ? `${siteUrl}${page.path}` : '';
  const canonicalTag = canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}" />` : '';
  const ogUrlTag = canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}" />` : '';
  if (canonical) {
    html = html.replace('</head>', `    ${ogUrlTag}${newline}    ${canonicalTag}${newline}  </head>`);
  }
  if (siteUrl) {
    html = replaceMeta(html, 'property', 'og:image', `${siteUrl}/og-cab.jpg`);
    html = replaceMeta(html, 'name', 'twitter:image', `${siteUrl}/og-cab.jpg`);
    // Absolute URLs inside the LocalBusiness structured data.
    html = html.replace(/"__SITE_URL__"/g, JSON.stringify(siteUrl));
    html = html.replace(/"__SITE_URL__\/og-cab\.jpg"/g, JSON.stringify(`${siteUrl}/og-cab.jpg`));
  } else {
    // No domain yet: drop the url/image lines rather than ship placeholders.
    html = html.replace(/^\s*"(url|image)": "__SITE_URL__[^"]*",\r?\n/gm, '');
  }

  const outputPath = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

// Static hosts (GitHub Pages) serve 404.html for unknown URLs; the app then renders its own 404 view.
const notFoundHtml = sourceHtml
  .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found | Swaraj Tours</title>')
  .replace('</head>', `    <meta name="robots" content="noindex" />${newline}  </head>`);
await writeFile(path.join(dist, '404.html'), notFoundHtml, 'utf8');

const robots = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin',
  'Disallow: /api/',
  ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : []),
].join(newline) + newline;
await writeFile(path.join(dist, 'robots.txt'), robots, 'utf8');

if (siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = PAGE_META.map((page) => `  <url><loc>${escapeHtml(`${siteUrl}${page.path}`)}</loc><lastmod>${lastmod}</lastmod></url>`).join(newline);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${newline}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${newline}${urls}${newline}</urlset>${newline}`;
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`Generated prerendered SEO pages and sitemap for ${siteUrl}`);
} else {
  console.log('Generated prerendered SEO pages. Set SITE_URL to generate canonical URLs and sitemap.xml.');
}
