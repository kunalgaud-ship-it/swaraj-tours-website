/** Sends a contact / assistance inquiry to the website API. Throws with a readable message on failure. */
export interface InquiryPayload {
  source: 'contact' | 'assistance';
  name: string;
  phone: string;
  email?: string;
  route?: string;
  message?: string;
}

export async function sendInquiry(payload: InquiryPayload): Promise<string> {
  const response = await fetch('/api/send-inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || 'We could not send your inquiry. Please contact us on WhatsApp or by phone.');
  }
  return result.inquiryRef as string;
}
