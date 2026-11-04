// lib/sanitize.ts — Guest URL param sanitization
// ?guest= is user-controlled input shown on screen. Must be cleaned.

/**
 * Sanitize the ?guest= URL parameter.
 * - Max 40 characters
 * - Allows: letters (any Unicode), numbers, spaces, apostrophes, hyphens, dots
 * - Strips everything else (HTML, scripts, emoji sequences, etc.)
 */
export function sanitizeGuestName(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    .slice(0, 40)
    .replace(/[^\p{L}\p{N} '\-\.]/gu, "")
    .trim();
}

/**
 * Get and sanitize the guest name from the current URL.
 */
export function getGuestFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return sanitizeGuestName(params.get("guest"));
}
