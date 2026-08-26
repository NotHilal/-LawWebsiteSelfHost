import { motion } from "framer-motion";
import type { RecognitionItem } from "../data/siteContent";

export default function RecognitionCard({ item }: { item: RecognitionItem }) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative overflow-hidden border border-summit-graphite bg-summit-ivory"
    >
      <div className="flex h-44 items-center justify-center px-8 py-6 sm:h-52">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="relative border-t border-summit-black/10 bg-summit-black px-6 py-5">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-summit-mute-dark">{item.organization}</p>
        <p className="mt-1 font-serif text-lg text-summit-ivory">{item.category}</p>

        <motion.div
          variants={{ rest: { height: 0, opacity: 0 }, hover: { height: "auto", opacity: 1 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-3 flex items-center gap-3 border-t border-summit-graphite pt-3">
            <span
              className={`px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] ${
                item.status === "Winner"
                  ? "bg-summit-gold text-summit-black"
                  : "border border-summit-gold/60 text-summit-gold"
              }`}
            >
              {item.status} · {item.year}
            </span>
            <span className="text-xs text-summit-mute">{item.detail}</span>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
