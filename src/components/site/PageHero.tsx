import type { ReactNode } from "react";
import { Rise } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-border bg-mist/60">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <Rise as="p" delay={60} className="eyebrow">
            {eyebrow}
          </Rise>
          <Rise
            as="h1"
            delay={150}
            className="mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem]"
          >
            {title}
          </Rise>
          <Rise
            delay={260}
            className="mt-6 max-w-xl space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground"
          >
            {typeof intro === "string" ? <p>{intro}</p> : intro}
          </Rise>
        </div>
        {image ? (
          <Rise variant="settle" delay={200} className="lg:justify-self-end">
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={1400}
              height={1050}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Rise>
        ) : null}
      </div>
    </section>
  );
}
