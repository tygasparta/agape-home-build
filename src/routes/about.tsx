import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { LinkButton } from "@/components/site/Buttons";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import storyImg from "@/assets/home-private-room.jpg";
import { CARE_DISCLAIMER } from "@/lib/site";

const title = "About Agape Home | Residential Assisted Living in Laveen, AZ";
const description =
  "Learn about Agape Home Assisted Living in Laveen, Arizona — a residential care home built on compassion, respect, dignity and genuine relationships.";

export const Route = createFileRoute("/about")({
  head: () => pageMeta({ title, description, path: "/about" }),
  component: AboutPage,
});

const recognitions = [
  "Individual needs",
  "Personal preferences",
  "Daily routines",
  "Life experiences",
  "Independence",
  "Dignity",
  "Personal choice",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Agape Home"
        title="Care That Begins With Knowing You"
        intro={
          <>
            <p>
              Agape Home Assisted Living is a residential care home in Laveen, Arizona. We believe
              quality care begins with compassion, respect, dignity, and a genuine commitment to the
              people we serve.
            </p>
            <p>
              Every resident is unique, and care should reflect that. We take the time to understand
              the person before we plan the support.
            </p>
          </>
        }
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <SectionHeading
            eyebrow="Every Resident Has a Story"
            title="We begin with the person, not the service list"
            intro="Our aim is a comfortable, safe, and supportive home-like environment where residents receive personalized assistance while maintaining as much independence and choice as possible."
          />
          <Reveal delay={80}>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              What we take the time to understand
            </h3>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {recognitions.map((item) => (
                <li key={item} className="py-3.5 text-[0.9375rem] text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border">
        <Reveal variant="settle" className="relative">
          <img
            src={storyImg}
            alt="A private resident room at Agape Home with a bed, recliner, dresser and television"
            width={1400}
            height={1050}
            loading="lazy"
            className="h-[22rem] w-full object-cover sm:h-[30rem]"
          />
          <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
              <p className="max-w-xl text-2xl leading-snug font-medium text-white sm:text-3xl">
                Familiar routines, favorite chairs, long conversations — the small things are the
                things that make a house feel like home.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading eyebrow="Our Mission" title="Our Mission" />
            <Reveal delay={80} className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground lg:pt-2">
              <p className="border-l border-gold pl-6 text-xl leading-relaxed text-primary sm:text-2xl">
                Our mission is to provide compassionate and respectful assisted living services in a
                home environment where residents feel valued, heard, supported, and cared for.
              </p>
              <p>
                We strive to work closely with residents, families, caregivers, and appropriate
                healthcare professionals to promote each resident's well-being and quality of life.
              </p>
              <p className="pt-4 text-xs text-muted-foreground">{CARE_DISCLAIMER}</p>
              <LinkButton to="/our-approach" variant="outline" className="mt-2">
                See Our Approach
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <ScheduleVisitSection />
    </>
  );
}
