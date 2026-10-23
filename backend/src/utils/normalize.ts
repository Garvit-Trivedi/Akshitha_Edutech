/**
 * Normalizes email by trimming and converting to lowercase
 */
export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Normalizes phone number: strips non-digit characters except leading plus if international,
 * or formats cleanly
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[^0-9+]/g, '').trim();
}
