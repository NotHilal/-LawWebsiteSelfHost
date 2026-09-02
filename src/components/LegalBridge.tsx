import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useContent, useLang } from "../i18n/useContent";

const easing = [0.16, 1, 0.3, 1] as const;

export default function LegalBridge() {
  const { ui } = useContent();
  const { dirSign } = useLang();
  const nodes = ui.legalBridge.nodes;
  return (
    <div className="relative mx-auto flex max-w-xl flex-col items-center py-4">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.line
          x1="200" y1="200" x2="200" y2="40"
          stroke="#C99A59" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easing }}
        />
        <motion.line
          x1="200" y1="200" x2="200" y2="360"
          stroke="#C99A59" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: easing }}
        />
        <motion.line
          x1="200" y1="200" x2="40" y2="200"
          stroke="#C99A59" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easing }}
        />
        <motion.line
          x1="200" y1="200" x2="360" y2="200"
          stroke="#C99A59" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easing }}
        />
      </svg>

      <div className="relative grid aspect-square w-full max-w-[400px] grid-cols-3 grid-rows-3 place-items-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing }}
          className="col-start-2 row-start-1 font-serif text-lg text-summit-ivory sm:text-xl"
        >
          {nodes[0]}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10 * dirSign }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: easing }}
          className="col-start-1 row-start-2 font-serif text-lg text-summit-ivory sm:text-xl"
        >
          {nodes[2]}
        </motion.span>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: easing }}
          className="col-start-2 row-start-2 flex h-16 w-16 items-center justify-center rounded-full border border-summit-gold/50 text-summit-gold sm:h-20 sm:w-20"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
        </motion.span>

        <motion.span
          initial={{ opacity: 0, x: 10 * dirSign }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: easing }}
          className="col-start-3 row-start-2 font-serif text-lg text-summit-ivory sm:text-xl"
        >
          {nodes[1]}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45, ease: easing }}
          className="col-start-2 row-start-3 font-serif text-lg text-summit-ivory sm:text-xl"
        >
          {nodes[3]}
        </motion.span>
      </div>
    </div>
  );
}
