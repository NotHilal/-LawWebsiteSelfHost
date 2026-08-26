import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../data/siteContent";
import { media } from "../data/media";
import Cta from "./Cta";
import GoldDivider from "./GoldDivider";

const easing = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-summit-black pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
      {/* Ambient radial glow + watermark emblem */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(201,154,89,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <img
        src={media.emblem}
        alt=""
        role="presentation"
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 w-[560px] max-w-none opacity-[0.04] sm:opacity-[0.06]"
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-8 lg:px-14">
        <div className="max-w-2xl">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing }}
            className="text-xs font-medium tracking-[0.32em] text-summit-gold sm:text-sm"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 overflow-hidden font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] text-summit-ivory">
            <span className="block overflow-hidden">
              <motion.span
                initial={reduceMotion ? undefined : { y: "110%" }}
                animate={reduceMotion ? undefined : { y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15, ease: easing }}
                className="block"
              >
                {hero.headlineLine1}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={reduceMotion ? undefined : { y: "110%" }}
                animate={reduceMotion ? undefined : { y: "0%" }}
                transition={{ duration: 0.9, delay: 0.32, ease: easing }}
                className="block text-summit-gold"
              >
                {hero.headlineLine2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: easing }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-summit-mute sm:text-lg"
          >
            {hero.copy}
          </motion.p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easing }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Cta to={hero.ctaPrimary.to} variant="primary">
              {hero.ctaPrimary.label}
            </Cta>
            <Cta to={hero.ctaSecondary.to} variant="outline">
              {hero.ctaSecondary.label}
            </Cta>
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.95, ease: easing }}
            className="mt-16"
          >
            <GoldDivider width={48} className="mb-5" />
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.14em] text-summit-mute-dark">
              {hero.credibilityStrip.map((item, i) => (
                <li key={item} className="flex items-center gap-6">
                  {i > 0 && <span className="text-summit-gold/50">•</span>}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: easing }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 55%, rgba(11,11,12,0.9) 100%)",
              }}
            />
            <img
              src={media.heroPortrait}
              alt="Portrait of Soukeina Awdeh, Founder and Lead Advisor at Summit Management Consultancy"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 20%" }}
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-summit-black to-transparent" />
          </div>
          <div className="absolute -bottom-4 left-1/2 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-summit-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
