import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { ExpertiseGroup } from "../i18n";

const easing = [0.16, 1, 0.3, 1] as const;

export default function ExpertiseCard({ group, defaultOpen = false }: { group: ExpertiseGroup; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-summit-graphite py-8 first:border-t-0 lg:py-10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 text-start"
      >
        <div className="flex gap-6 sm:gap-10">
          <span className="font-serif text-2xl text-summit-gold/70 sm:text-3xl">{group.number}</span>
          <div>
            <h3 className="font-serif text-xl font-medium text-summit-ivory sm:text-2xl lg:text-[1.75rem]">
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-summit-mute sm:text-base">
              {group.summary}
            </p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: easing }}
          className="mt-1 flex h-9 w-9 flex-none items-center justify-center border border-summit-gold/40 text-summit-gold"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 ps-0 pt-8 sm:grid-cols-2 sm:ps-[4.5rem] lg:ps-[5.5rem]">
              {group.subsections.map((sub) => (
                <div key={sub.heading}>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-summit-gold">
                    {sub.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {sub.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-summit-ivory/80">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-summit-gold/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {group.note && (
              <p className="mt-6 max-w-2xl ps-0 text-sm italic leading-relaxed text-summit-mute sm:ps-[4.5rem] lg:ps-[5.5rem]">
                {group.note}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
