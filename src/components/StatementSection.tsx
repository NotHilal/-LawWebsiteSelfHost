import { useContent } from "../i18n/useContent";
import { media } from "../data/media";
import RevealOnScroll from "./RevealOnScroll";
import GoldDivider from "./GoldDivider";

export default function StatementSection() {
  const { statement } = useContent();
  return (
    <section className="relative overflow-hidden bg-summit-black py-28 sm:py-36">
      <img
        src={media.emblem}
        alt=""
        role="presentation"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[700px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06] sm:w-[900px]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,154,89,0.08), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
        <RevealOnScroll>
          <GoldDivider align="center" width={56} className="mb-10" />
          <p className="text-balance font-serif text-[clamp(1.6rem,4vw,2.75rem)] font-light italic leading-[1.35] text-summit-ivory">
            &ldquo;{statement.quote}&rdquo;
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
