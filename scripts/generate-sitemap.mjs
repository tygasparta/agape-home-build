/**
 * Regenerates public/sitemap.xml and public/robots.txt from the site config.
 *
 * Run with `bun run sitemap` after changing SITE.url or adding a route. Both
 * files require absolute URLs — a relative <loc> is invalid per the sitemap
 * protocol and a relative Sitemap: directive is ignored by crawlers.
 *
 * Routes are read from src/routes/*.tsx so this cannot silently drift out of
 * sync when a page is added.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const siteSrc = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const origin = siteSrc.match(/url:\s*"([^"]+)"/)?.[1];
if (!origin) throw new Error("Could not read SITE.url from src/lib/site.ts");

// Pages excluded from the sitemap must match the `index: false` pages in seo.ts.
const NOINDEX = new Set(["privacy-policy", "accessibility"]);
const PRIORITY = { "": "1.0", contact: "0.9" };

const routes = readdirSync(join(root, "src/routes"))
  .filter((f) => f.endsWith(".tsx") && !f.startsWith("__"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .filter((name) => !NOINDEX.has(name))
  .map((name) => (name === "index" ? "" : name))
  .sort((a, b) => (a === "" ? -1 : b === "" ? 1 : a.localeCompare(b)));

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((slug) => {
    const loc = `${origin}/${slug}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>monthly</changefreq>`,
      `    <priority>${PRIORITY[slug] ?? "0.8"}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

writeFileSync(
  join(root, "public/robots.txt"),
  ["User-agent: *", "Allow: /", "", `Sitemap: ${origin}/sitemap.xml`, ""].join("\n"),
);

console.log(`sitemap.xml — ${routes.length} URLs at ${origin}`);
console.log(`robots.txt  — Sitemap: ${origin}/sitemap.xml`);
