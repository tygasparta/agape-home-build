import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import { CARE_DISCLAIMER } from "@/lib/site";

const title = "Care & Services | Assisted Living Home in Laveen, AZ";
const description =
  "Resident-centered assisted living support at Agape Home in Laveen, Arizona: personalized assistance, daily living support, comfortable residential living and family communication.";

export const Route = createFileRoute("/care")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/care" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/care" }],
  }),
  component: CarePage,
});

const services = [
  {
    title: "Personalized Assistance",
    text: "Support tailored around individual needs, routines and preferences.",
  },
  {
    title: "Daily Living Support",
    text: "Provide appropriate assistance with everyday activities while encouraging independence.",
  },
  {
    title: "Comfortable Residential Living",
    text: "A welcoming home environment designed around comfort, dignity and a sense of belonging.",
  },
  {
    title: "Safety & Support",
    text: "A supportive environment appropriate to each resident's needs and authorized services.",
  },
  {
    title: "Family Communication",
    text: "Open communication intended to give families greater peace of mind.",
  },
  {
    title: "Resident-Centered Care",
    text: "A respectful approach focused on the individual rather than a one-size-fits-all model.",
  },
];

function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Care & Services"
        title="Support Shaped Around the Person"
        intro="Our support is guided by each resident's individual needs, care plan and authorized services. Rather than a fixed package, care at Agape Home is arranged thoughtfully and reviewed as needs change."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="What We Focus On" title="Areas of everyday support" />
          <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                as="li"
                key={service.title}
                delay={i * 60}
                className="bg-background px-7 py-10 transition-colors duration-500 hover:bg-mist/70"
              >
                <span className="block h-px w-8 bg-gold" aria-hidden="true" />
                <h3 className="mt-6 text-xl">{service.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{service.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={100} className="mt-12 border-l border-gold bg-sand px-6 py-6">
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Services are provided according to each resident's individual needs, care plan, and
              applicable authorization and regulations. {CARE_DISCLAIMER}
            </p>
          </Reveal>
        </div>
      </section>

      <ScheduleVisitSection />
    </>
  );
}
