import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

const title = "Privacy Policy | Agape Home Assisted Living";
const description =
  "How Agape Home Assisted Living in Laveen, Arizona handles information submitted through this website.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => pageMeta({ title, description, path: "/privacy-policy", index: false }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">Privacy Policy</h1>

      <div className="mt-10 space-y-8 text-[1.0625rem] leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl text-primary">Information we collect</h2>
          <p className="mt-3">
            When you submit a contact or visit request form on this website, you may provide your
            name, email address, phone number, relationship to a prospective resident, preferred
            visit date and time, and any message you choose to write.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-primary">How we use information</h2>
          <p className="mt-3">
            We use the information you submit to respond to your inquiry and to discuss whether
            Agape Home may be a suitable environment for your loved one. We do not sell your
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-primary">Health information</h2>
          <p className="mt-3">
            Please do not submit sensitive health information through this website. If detailed
            information is needed, we will discuss the appropriate way to share it with you
            directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-primary">Third-party content</h2>
          <p className="mt-3">
            This website embeds a map from Google Maps so visitors can find our location. Loading
            that map may involve Google receiving information about your visit, in accordance with
            Google's own privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-primary">Contact</h2>
          <p className="mt-3">
            Questions about this policy may be sent to{" "}
            <a href={`mailto:${SITE.email}`} className="break-all text-primary underline underline-offset-4">
              {SITE.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
