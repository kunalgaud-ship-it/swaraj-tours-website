import { methodNotAllowed, supabaseReady, supabaseRequest } from '../server/supabaseAdmin';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return methodNotAllowed(res, 'GET');
  res.setHeader('Cache-Control', 'no-store');
  if (!supabaseReady) return res.status(200).json({ config: {} });

  try {
    const response = await supabaseRequest('site_config?select=config&id=eq.1');
    if (!response.ok) throw new Error(`Site config read returned ${response.status}`);
    const rows = await response.json();
    return res.status(200).json({ config: rows[0]?.config ?? {} });
  } catch (error) {
    console.error('Public site config could not be loaded:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(200).json({ config: {} });
  }
}
