import { Link } from "@tanstack/react-router";
import { MapPin, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { NAV, SITE, MAPS_DIRECTIONS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Compassionate assisted living in Laveen, Arizona, where residents are treated with
            dignity, respect and genuine care.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/85 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-white/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className="hover:text-white">
                {SITE.addressLine}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>

          {SITE.social.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
                Connect
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {SITE.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-white/85 hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Agape Home Assisted Living. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
