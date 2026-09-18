const EMAIL_RE = /^\S+@\S+\.\S+$/;
const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const PAN_RE = /^[A-Z]{5}\d{4}[A-Z]$/;

export function isValidEmail(value) {
  return typeof value === "string" && EMAIL_RE.test(value);
}

export function isValidPhone(value) {
  return typeof value === "string" && value.trim().length >= 7;
}

export function isValidGstin(value) {
  return !value || GSTIN_RE.test(value.trim());
}

export function isValidPan(value) {
  return !value || PAN_RE.test(value.trim());
}

/** Collects the first missing/invalid required field name it finds, or null if all pass. */
export function firstMissing(obj, fields) {
  for (const field of fields) {
    const value = obj[field];
    if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
      return field;
    }
  }
  return null;
}
