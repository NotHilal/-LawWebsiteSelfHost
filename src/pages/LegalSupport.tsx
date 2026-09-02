import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import LegalBridge from "../components/LegalBridge";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionLabel from "../components/SectionLabel";
import GoldDivider from "../components/GoldDivider";
import CollaborationSection from "../components/CollaborationSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function LegalSupport() {
  const { expertise, pages } = useContent();
  const legalGroup = expertise[2];

  return (
    <>
      <Seo page="legalSupport" />
      <PageHeader
        eyebrow={pages.legalSupport.eyebrow}
        title={legalGroup.title}
        copy={legalGroup.summary}
      />

      <section className="bg-summit-black py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <RevealOnScroll>
            <LegalBridge />
          </RevealOnScroll>

          <div className="mt-16 grid grid-cols-1 gap-12 border-t border-summit-graphite pt-16 sm:grid-cols-2 lg:gap-16">
            {legalGroup.subsections.map((sub, i) => (
              <RevealOnScroll key={sub.heading} delay={i * 0.1}>
                <SectionLabel>{sub.heading}</SectionLabel>
                <GoldDivider className="my-5" />
                <ul className="space-y-3">
                  {sub.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-summit-ivory/80 sm:text-base">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-summit-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            ))}
          </div>

          {legalGroup.note && (
            <RevealOnScroll delay={0.2} className="mt-16 max-w-3xl border-s-2 border-summit-gold/50 ps-6">
              <p className="text-balance text-sm italic leading-relaxed text-summit-mute sm:text-base">
                {legalGroup.note}
              </p>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <CollaborationSection />
      <ConsultationCTA />
    </>
  );
}
