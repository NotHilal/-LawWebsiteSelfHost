import { consultation } from "../data/siteContent";
import RevealOnScroll from "./RevealOnScroll";
import GoldDivider from "./GoldDivider";
import Cta from "./Cta";

export default function ConsultationCTA() {
  return (
    <section className="bg-summit-black py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <RevealOnScroll>
          <GoldDivider align="center" width={48} className="mb-8" />
          <h2 className="text-balance font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.15] text-summit-ivory">
            {consultation.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
            {consultation.copy}
          </p>
          <div className="mt-10">
            <Cta to="/contact" variant="primary">
              {consultation.ctaLabel}
            </Cta>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
