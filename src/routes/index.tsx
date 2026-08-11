import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Home, UserRound, Users, ArrowRight, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-care.jpg";
import introImg from "@/assets/home-living.jpg";
import { LinkButton } from "@/components/site/Buttons";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import { LocationSection } from "@/components/site/LocationSection";
import { CARE_DISCLAIMER } from "@/lib/site";

const title = "Assisted Living in Laveen, AZ | Agape Home Assisted Living";
const description =
  "Agape Home Assisted Living is a residential assisted living home in Laveen, Arizona providing compassionate, resident-centered care where care feels like family.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const trustPoints = [
  {
    icon: HeartHandshake,
    title: "Compassionate Care",
    text: "Kindness, patience and understanding.",
  },
  { icon: Home, title: "Home-Like Environment", text: "Comfortable, welcoming and peaceful." },
  {
    icon: UserRound,
    title: "Resident-Centered",
    text: "Care built around individual needs and preferences.",
  },
  { icon: Users, title: "Family Partnership", text: "Open communication and trusted relationships." },
];

const values = [
  { title: "Compassion", text: "We treat every resident with kindness, patience, and understanding." },
  { title: "Respect", text: "We honor each person's individuality, choices, privacy, and dignity." },
  { title: "Comfort", text: "We strive to create a peaceful, welcoming environment that feels like home." },
  {
    title: "Dignity",
    text: "We encourage independence and support residents in maintaining their sense of purpose and self-worth.",
  },
  {
    title: "Safety",
    text: "We are committed to maintaining a supportive environment appropriate to each resident's needs and authorized services.",
  },
  {
    title: "Family",
    text: "We believe meaningful communication and partnership with families are essential to quality care.",
  },
];

function Index() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">Compassionate Assisted Living in Laveen, Arizona</p>
            <h1 className="mt-6 text-balance text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[4rem]">
              Where Care Feels Like Family
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">
              At Agape Home Assisted Living, we provide compassionate, respectful care in a warm
              residential environment where every resident is valued, heard, supported, and treated
              with dignity.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/contact" hash="schedule">
                Schedule a Visit
              </LinkButton>
              <LinkButton to="/our-home" variant="outline">
                Learn About Our Home
              </LinkButton>
            </div>
            <p className="mt-9 flex items-center gap-2 border-t border-border pt-6 text-sm text-muted-foreground">
              <MapPin className="size-4 text-secondary" aria-hidden="true" />
              Laveen, Arizona
            </p>
          </div>

          <div className="lg:justify-self-end">
            <img
              src={heroImg}
              alt="A caregiver sitting beside an older woman in a sunlit living room, holding her hand and talking warmly"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-label="Why families choose Agape Home" className="border-b border-border bg-mist/60">
        <ul className="mx-auto grid max-w-7xl gap-px bg-border px-0 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 80} className="bg-mist/60 px-6 py-10 sm:px-8">
              <point.icon className="size-6 text-secondary" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-5 text-lg">{point.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <img
              src={introImg}
              alt="Warm living room with soft sofas and natural light inside a residential care home"
              width={1400}
              height={1050}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Welcome"
              title="A Place That Feels Like Home"
              intro={
                <>
                  <p>
                    Welcome to Agape Home Assisted Living, a warm and welcoming residential care home
                    located in Laveen, Arizona.
                  </p>
                  <p>
                    At Agape, we believe that quality care begins with compassion, respect, dignity,
                    and a genuine commitment to the people we serve.
                  </p>
                  <p>
                    Our goal is to create a comfortable, safe, and supportive home-like environment
                    where residents can receive personalized assistance while maintaining as much
                    independence and choice as possible.
                  </p>
                </>
              }
            />
            <Reveal delay={80}>
              <LinkButton to="/about" variant="outline" className="mt-9 group">
                Discover Agape Home
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </LinkButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sand py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading eyebrow="Our Mission" title="Care rooted in respect and relationship" />
            <Reveal delay={80} className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground lg:pt-2">
              <p className="border-l border-gold pl-6 font-serif text-xl leading-relaxed text-primary sm:text-2xl">
                Our mission is to provide compassionate and respectful assisted living services in a
                home environment where residents feel valued, heard, supported, and cared for.
              </p>
              <p>
                We strive to work closely with residents, families, caregivers, and appropriate
                healthcare professionals to promote each resident's well-being and quality of life.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Our Values" title="What guides us every day" />
          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 60} className="border-t border-border pt-6">
                <h3 className="text-xl">{value.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{value.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-14 max-w-3xl border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            {CARE_DISCLAIMER}
          </p>
        </div>
      </section>

      <ScheduleVisitSection />
      <LocationSection />
    </>
  );
}
