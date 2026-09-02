import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { useContent } from "../i18n/useContent";
import SectionLabel from "./SectionLabel";
import GoldDivider from "./GoldDivider";
import RevealOnScroll from "./RevealOnScroll";

const easing = [0.16, 1, 0.3, 1] as const;

export default function PresentationVideo() {
  const { presentationVideo } = useContent();
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-summit-black py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(201,154,89,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <RevealOnScroll>
              <SectionLabel>{presentationVideo.eyebrow}</SectionLabel>
              <GoldDivider className="my-6" />
              <h2 className="text-balance font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-medium leading-[1.15] text-summit-ivory">
                {presentationVideo.headline}
              </h2>
              <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-summit-mute sm:text-lg">
                {presentationVideo.copy}
              </p>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <RevealOnScroll delay={0.1}>
              <div className="relative aspect-video overflow-hidden bg-summit-charcoal">
                {playing ? (
                  <video
                    className="h-full w-full object-cover"
                    src={presentationVideo.src}
                    poster={presentationVideo.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <motion.button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play video: ${presentationVideo.caption}`}
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                    whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                    transition={{ duration: 0.4, ease: easing }}
                  >
                    <img
                      src={presentationVideo.poster}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(11,11,12,0.35) 40%, rgba(11,11,12,0.85) 100%)",
                      }}
                    />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-summit-gold/70 bg-summit-black/40 backdrop-blur-sm transition-colors duration-300 group-hover:border-summit-gold group-hover:bg-summit-black/60 sm:h-20 sm:w-20">
                      <Play
                        className="ml-0.5 h-6 w-6 text-summit-gold sm:h-7 sm:w-7"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 flex items-end p-5 sm:p-6">
                      <span className="text-xs uppercase tracking-[0.18em] text-summit-mute">
                        {presentationVideo.caption}
                      </span>
                    </span>
                  </motion.button>
                )}
              </div>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-summit-gold to-transparent" />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
