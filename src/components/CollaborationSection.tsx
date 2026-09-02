import { ExternalLink } from "lucide-react";
import { useContent } from "../i18n/useContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";
import Cta from "./Cta";

export default function CollaborationSection() {
  const { collaboration } = useContent();
  return (
    <section id="collaboration" className="bg-summit-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <RevealOnScroll className="lg:col-span-5">
            <SectionLabel>{collaboration.heading}</SectionLabel>
            <GoldDivider className="my-6" />
            <h2 className="text-balance font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.2] text-summit-ivory">
              {collaboration.subheading}
            </h2>
          </RevealOnScroll>

          <div className="lg:col-span-6 lg:col-start-7">
            <RevealOnScroll delay={0.1} className="space-y-5">
              <p className="text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
                {collaboration.copy}
              </p>
              <p className="text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
                {collaboration.copySecondary}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} className="mt-10 flex flex-col gap-6 border-t border-summit-graphite pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-summit-mute-dark">
                <ExternalLink className="h-4 w-4 text-summit-gold" aria-hidden="true" />
                {collaboration.attribution}
              </p>
              <Cta href={collaboration.url} variant="outline">
                {collaboration.ctaLabel}
              </Cta>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
