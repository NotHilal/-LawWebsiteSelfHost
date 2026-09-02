import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useContent, useLang } from "../i18n/useContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

export default function LifecycleTimeline() {
  const { lifecycle, ui } = useContent();
  const { dir } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <section id="project-lifecycle" className="bg-summit-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <RevealOnScroll className="max-w-2xl">
          <SectionLabel>{ui.sectionLabels.projectLifecycle}</SectionLabel>
          <GoldDivider className="my-6" />
          <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.15] text-summit-ivory">
            {lifecycle.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-summit-mute sm:text-lg">{lifecycle.supporting}</p>
        </RevealOnScroll>

        <div ref={containerRef} className="mt-20">
          {/* Desktop / tablet — horizontal */}
          <div className="relative hidden lg:block">
            <div className="no-scrollbar overflow-x-auto pb-2">
              <div className="relative" style={{ width: lifecycle.stages.length * 168 }}>
                <div className="absolute inset-x-0 top-5 h-px bg-summit-graphite" />
                <motion.div
                  className="absolute start-0 top-5 h-px origin-left bg-gradient-to-r from-summit-gold via-summit-gold-soft to-summit-gold rtl:origin-right"
                  style={{ scaleX: progress, width: "100%" }}
                />
                <ol className="relative flex">
                  {lifecycle.stages.map((stage) => (
                    <li key={stage.number} className="flex w-[168px] flex-none flex-col items-start pe-6">
                      <span className="relative z-10 mb-6 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-summit-gold ring-4 ring-summit-charcoal" />
                      <span className="font-serif text-sm text-summit-gold/70">{stage.number}</span>
                      <span className="mt-1 font-serif text-base leading-snug text-summit-ivory">{stage.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-summit-mute-dark">
              {ui.lifecycle.scrollHint} {dir === "rtl" ? "←" : "→"}
            </p>
          </div>

          {/* Mobile / small tablet — vertical */}
          <div className="relative lg:hidden">
            <div className="absolute start-[5px] top-1 bottom-1 w-px bg-summit-graphite" />
            <motion.div
              className="absolute start-[5px] top-1 w-px origin-top bg-gradient-to-b from-summit-gold via-summit-gold-soft to-summit-gold"
              style={{ scaleY: progress, height: "100%" }}
            />
            <ol className="relative space-y-10">
              {lifecycle.stages.map((stage) => (
                <li key={stage.number} className="flex items-start gap-6 ps-0">
                  <span className="relative z-10 mt-2 flex h-2.5 w-2.5 flex-none items-center justify-center rounded-full bg-summit-gold" />
                  <div>
                    <span className="font-serif text-sm text-summit-gold/70">{stage.number}</span>
                    <p className="font-serif text-xl leading-snug text-summit-ivory">{stage.title}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
