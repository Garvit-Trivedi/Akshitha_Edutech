/*
  Lightweight client-side validation helpers used by the forms.
  Always re-validate on the server once you connect a backend.
*/

export type FieldErrors = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/

export function validate(
  data: FormData,
  rules: Record<string, { required?: boolean; email?: boolean; phone?: boolean; minLength?: number; label: string }>,
): FieldErrors {
  const errors: FieldErrors = {}
  for (const [name, rule] of Object.entries(rules)) {
    const value = String(data.get(name) ?? '').trim()
    if (rule.required && !value) {
      errors[name] = `${rule.label} is required`
    } else if (value && rule.email && !EMAIL_RE.test(value)) {
      errors[name] = 'Enter a valid email address'
    } else if (value && rule.phone && !PHONE_RE.test(value.replace(/\s|-/g, ''))) {
      errors[name] = 'Enter a valid 10-digit Indian mobile number'
    } else if (value && rule.minLength && value.length < rule.minLength) {
      errors[name] = `${rule.label} must be at least ${rule.minLength} characters`
    }
  }
  return errors
}
