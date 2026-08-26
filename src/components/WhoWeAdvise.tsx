import { whoWeAdvise } from "../data/siteContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function WhoWeAdvise() {
  return (
    <section className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll className="max-w-2xl">
          <SectionLabel>{whoWeAdvise.heading}</SectionLabel>
          <GoldDivider className="my-6" />
          <p className="text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
            {whoWeAdvise.supporting}
          </p>
        </RevealOnScroll>

        <div className="mt-14 border-t border-summit-graphite">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {whoWeAdvise.groups.map((group, i) => (
              <RevealOnScroll as="li" key={group} delay={(i % 6) * 0.04}>
                <span className="block border-b border-r border-summit-graphite px-1 py-6 font-serif text-lg text-summit-ivory/90 transition-colors hover:text-summit-gold sm:text-xl">
                  {group}
                </span>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
