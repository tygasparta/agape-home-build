import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { LinkButton } from "./Buttons";
import { NAV, SITE, MAPS_DIRECTIONS, telHref } from "@/lib/site";

/** Column heading with the gold rule used throughout the site. */
function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
      {children}
      <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold" />
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1.1fr] lg:gap-12">
          {/* Brand — spans both columns at the 2-up breakpoint so the blurb
              keeps a readable measure instead of being squeezed. */}
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo tone="light" className="h-14 sm:h-16" />
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Compassionate assisted living in Laveen, Arizona, where residents are treated with
              dignity, respect and genuine care.
            </p>
          </div>

          <nav aria-label="Footer">
            <ColumnHeading>Explore</ColumnHeading>
            {/*
              Two columns: seven links in a single stack left a tall ragged
              ladder beside much shorter neighbours. Column-wise flow with an
              explicit row count so each column reads top-to-bottom in order,
              rather than the 1/3/5/7 zig-zag a row-wise grid produces.
            */}
            <ul
              className="mt-5 grid grid-flow-col gap-x-6 gap-y-3 text-sm"
              style={{ gridTemplateRows: `repeat(${Math.ceil(NAV.length / 2)}, minmax(0, auto))` }}
            >
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/85 transition-colors hover:text-white"
                    activeProps={{ className: "text-white font-medium" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
                <a
                  href={MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {SITE.addressLine}
                </a>
              </li>
              {SITE.phones.map((number) => (
                <li key={number} className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
                  <a href={telHref(number)} className="transition-colors hover:text-white">
                    {number}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>

            <LinkButton
              to="/contact"
              hash="schedule"
              variant="light"
              className="mt-6 w-full sm:w-auto"
            >
              Schedule a Visit
            </LinkButton>

            {SITE.social.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {SITE.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/85 transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-white/25">
              |
            </span>
            <Link to="/accessibility" className="transition-colors hover:text-white">
              Accessibility
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
