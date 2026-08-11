import { MapPin, ExternalLink } from "lucide-react";
import { MAPS_DIRECTIONS, MAPS_EMBED, SITE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { buttonStyles } from "./Buttons";

export function LocationSection() {
  return (
    <section className="border-t border-border bg-sand py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Find Us</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">Our Neighborhood in Laveen</h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
            Agape Home is a residential assisted living home located in a quiet Laveen, Arizona
            neighborhood.
          </p>
          <address className="mt-8 flex items-start gap-3 text-[0.9375rem] not-italic text-ink">
            <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
            <span>
              {SITE.street}
              <br />
              {SITE.city}, {SITE.state}
            </span>
          </address>
          <a href={MAPS_DIRECTIONS} target="_blank" rel="noreferrer" className={`${buttonStyles.outline} mt-8`}>
            Get Directions
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={100} className="border border-border bg-white p-2">
          <iframe
            title={`Map showing ${SITE.addressLine}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[16/10] w-full border-0"
          />
        </Reveal>
      </div>
    </section>
  );
}
