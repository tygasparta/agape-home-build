import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";
import { LinkButton } from "./Buttons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-active={pathname === item.to}
              className="link-underline text-sm text-ink/80 transition-colors hover:text-primary data-[active=true]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {SITE.phone ? (
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-primary"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Us
            </a>
          ) : (
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-primary hover:text-secondary"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email Us
            </a>
          )}
          <LinkButton to="/contact" hash="schedule">
            Schedule a Visit
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center border border-border text-primary lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <ul className="divide-y divide-border">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-active={pathname === item.to}
                  className="flex min-h-13 items-center py-3 text-base text-ink data-[active=true]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 pb-4">
            <LinkButton to="/contact" hash="schedule" className="w-full">
              Schedule a Visit
            </LinkButton>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-primary/30 px-6 py-3 text-sm text-primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
