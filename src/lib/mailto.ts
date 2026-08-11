import { SITE } from "./site";

/**
 * Form submission by `mailto:`.
 *
 * Important: this does NOT send anything. It hands the composed message to
 * whatever mail app the visitor has and they must still press Send. Nothing
 * reaches us if they don't, and we get no confirmation either way — so the UI
 * must say "your email app should have opened", never "we received this", and
 * must always offer the address and phone numbers as a fallback.
 *
 * Swapping this for a real backend later means replacing `submitByEmail` with
 * a server call; the forms themselves barely change.
 */

export type EnquiryField = { label: string; value: string };

/** Plain-text body. Kept short: some mail clients truncate long mailto URLs. */
export function composeBody(fields: EnquiryField[]): string {
  return fields
    .filter((f) => f.value.trim() !== "")
    .map((f) => `${f.label}: ${f.value.trim()}`)
    .join("\n");
}

export function buildMailtoUrl(subject: string, fields: EnquiryField[]): string {
  const body = composeBody(fields);
  // encodeURIComponent leaves newlines as %0A, which mail clients expect.
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Opens the visitor's mail client. Returns the composed body so the UI can
 * offer copy-to-clipboard when no mail app is configured.
 */
export function submitByEmail(subject: string, fields: EnquiryField[]): { body: string } {
  const url = buildMailtoUrl(subject, fields);
  // location.href rather than window.open: popup blockers routinely kill
  // window.open for non-http schemes, and this keeps the page intact.
  window.location.href = url;
  return { body: composeBody(fields) };
}
