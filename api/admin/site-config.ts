import {
  adminRequired,
  backendNotConfigured,
  isAdminRequest,
  methodNotAllowed,
  supabaseReady,
  supabaseRequest,
} from '../../server/supabaseAdmin';

const ALLOWED_KEYS = new Set([
  'companyInfo', 'vehicles', 'routes', 'routeHubs', 'packages', 'destinations',
  'services', 'reviews', 'faqs', 'offers', 'travelGuides',
]);

export default async function handler(req: any, res: any) {
  if (!['GET', 'PUT'].includes(req.method)) return methodNotAllowed(res, 'GET, PUT');
  res.setHeader('Cache-Control', 'no-store');
  if (!supabaseReady) return backendNotConfigured(res);
  if (!(await isAdminRequest(req))) return adminRequired(res);

  if (req.method === 'GET') {
    try {
      const response = await supabaseRequest('site_config?select=config&id=eq.1');
      if (!response.ok) throw new Error(`Site config read returned ${response.status}`);
      const rows = await response.json();
      return res.status(200).json({ config: rows[0]?.config ?? {} });
    } catch {
      return res.status(502).json({ error: 'Could not load website content.' });
    }
  }

  const config = req.body?.config;
  if (!config || typeof config !== 'object' || Array.isArray(config) ||
      Object.keys(config).some((key) => !ALLOWED_KEYS.has(key)) ||
      Buffer.byteLength(JSON.stringify(config), 'utf8') > 1_500_000) {
    return res.status(400).json({ error: 'Website content is not valid or exceeds the size limit.' });
  }

  try {
    const response = await supabaseRequest('site_config?on_conflict=id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ id: 1, config, updated_at: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Site config save returned ${response.status}`);
    return res.status(200).json({ saved: true });
  } catch {
    return res.status(502).json({ error: 'Could not save website content. Check the database setup.' });
  }
}
