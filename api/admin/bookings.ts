import {
  adminRequired,
  backendNotConfigured,
  isAdminRequest,
  methodNotAllowed,
  supabaseReady,
  supabaseRequest,
} from '../../server/supabaseAdmin';

const ALLOWED_STATUSES = new Set(['new', 'contacted', 'confirmed', 'completed', 'cancelled']);

export default async function handler(req: any, res: any) {
  if (!['GET', 'PATCH'].includes(req.method)) return methodNotAllowed(res, 'GET, PATCH');
  res.setHeader('Cache-Control', 'no-store');
  if (!supabaseReady) return backendNotConfigured(res);
  if (!(await isAdminRequest(req))) return adminRequired(res);

  if (req.method === 'GET') {
    try {
      const response = await supabaseRequest(
        'booking_requests?select=*&order=created_at.desc&limit=500',
      );
      if (!response.ok) throw new Error(`Bookings read returned ${response.status}`);
      return res.status(200).json({ bookings: await response.json() });
    } catch {
      return res.status(502).json({ error: 'Could not load booking enquiries.' });
    }
  }

  const id = typeof req.body?.id === 'string' ? req.body.id : '';
  const status = typeof req.body?.status === 'string' ? req.body.status : '';
  if (!/^[0-9a-f-]{36}$/i.test(id) || !ALLOWED_STATUSES.has(status)) {
    return res.status(400).json({ error: 'Booking or status is not valid.' });
  }

  try {
    const response = await supabaseRequest(`booking_requests?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Booking update returned ${response.status}`);
    return res.status(200).json({ saved: true });
  } catch {
    return res.status(502).json({ error: 'Could not update the booking status.' });
  }
}
