import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { media } from "../data/media";
import AnimatedHeading from "./AnimatedHeading";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: ReactNode;
};

const easing = [0.16, 1, 0.3, 1] as const;

export default function PageHeader({ eyebrow, title, copy }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-summit-black pb-16 pt-36 sm:pb-20 sm:pt-44">
      <img
        src={media.emblem}
        alt=""
        role="presentation"
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-16 w-[420px] max-w-none opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-xs font-medium tracking-[0.28em] text-summit-gold sm:text-sm"
        >
          {eyebrow}
        </motion.p>
        <AnimatedHeading
          lines={[title]}
          as="h1"
          delay={0.1}
          className="mt-5 max-w-3xl text-balance font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] font-medium leading-[1.1] text-summit-ivory"
        />
        {copy && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easing }}
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-summit-mute sm:text-lg"
          >
            {copy}
          </motion.p>
        )}
      </div>
    </section>
  );
}
