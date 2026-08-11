import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LinkButton } from "@/components/site/Buttons";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import approachImg from "@/assets/home-bedroom.jpg";
import { CARE_DISCLAIMER } from "@/lib/site";

const title = "Our Approach to Care | Agape Home Assisted Living, Laveen AZ";
const description =
  "Personalized care and genuine connection: how Agape Home Assisted Living in Laveen, Arizona gets to know each resident and supports independence and dignity.";

export const Route = createFileRoute("/our-approach")({
  head: () => pageMeta({ title, description, path: "/our-approach" }),
  component: ApproachPage,
});

const steps = [
  {
    number: "01",
    title: "Get to Know You",
    text: "Understand each resident's routines, preferences and needs.",
  },
  {
    number: "02",
    title: "Build a Personalized Approach",
    text: "Support residents according to their individual circumstances and authorized services.",
  },
  {
    number: "03",
    title: "Encourage Independence",
    text: "Promote choice, dignity and participation in everyday life whenever possible.",
  },
  {
    number: "04",
    title: "Work Together",
    text: "Maintain communication with families, caregivers and appropriate healthcare professionals.",
  },
];

function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="Personalized Care. Genuine Connection."
        intro={
          <>
            <p>
              The Agape philosophy is simple: care works best when it is built around a person, not
              a template. We listen first, then support in ways that respect each resident's
              routines, preferences and sense of self.
            </p>
            <p>
              Relationships matter as much as tasks. Familiar faces, patient conversation and
              consistent respect are part of the care itself.
            </p>
          </>
        }
        image={approachImg}
        imageAlt="A comfortable private bedroom with soft linens, a reading chair and family photographs"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="How We Work" title="Four steps that shape everyday care" />
          <ol className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 80} className="border-t border-border pt-6">
                <span className="font-display text-3xl text-gold">{step.number}</span>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="mt-16 border-t border-border pt-10">
            <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{CARE_DISCLAIMER}</p>
            <LinkButton to="/contact" className="mt-8">
              Talk With Our Team
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <ScheduleVisitSection />
    </>
  );
}
