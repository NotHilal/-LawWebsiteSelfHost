import { useContent } from "../i18n/useContent";
import { media } from "../data/media";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function Introduction() {
  const { introduction } = useContent();
  return (
    <section className="relative overflow-hidden bg-summit-black py-24 sm:py-32">
      <img
        src={media.emblem}
        alt=""
        role="presentation"
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 w-[480px] max-w-none -translate-y-1/2 opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealOnScroll>
              <SectionLabel>{introduction.eyebrow}</SectionLabel>
              <GoldDivider className="my-6" />
              <h2 className="text-balance font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-medium leading-[1.15] text-summit-ivory">
                {introduction.headline}
              </h2>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6">
              {introduction.paragraphs.map((p, i) => (
                <RevealOnScroll key={i} delay={0.1 + i * 0.1}>
                  <p className="text-balance text-base leading-relaxed text-summit-mute sm:text-lg">{p}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
