import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { AnchorButton, LinkButton } from "@/components/site/Buttons";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import { LocationSection } from "@/components/site/LocationSection";
import { MAPS_DIRECTIONS, SITE } from "@/lib/site";

const title = "Contact Agape Home Assisted Living | Laveen, AZ";
const description =
  "Contact Agape Home Assisted Living in Laveen, Arizona. Send a message, get directions to 4462 W Ian Dr, or request a visit to our residential care home.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-mist/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl">We're Here to Help</h1>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground">
              Questions about our home, our approach or arranging a visit? We're glad to talk.
            </p>

            <div className="mt-10 space-y-6 border-t border-border pt-8 text-[0.9375rem]">
              <p className="font-serif text-xl text-primary">{SITE.name}</p>
              <p className="flex items-start gap-3 text-ink">
                <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>
                  {SITE.street}
                  <br />
                  {SITE.city}, {SITE.state}
                </span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="break-all text-ink underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" hash="schedule">
                Schedule a Visit
              </LinkButton>
              <AnchorButton href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" variant="outline">
                Get Directions
                <ExternalLink className="size-4" aria-hidden="true" />
              </AnchorButton>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <ScheduleVisitSection />
      <LocationSection />
    </>
  );
}
