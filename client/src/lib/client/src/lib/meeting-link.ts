// client/src/lib/meeting-link.ts

/**
 * Single source of truth for meeting-link normalization + safety checks
 * on the client. Mirrored (with matching rules, kept in sync manually) by
 * server/src/utils/meeting-link.utils.ts — if you change the scheme rule
 * here, update that file too.
 */

const HTTP_URL_PATTERN = /^https?:\/\//i;

export function normalizeMeetingLink(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return HTTP_URL_PATTERN.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function isSafeHttpUrl(url: string): boolean {
  try {
    const protocol = new URL(url).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}