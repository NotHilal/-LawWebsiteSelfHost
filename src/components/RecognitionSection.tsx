import { recognition } from "../data/siteContent";
import { recognitionItems } from "../data/media";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";
import RecognitionCard from "./RecognitionCard";

export default function RecognitionSection() {
  return (
    <section id="recognition" className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll className="max-w-2xl">
          <SectionLabel>{recognition.heading}</SectionLabel>
          <GoldDivider className="my-6" />
          <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.15] text-summit-ivory">
            {recognition.statement}
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {recognitionItems.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.1}>
              <RecognitionCard item={item} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <p className="mx-auto mt-16 max-w-2xl text-balance text-center font-serif text-xl italic leading-relaxed text-summit-mute">
            {recognition.footer}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
