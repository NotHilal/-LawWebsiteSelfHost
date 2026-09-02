import { useContent } from "../i18n/useContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function WhySummit() {
  const { whySummit, ui } = useContent();
  return (
    <section className="bg-summit-black py-24 text-summit-ivory sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll>
          <SectionLabel>{ui.sectionLabels.whySummit}</SectionLabel>
          <GoldDivider className="my-6" />
          <h2 className="max-w-xl text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.15]">
            {whySummit.heading}
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 border-t border-summit-ivory/10 pt-14 sm:grid-cols-2">
          {whySummit.pillars.map((pillar, i) => (
            <RevealOnScroll key={pillar.title} delay={i * 0.08}>
              <span className="font-serif text-sm text-summit-gold">{`0${i + 1}`}</span>
              <h3 className="mt-3 font-serif text-2xl font-medium leading-tight sm:text-[1.65rem]">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-md text-balance text-base leading-relaxed text-summit-ivory/65">
                {pillar.copy}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
