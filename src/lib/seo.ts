import { SITE } from "./site";

/**
 * Absolute URL for `path`, built from SITE.url.
 *
 * Canonicals, og:url and sitemap entries must be absolute — Open Graph in
 * particular will not resolve a relative path, which is why link previews were
 * coming out blank.
 */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString().replace(/\/$/, path === "/" ? "/" : "");
}

/** 1200x630 social card. Regenerate with `bun run og` if the brand changes. */
export const OG_IMAGE = "/og-image.png";

export type PageMeta = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for canonical and og:url. */
  path: string;
  /** Set false on thin/utility pages that shouldn't compete in search. */
  index?: boolean;
};

/**
 * Single source of truth for per-page head tags, so the nine routes can't drift
 * apart on which social tags they remember to include.
 */
export function pageMeta({ title, description, path, index = true }: PageMeta) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(index ? [] : [{ name: "robots", content: "noindex, follow" }]),

      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE.name} — ${SITE.tagline}` },

      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
