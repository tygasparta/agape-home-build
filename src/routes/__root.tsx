import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { buttonStyles } from "@/components/site/Buttons";
import { SITE } from "@/lib/site";

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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#164A8A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AssistedLiving",
          name: SITE.name,
          slogan: SITE.tagline,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.street,
            addressLocality: SITE.city,
            addressRegion: SITE.state,
            addressCountry: "US",
          },
          areaServed: "Laveen, Arizona",
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
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
