import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import { Phone } from "lucide-react";
import { AnchorButton, LinkButton } from "@/components/site/Buttons";
import { CARE_DISCLAIMER, SITE, telHref } from "@/lib/site";
import greatRoomImg from "@/assets/home-great-room.jpg";

const title = "ALTCS & Private Pay Assisted Living in Laveen, AZ | Agape Home";
const description =
  "Agape Home Assisted Living welcomes ALTCS and private-pay residents in Laveen, Arizona — a small, family-oriented home offering personalized daily support.";

export const Route = createFileRoute("/altcs-and-private-pay")({
  head: () => pageMeta({ title, description, path: "/altcs-and-private-pay" }),
  component: AltcsPage,
});

const provisions = [
  "A warm, family-oriented environment",
  "Assistance with activities of daily living",
  "Personalized attention and compassionate support",
  "A safe and comfortable residential setting",
  "Respect for each resident's dignity, preferences, and independence",
  "A welcoming home where families can feel confident their loved ones are cared for",
];

function AltcsPage() {
  return (
    <>
      <PageHero
        eyebrow="ALTCS & Private Pay"
        title="Compassionate Assisted Living in a Family-Oriented Home"
        intro={
          <>
            <p>
              At Agape Home Assisted Living, we believe every senior deserves to feel safe, valued,
              respected, and at home.
            </p>
            <p>
              We are pleased to welcome ALTCS and private-pay residents to our intimate,
              family-oriented assisted living home in Laveen, Arizona. Our goal is to provide
              personalized support in a comfortable environment where residents can receive
              assistance with daily living while maintaining dignity, independence, and quality of
              life.
            </p>
          </>
        }
        image={greatRoomImg}
        imageAlt="The open living and dining area at Agape Home, with a sofa, television and a wooden dining table set for a meal"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Personalized Care"
            title="Personalized care. A place to call home."
            intro="Agape Home Assisted Living offers compassionate support tailored to each resident's individual needs. We understand that choosing assisted living is an important decision, and we strive to make the transition as comfortable and reassuring as possible for residents and their families."
          />

          <Reveal delay={80}>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Our home provides
            </h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {provisions.map((item) => (
                <li key={item} className="flex gap-4 py-4 text-[0.9375rem] leading-relaxed text-ink">
                  <span
                    className="mt-2.5 block h-px w-4 shrink-0 bg-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-sand py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading eyebrow="Paying for Care" title="ALTCS & private pay" />
            <Reveal delay={80} className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground lg:pt-2">
              <p className="border-l border-gold pl-6 text-xl leading-relaxed text-primary sm:text-2xl">
                We welcome individuals who qualify for ALTCS as well as residents who choose
                private-pay care.
              </p>
              <p>
                Our team can help families understand the placement process and discuss
                availability, care needs, and the next steps toward making Agape Home Assisted
                Living a new home for their loved one.
              </p>
              <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                ALTCS is the Arizona Long Term Care System, a state program that helps cover
                long-term care costs for those who qualify. Eligibility is determined by the State
                of Arizona, not by Agape Home. {CARE_DISCLAIMER}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">Your loved one deserves to feel at home</h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted-foreground">
              At Agape, we are more than a place to receive care. We are a home where seniors are
              known, respected, and cared for with compassion.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              If you are looking for a small, personal, family-oriented assisted living home in
              Laveen, Arizona, we invite you to contact us to learn more about our availability and
              services.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton to="/contact" hash="schedule">
              Schedule a Visit
            </LinkButton>
            <AnchorButton href={telHref(SITE.phone)} variant="outline">
              <Phone className="size-4" aria-hidden="true" />
              Call {SITE.phone}
            </AnchorButton>
          </Reveal>
        </div>
      </section>

      <ScheduleVisitSection />
    </>
  );
}
