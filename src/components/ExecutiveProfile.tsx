import { executiveProfile } from "../data/siteContent";
import { media } from "../data/media";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function ExecutiveProfile() {
  return (
    <section className="bg-summit-black py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <RevealOnScroll className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden border border-summit-graphite">
              <img
                src={media.portrait}
                alt={`Portrait of ${executiveProfile.name}, ${executiveProfile.title} at Summit Management Consultancy`}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 100%", transform: "scale(1.7)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-summit-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden h-24 w-24 border border-summit-gold/40 sm:block" aria-hidden="true" />
          </RevealOnScroll>

          <div>
            <RevealOnScroll delay={0.1}>
              <SectionLabel>Leadership</SectionLabel>
              <GoldDivider className="my-6" />
              <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,2.9rem)] font-medium leading-[1.15] text-summit-ivory">
                {executiveProfile.headline}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} className="mt-8 space-y-5">
              {executiveProfile.bio.map((p, i) => (
                <p key={i} className="text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
                  {p}
                </p>
              ))}
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} className="mt-10 border-t border-summit-graphite pt-8">
              <p className="font-serif text-xl text-summit-ivory">{executiveProfile.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-summit-gold">{executiveProfile.title}</p>
              <img
                src={media.emblem}
                alt=""
                role="presentation"
                aria-hidden="true"
                className="mt-6 h-10 w-auto opacity-80"
              />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
