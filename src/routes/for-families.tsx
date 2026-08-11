import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LinkButton } from "@/components/site/Buttons";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import familyImg from "@/assets/family-conversation.jpg";
import { CARE_DISCLAIMER } from "@/lib/site";

const title = "For Families | Agape Home Assisted Living, Laveen AZ";
const description =
  "Choosing assisted living in Laveen, Arizona is a big decision. Learn how Agape Home partners with families through communication, professionalism and dignity.";

export const Route = createFileRoute("/for-families")({
  head: () => pageMeta({ title, description, path: "/for-families" }),
  component: FamiliesPage,
});

const pillars = [
  {
    title: "Communication",
    text: "We aim to build trusting relationships through clear and respectful communication.",
  },
  {
    title: "Professionalism",
    text: "Families should feel confident that their loved one's care is approached with responsibility and respect.",
  },
  {
    title: "Partnership",
    text: "We work with residents, families, caregivers and appropriate healthcare professionals to support resident well-being.",
  },
  {
    title: "Dignity",
    text: "Our goal is to help residents maintain independence, choice and a sense of purpose whenever possible.",
  },
];

function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Families"
        title="Peace of Mind Begins With Trust"
        intro="We understand that choosing an assisted living home is an important decision. Families want to know that their loved ones are being treated with care, respect, and compassion."
        image={familyImg}
        imageAlt="An older man and his adult daughter talking and laughing together over coffee at home"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Our Commitment to You" title="What families can expect from us" />
          <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 70} className="border-t border-border pt-6">
                <h3 className="text-xl">{pillar.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {pillar.text}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-16 border-t border-border pt-10">
            <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{CARE_DISCLAIMER}</p>
            <LinkButton to="/contact" hash="schedule" className="mt-8">
              Schedule a Conversation
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <ScheduleVisitSection />
    </>
  );
}
