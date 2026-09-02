import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import { useContent } from "../i18n/useContent";

export default function Privacy() {
  const { pages } = useContent();
  const { eyebrow, title, copy, sections } = pages.privacy;

  return (
    <>
      <Seo page="privacy" />
      <PageHeader eyebrow={eyebrow} title={title} copy={copy} />

      <section className="bg-summit-black pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl space-y-12 px-6 sm:px-10 lg:px-14">
          {sections.map((s, i) => (
            <RevealOnScroll key={s.heading} delay={i * 0.05}>
              <h2 className="font-serif text-xl text-summit-ivory sm:text-2xl">{s.heading}</h2>
              <p className="mt-3 text-balance text-sm leading-relaxed text-summit-mute sm:text-base">
                {s.body}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
