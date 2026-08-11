import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { NAV, SITE, MAPS_DIRECTIONS, telHref } from "@/lib/site";
import { LinkButton } from "./Buttons";


export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes, and focus returns to the toggle rather than being dumped at
  // the top of the document.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The header sits above the overlay and goes transparent when it is open, so
  // the logo and toggle appear to sit directly on the blue surface.
  const headerOffset = { "--header-h": scrolled ? "4.5rem" : "7.75rem" } as CSSProperties;

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Utility bar — collapses on scroll so the sticky header stays slim. */}
        <div
          className={`overflow-hidden bg-primary text-white transition-[height,opacity] duration-300 ease-out ${
            scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
          }`}
        >
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-4 px-5 text-xs sm:justify-between sm:px-8">
            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-white/85 transition-colors hover:text-white sm:inline-flex"
            >
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {SITE.addressLine}
            </a>

            <div className="flex items-center gap-5">
              {SITE.phone ? (
                <a
                  href={telHref(SITE.phone)}
                  className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-gold"
                >
                  <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                  {SITE.phone}
                </a>
              ) : null}
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white"
              >
                <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{SITE.email}</span>
                <span className="sm:hidden">Email us</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${
            open
              ? "border-transparent bg-transparent"
              : scrolled
                ? "border-border bg-background/95 shadow-soft backdrop-blur"
                : "border-border/60 bg-background"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8 ${
              scrolled ? "h-18" : "h-22"
            }`}
          >
            <Logo
              tone={open ? "light" : "brand"}
              className={`transition-[height] duration-300 ${scrolled ? "h-11 sm:h-12" : "h-13 sm:h-16"}`}
            />

            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  data-active={pathname === item.to}
                  className="nav-underline py-1 text-[0.9375rem] text-ink/75 transition-colors hover:text-primary data-[active=true]:font-medium data-[active=true]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              {/*
                xl and up only: at lg the seven nav links, logo and CTA leave
                too little room, and the utility bar above already shows this
                number at every width.
              */}
              {SITE.phone ? (
                <a
                  href={telHref(SITE.phone)}
                  className="hidden min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary xl:inline-flex"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {SITE.phone}
                </a>
              ) : null}
              <LinkButton to="/contact" hash="schedule">
                Schedule a Visit
              </LinkButton>
            </div>

            <MenuToggle
              ref={toggleRef}
              open={open}
              onClick={() => setOpen((v) => !v)}
              tone={open ? "light" : "brand"}
              aria-controls="mobile-nav"
            />
          </div>
        </div>
      </header>

      {/*
       * Full-screen takeover. Conditionally rendered so the staggered entrance
       * replays every time it opens.
       */}
      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          style={headerOffset}
          className="panel-enter fixed inset-0 z-40 overflow-y-auto bg-primary pt-[var(--header-h)] outline-none lg:hidden"
        >
          <div className="flex min-h-[calc(100vh-var(--header-h))] flex-col px-5 pb-10 sm:px-8">
            <nav aria-label="Mobile" className="flex-1 pt-2">
              <ul>
                {NAV.map((item, i) => {
                  const active = pathname === item.to;
                  return (
                    <li key={item.to} className="enter-rise" style={{ animationDelay: `${60 + i * 45}ms` }}>
                      <Link
                        to={item.to}
                        className="group flex items-baseline gap-4 border-b border-white/12 py-4"
                      >
                        <span
                          aria-hidden="true"
                          className={`font-display text-xs transition-colors ${
                            active ? "text-gold" : "text-white/35"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-2xl tracking-tight transition-colors ${
                            active ? "text-gold" : "text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="ml-auto size-4 shrink-0 self-center text-white/30 transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="enter-rise mt-8 space-y-3"
              style={{ animationDelay: `${60 + NAV.length * 45}ms` }}
            >
              <LinkButton to="/contact" hash="schedule" variant="light" className="w-full">
                Schedule a Visit
              </LinkButton>

              <div className="grid grid-cols-1 gap-2 pt-2 text-sm">
                {SITE.phones.map((number) => (
                  <a
                    key={number}
                    href={telHref(number)}
                    className="inline-flex min-h-11 items-center gap-3 text-white transition-colors hover:text-gold"
                  >
                    <Phone className="size-4 shrink-0 text-white/50" aria-hidden="true" />
                    {number}
                  </a>
                ))}
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-white/85 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-white/50" aria-hidden="true" />
                  {SITE.email}
                </a>
                <a
                  href={MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-white/85 transition-colors hover:text-white"
                >
                  <MapPin className="size-4 shrink-0 text-white/50" aria-hidden="true" />
                  {SITE.addressLine}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
