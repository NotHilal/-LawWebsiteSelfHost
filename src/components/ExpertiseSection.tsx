import { expertise } from "../data/siteContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";
import ExpertiseCard from "./ExpertiseCard";

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll className="max-w-2xl">
          <SectionLabel>Integrated Advisory Expertise</SectionLabel>
          <GoldDivider className="my-6" />
          <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.15] text-summit-ivory">
            Strategy, execution and governance under one advisory framework.
          </h2>
        </RevealOnScroll>

        <div className="mt-16">
          {expertise.map((group, i) => (
            <RevealOnScroll key={group.number} delay={i * 0.05}>
              <ExpertiseCard group={group} defaultOpen={i === 0} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
