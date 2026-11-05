const env = (globalThis as typeof globalThis & {
  process?: { env: Record<string, string | undefined> };
}).process?.env ?? {};

const cleanUrl = (env.SUPABASE_URL || '').replace(/\/+$/, '');

export const supabaseReady = Boolean(
  cleanUrl && env.SUPABASE_PUBLISHABLE_KEY && env.SUPABASE_SECRET_KEY,
);

export function getSupabaseUrl() {
  return cleanUrl;
}

export function getPublishableKey() {
  return env.SUPABASE_PUBLISHABLE_KEY || '';
}

export function getBearerToken(req: any) {
  const authorization = req.headers?.authorization || req.headers?.Authorization || '';
  const match = typeof authorization === 'string' ? authorization.match(/^Bearer\s+(.+)$/i) : null;
  return match?.[1] || '';
}

export async function isAdminRequest(req: any) {
  const token = getBearerToken(req);
  if (!token || !cleanUrl || !env.SUPABASE_PUBLISHABLE_KEY) return false;

  try {
    const response = await fetch(`${cleanUrl}/auth/v1/user`, {
      headers: {
        apikey: env.SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return false;
    const user = await response.json();
    return user?.app_metadata?.role === 'admin';
  } catch {
    return false;
  }
}

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  if (!supabaseReady) throw new Error('Admin storage is not configured.');
  const headers = new Headers(init.headers);
  headers.set('apikey', env.SUPABASE_SECRET_KEY || '');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return fetch(`${cleanUrl}/rest/v1/${path}`, { ...init, headers });
}

export function methodNotAllowed(res: any, allow: string) {
  res.setHeader('Allow', allow);
  return res.status(405).json({ error: 'Method not allowed.' });
}

export function adminRequired(res: any) {
  return res.status(401).json({ error: 'Admin sign-in required.' });
}

export function backendNotConfigured(res: any) {
  return res.status(503).json({
    error: 'Admin storage is not configured. Complete the Supabase setup in ADMIN_SETUP.md.',
  });
}
