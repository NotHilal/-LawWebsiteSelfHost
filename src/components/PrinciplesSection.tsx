import { useContent } from "../i18n/useContent";
import RevealOnScroll from "./RevealOnScroll";

export default function PrinciplesSection() {
  const { principles } = useContent();
  return (
    <section className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 divide-y divide-summit-graphite sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {principles.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1} className="px-0 py-10 sm:px-8 sm:py-4 first:ps-0">
              <span className="font-serif text-4xl text-summit-gold/40 sm:text-5xl">{`0${i + 1}`}</span>
              <h3 className="mt-4 font-serif text-2xl font-medium text-summit-ivory sm:text-[1.7rem]">
                {p.title}
              </h3>
              <p className="mt-3 max-w-xs text-balance text-sm leading-relaxed text-summit-mute sm:text-base">
                {p.copy}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
