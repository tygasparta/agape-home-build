import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { buttonStyles } from "@/components/site/Buttons";
import { SITE, MAPS_DIRECTIONS, PAYMENT_ACCEPTED } from "@/lib/site";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-24 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">Page Not Found</h1>
      <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
        The page you're looking for may have moved or no longer exists.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/" className={buttonStyles.primary}>
          Return Home
        </Link>
        <Link to="/contact" className={buttonStyles.outline}>
          Contact Agape Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-24 text-center sm:px-8">
      <h1 className="text-3xl sm:text-4xl">This page didn't load</h1>
      <p className="mt-4 text-[1.0625rem] text-muted-foreground">
        Something went wrong on our end. You can try again or head back home.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className={buttonStyles.primary}
        >
          Try again
        </button>
        <a href="/" className={buttonStyles.outline}>
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Agape Home Assisted Living | Laveen, AZ" },
      {
        name: "description",
        content:
          "Agape Home Assisted Living is a residential assisted living home in Laveen, Arizona offering compassionate, resident-centered care.",
      },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#164A8A" },
      // Local-intent signals for "assisted living near me" style queries.
      { name: "geo.region", content: "US-AZ" },
      { name: "geo.placename", content: `${SITE.city}, ${SITE.state}` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Arimo:ital,wght@0,400..700;1,400..700&display=swap",
      },
    ],
    scripts: [
      {
        // Runs before first paint, so scroll-reveal only arms itself when JS is
        // alive to disarm it. Without this, a failed bundle hides the site.
        children: "document.documentElement.classList.add('js')",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AssistedLiving",
              "@id": `${SITE.url}/#organization`,
              name: SITE.name,
              slogan: SITE.tagline,
              description:
                "Residential assisted living home in Laveen, Arizona providing compassionate, resident-centered care.",
              url: SITE.url,
              logo: absoluteUrl("/logo.png"),
              image: absoluteUrl(OG_IMAGE),
              email: SITE.email,
              // schema.org allows repeated telephone values; the primary is
              // listed first. Omitted entirely if no number is configured.
              ...(SITE.phones.length ? { telephone: [...SITE.phones] } : {}),
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.street,
                addressLocality: SITE.city,
                addressRegion: SITE.state,
                addressCountry: "US",
              },
              hasMap: MAPS_DIRECTIONS,
              paymentAccepted: PAYMENT_ACCEPTED,
              areaServed: {
                "@type": "City",
                name: "Laveen",
                containedInPlace: { "@type": "State", name: "Arizona" },
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE.url}/#website`,
              url: SITE.url,
              name: SITE.name,
              inLanguage: "en-US",
              publisher: { "@id": `${SITE.url}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        {/* Keyed on pathname so each navigation replays the cross-fade. */}
        <div key={pathname} className="page-enter">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
