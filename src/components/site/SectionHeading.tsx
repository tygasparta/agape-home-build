import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className="text-balance text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
      {intro ? (
        <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
          {typeof intro === "string" ? <p>{intro}</p> : intro}
        </div>
      ) : null}
    </Reveal>
  );
}
