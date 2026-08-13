const PHONES = ["+1 (623) 217-1891", "+1 (818) 272-1507"] as const;

export const SITE = {
  /**
   * Canonical origin — no trailing slash, and no `www`: the www host 302s here,
   * so this is the address search engines should index. Every canonical tag,
   * og:url, sitemap entry and JSON-LD url is built from this one value.
   * Re-run `bun run sitemap` after changing it.
   */
  url: "https://agapehomeassistedliving.org",
  name: "Agape Home Assisted Living",
  tagline: "Where Care Feels Like Family",
  street: "4462 W Ian Dr",
  city: "Laveen",
  state: "AZ",
  addressLine: "4462 W Ian Dr, Laveen, AZ",
  email: "agapehomeassistedhomeliving@gmail.com",
  /** Add real profile URLs here to display social links in the footer. */
  social: [] as { label: string; href: string }[],
  /**
   * Contact numbers, primary first. Rendered in full wherever there is room
   * (footer, contact page, mobile menu, schedule section); the header bars are
   * width-constrained and show `phone` only.
   */
  phones: PHONES,
  /** Primary number, for the places only one will fit. */
  phone: PHONES[0] as string,
} as const;

/** `tel:` href from a display-formatted number — strips spaces, brackets, dashes. */
export function telHref(number: string): string {
  return `tel:${number.replace(/[^+\d]/g, "")}`;
}

export const MAPS_QUERY = encodeURIComponent(`${SITE.street}, ${SITE.city}, ${SITE.state}`);
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/our-approach", label: "Our Approach" },
  { to: "/care", label: "Care" },
  { to: "/our-home", label: "Our Home" },
  // Short label on purpose: "ALTCS" is the term families actually search for,
  // and the desktop bar has no room for the full page title.
  { to: "/altcs-and-private-pay", label: "ALTCS" },
  { to: "/for-families", label: "Families" },
  { to: "/contact", label: "Contact" },
] as const;

/** Payment routes accepted — surfaced in JSON-LD as paymentAccepted. */
export const PAYMENT_ACCEPTED = "ALTCS (Arizona Long Term Care System), Private Pay";

export const CARE_DISCLAIMER =
  "Care and services are provided according to each resident's individual needs, care plan, authorized services, and applicable requirements.";
