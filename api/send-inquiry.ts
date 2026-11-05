/**
 * Receives the Contact page "Send an Online Booking Inquiry" form and the
 * "Need Assistance?" modal, and emails the details to the business inbox.
 */
const COMPANY_NAME = 'Swaraj Tours and Travels';
const DEFAULT_NOTIFICATION_EMAIL = 'shivrajtravels1@gmail.com';
const SOURCES = new Set(['contact', 'assistance']);
const env = (globalThis as typeof globalThis & {
  process?: { env: Record<string, string | undefined> };
}).process?.env ?? {};

const escapeHtml = (value: unknown) => {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return String(value ?? '').replace(/[&<>"']/g, (char) => entities[char]);
};

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!env.RESEND_API_KEY || !env.BOOKING_FROM_EMAIL) {
    return res.status(503).json({ error: 'Online inquiries are not configured yet. Please use WhatsApp or call us.' });
  }

  const body = req.body ?? {};
  const name = text(body.name, 100);
  const phone = text(body.phone, 30);
  const email = text(body.email, 254);
  const route = text(body.route, 200);
  const message = text(body.message, 2000);
  const source = SOURCES.has(body.source) ? body.source : 'contact';

  const validPhone = phone.length >= 8 && /^[+\d][\d\s().-]*$/.test(phone);
  const validEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !validPhone || !validEmail) {
    return res.status(400).json({ error: 'Please enter your name and a valid phone number.' });
  }

  const inquiryRef = `SWQ-${Date.now().toString(36).toUpperCase()}`;
  const label = source === 'assistance' ? 'Need Assistance request' : 'Contact page inquiry';
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e293b;max-width:640px;margin:auto">
      <h2>New ${label} · ${escapeHtml(inquiryRef)}</h2>
      <p><b>Name:</b> ${escapeHtml(name)}<br><b>Phone:</b> ${escapeHtml(phone)}<br><b>Email:</b> ${escapeHtml(email || 'Not provided')}</p>
      ${route ? `<p><b>Route / requirement:</b> ${escapeHtml(route)}</p>` : ''}
      <p><b>Message:</b><br>${escapeHtml(message || 'No message provided.').replace(/\n/g, '<br>')}</p>
      <p style="color:#64748b;font-size:13px">Sent from the ${COMPANY_NAME} website.</p>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.BOOKING_FROM_EMAIL,
        to: [env.BOOKING_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL],
        subject: `${label} · ${inquiryRef} · ${name}`,
        html,
        ...(email ? { reply_to: email } : {}),
      }),
    });
    if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
    return res.status(200).json({ inquiryRef });
  } catch (error) {
    console.error('Inquiry email delivery failed:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(502).json({ error: 'We could not send your inquiry. Please contact us on WhatsApp or by phone.' });
  }
}
