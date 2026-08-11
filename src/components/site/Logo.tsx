import { Link } from "@tanstack/react-router";
import logoBrand from "@/assets/agape-logo.png";
import logoLight from "@/assets/agape-logo-light.png";

/**
 * Brand lockup.
 *
 * Two artwork variants, both trimmed from the supplied master (public/logo.png):
 *   - `brand` — full colour, for light backgrounds (header, body sections).
 *   - `light` — blues lifted toward white, for the deep-blue footer. The original
 *     artwork is blue-on-blue there and all but disappears.
 *
 * Artwork is 900x297 (~3.03:1). Set the height via `className`; width follows.
 */
export function Logo({
  className = "h-12 sm:h-14",
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "light";
}) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Agape Home Assisted Living — home">
      <img
        src={tone === "light" ? logoLight : logoBrand}
        alt="Agape Home Assisted Living — where care feels like family"
        width={900}
        height={297}
        // max-w-none: Tailwind's preflight sets img { max-width: 100% }, which cycles
        // against the shrink-to-fit Link inside the footer grid and halves the logo.
        className={`w-auto max-w-none ${className}`}
      />
    </Link>
  );
}
