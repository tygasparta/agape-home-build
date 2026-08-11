export const SITE = {
  /**
   * ⚠️ CHANGE THIS BEFORE LAUNCH — placeholder, the domain is not registered yet.
   *
   * Canonical origin, no trailing slash. Every canonical tag, og:url, sitemap
   * entry and JSON-LD url is built from this one value, so updating it here
   * updates the whole site. After changing it, re-run `bun run sitemap`.
   */
  url: "https://www.agapehomeassistedliving.com",
  name: "Agape Home Assisted Living",
  tagline: "Where Care Feels Like Family",
  street: "4462 W Ian Dr",
  city: "Laveen",
  state: "AZ",
  addressLine: "4462 W Ian Dr, Laveen, AZ",
  email: "agapehomeassistedhomeliving@gmail.com",
  /** Add real profile URLs here to display social links in the footer. */
  social: [] as { label: string; href: string }[],
  /** Add a phone number here to enable the "Call Us" action site-wide. */
  phone: "" as string,
} as const;

export const MAPS_QUERY = encodeURIComponent(`${SITE.street}, ${SITE.city}, ${SITE.state}`);
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/our-approach", label: "Our Approach" },
  { to: "/care", label: "Care" },
  { to: "/our-home", label: "Our Home" },
  { to: "/for-families", label: "Families" },
  { to: "/contact", label: "Contact" },
] as const;

export const CARE_DISCLAIMER =
  "Care and services are provided according to each resident's individual needs, care plan, authorized services, and applicable requirements.";
