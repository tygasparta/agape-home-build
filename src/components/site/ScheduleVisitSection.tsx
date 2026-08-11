import { VisitRequestForm } from "./VisitRequestForm";
import { Reveal } from "./Reveal";
import { CARE_DISCLAIMER, SITE } from "@/lib/site";

export function ScheduleVisitSection() {
  return (
    <section id="schedule" className="scroll-mt-24 bg-primary py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <Reveal>
          <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white/60 uppercase">
            Schedule a Visit
          </p>
          <h2 className="mt-5 text-3xl text-white sm:text-4xl">Come See Agape Home</h2>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/75">
            We invite families to learn more about our home, ask questions, and discuss whether
            Agape Home may be the right environment for their loved one.
          </p>
          <dl className="mt-8 space-y-4 text-sm text-white/75">
            <div>
              <dt className="text-white/50">Location</dt>
              <dd className="mt-1 text-white">{SITE.addressLine}</dd>
            </div>
            <div>
              <dt className="text-white/50">Email</dt>
              <dd className="mt-1 break-all">
                <a href={`mailto:${SITE.email}`} className="text-white underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-8 max-w-md border-t border-white/15 pt-5 text-xs leading-relaxed text-white/55">
            {CARE_DISCLAIMER}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <VisitRequestForm />
        </Reveal>
      </div>
    </section>
  );
}
