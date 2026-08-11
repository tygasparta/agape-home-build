import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "Accessibility | Agape Home Assisted Living";
const description =
  "Agape Home Assisted Living is committed to keeping this website usable and accessible for everyone, including visitors using assistive technology.";

export const Route = createFileRoute("/accessibility")({
  head: () => pageMeta({ title, description, path: "/accessibility", index: false }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <p className="eyebrow">Accessibility</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">Accessibility Statement</h1>

      <div className="mt-10 space-y-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
        <p>
          We want every family to be able to use this website comfortably, including visitors who
          use screen readers, keyboard navigation, magnification or reduced-motion settings.
        </p>

        <section>
          <h2 className="text-xl text-primary">What we've done</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Semantic headings, landmarks and a skip-to-content link.</li>
            <li>Full keyboard navigation with visible focus indicators.</li>
            <li>Descriptive alternative text for meaningful images.</li>
            <li>Labelled form fields with clear, text-based error messages.</li>
            <li>Colour contrast chosen to remain readable, with meaning never carried by colour alone.</li>
            <li>Motion reduced automatically when your device requests it.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-primary">Tell us about a barrier</h2>
          <p className="mt-3">
            If any part of this site is difficult to use, please email{" "}
            <a href={`mailto:${SITE.email}`} className="break-all text-primary underline underline-offset-4">
              {SITE.email}
            </a>{" "}
            and describe the issue. We will do our best to help and to correct the problem.
          </p>
        </section>
      </div>
    </article>
  );
}
