import { industries } from "../data/siteContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function Industries() {
  return (
    <section className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll className="max-w-2xl">
          <SectionLabel>Industries &amp; Environments</SectionLabel>
          <GoldDivider className="my-6" />
          <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.15] text-summit-ivory">
            {industries.heading}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-14 flex flex-wrap gap-x-3 gap-y-4">
          {industries.items.map((item) => (
            <span
              key={item}
              className="border border-summit-graphite px-5 py-3 text-sm text-summit-ivory/85 transition-colors hover:border-summit-gold/60 hover:text-summit-gold"
            >
              {item}
            </span>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
