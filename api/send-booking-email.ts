import { supabaseReady, supabaseRequest } from '../server/supabaseAdmin';

const COMPANY_NAME = 'Swaraj Cab';
const DEFAULT_NOTIFICATION_EMAIL = 'shivrajtravels1@gmail.com';
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

const sendEmail = async (to: string, subject: string, html: string, replyTo?: string) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.BOOKING_FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!env.RESEND_API_KEY || !env.BOOKING_FROM_EMAIL) {
    return res.status(503).json({ error: 'Booking email is not configured yet.' });
  }

  const booking = req.body ?? {};
  const email = typeof booking.customerEmail === 'string' ? booking.customerEmail.trim() : '';
  const validEmail = email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phone = typeof booking.customerPhone === 'string' ? booking.customerPhone.trim() : '';
  const validPhone = phone.length >= 7 && phone.length <= 30 && /^[+\d][\d\s().-]*$/.test(phone);
  const tripTypes = ['one-way', 'round-trip', 'local', 'airport'];
  const stringFields = ['pickupCity', 'dropCity', 'pickupDate', 'pickupTime', 'selectedCarId'];
  const fieldsValid = stringFields.every((field) =>
    typeof booking[field] === 'string' && booking[field].trim().length > 0 && booking[field].length <= 200
  );

  if (!validEmail || !validPhone || !fieldsValid || !tripTypes.includes(booking.tripType) ||
      !Number.isInteger(booking.passengers) || booking.passengers < 1 || booking.passengers > 50 ||
      String(booking.customerName ?? '').length > 100 || String(booking.customerPhone ?? '').length > 30 ||
      String(booking.vehicleName ?? '').length > 200) {
    return res.status(400).json({ error: 'Please enter valid booking details and a valid email address.' });
  }

  const bookingRef = `SWARAJ-${Date.now().toString(36).toUpperCase()}`;
  const safe = {
    ref: escapeHtml(bookingRef),
    name: escapeHtml(booking.customerName || 'Traveler'),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    tripType: escapeHtml(String(booking.tripType).replace('-', ' ')),
    pickup: escapeHtml(booking.pickupCity),
    drop: escapeHtml(booking.dropCity),
    date: escapeHtml(booking.pickupDate),
    time: escapeHtml(booking.pickupTime),
    returnDate: escapeHtml(booking.returnDate || 'Not applicable'),
    vehicle: escapeHtml(booking.vehicleName || booking.selectedCarId),
    passengers: escapeHtml(booking.passengers),
    fare: Number.isFinite(booking.estimatedFare) ? `₹${Number(booking.estimatedFare).toLocaleString('en-IN')}` : 'To be confirmed',
  };

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e293b;max-width:640px;margin:auto">
      <h2 style="color:#b45309">We received your trip request</h2>
      <p>Hello ${safe.name},</p>
      <p>Thank you for choosing ${COMPANY_NAME}. We have received your booking request and our team will contact you to confirm availability and the final fare.</p>
      <h3>Booking details · ${safe.ref}</h3>
      <p><b>Trip:</b> ${safe.tripType}<br><b>Pickup:</b> ${safe.pickup}<br><b>Drop:</b> ${safe.drop}<br><b>Pickup date and time:</b> ${safe.date} at ${safe.time}<br><b>Return date:</b> ${safe.returnDate}<br><b>Vehicle:</b> ${safe.vehicle}<br><b>Passengers:</b> ${safe.passengers}<br><b>Estimated fare:</b> ${safe.fare}</p>
      <p style="color:#64748b;font-size:13px">The fare is an estimate. Your booking is confirmed only after our dispatch team confirms the vehicle and final rate.</p>
      <p>For help, call ${escapeHtml('+91 98607 07287')}.</p>
      <p>Regards,<br>${COMPANY_NAME}</p>
    </div>`;

  const ownerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e293b;max-width:640px;margin:auto">
      <h2>New online booking request · ${safe.ref}</h2>
      <p><b>Customer:</b> ${safe.name}<br><b>Email:</b> ${safe.email}<br><b>Phone:</b> ${safe.phone}</p>
      <p><b>Trip:</b> ${safe.tripType}<br><b>Pickup:</b> ${safe.pickup}<br><b>Drop:</b> ${safe.drop}<br><b>Pickup date and time:</b> ${safe.date} at ${safe.time}<br><b>Return date:</b> ${safe.returnDate}<br><b>Vehicle:</b> ${safe.vehicle}<br><b>Passengers:</b> ${safe.passengers}<br><b>Estimated fare:</b> ${safe.fare}</p>
    </div>`;

  try {
    if (supabaseReady) {
      const bookingResponse = await supabaseRequest('booking_requests', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          booking_ref: bookingRef,
          customer_name: String(booking.customerName || 'Traveler').slice(0, 100),
          customer_email: email,
          customer_phone: phone,
          trip_type: booking.tripType,
          pickup_city: booking.pickupCity.trim(),
          drop_city: booking.dropCity.trim(),
          pickup_date: booking.pickupDate,
          pickup_time: booking.pickupTime,
          return_date: typeof booking.returnDate === 'string' ? booking.returnDate : null,
          selected_car_id: booking.selectedCarId,
          vehicle_name: String(booking.vehicleName || booking.selectedCarId).slice(0, 200),
          passengers: booking.passengers,
          estimated_fare: Number.isFinite(booking.estimatedFare) ? Math.max(0, Number(booking.estimatedFare)) : null,
          status: 'new',
        }),
      });
      if (!bookingResponse.ok) {
        console.error('Booking could not be stored in the admin database:', bookingResponse.status);
        return res.status(502).json({ error: 'We could not record your booking. Please contact us by phone or WhatsApp.' });
      }
    }

    await Promise.all([
      sendEmail(email, `Booking request received · ${bookingRef}`, customerHtml),
      sendEmail(
        env.BOOKING_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL,
        `New online booking · ${bookingRef}`,
        ownerHtml,
        email,
      ),
    ]);
    return res.status(200).json({ bookingRef });
  } catch (error) {
    console.error('Booking email delivery failed:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(502).json({ error: 'We could not send the booking emails. Please contact us by phone or WhatsApp.' });
  }
}
