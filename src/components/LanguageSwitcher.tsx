import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { LANGUAGES } from "../i18n";
import { useLang } from "../i18n/useContent";

/**
 * Language picker.
 *  - "bar"    → compact globe + code trigger with a dropdown (navbar).
 *  - "inline" → the three languages as a flat row of buttons, no dropdown
 *               (mobile menu, where an overlaid dropdown has nowhere to go).
 */
export default function LanguageSwitcher({ variant = "bar" }: { variant?: "bar" | "inline" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3" role="group" aria-label="Language">
        <Globe className="h-4 w-4 shrink-0 text-summit-gold" aria-hidden="true" />
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            dir={l.dir}
            aria-pressed={l.code === lang}
            onClick={() => setLang(l.code)}
            className={`py-1 text-sm font-medium uppercase tracking-[0.14em] transition-colors ${
              l.code === lang ? "text-summit-gold" : "text-summit-ivory/70 hover:text-summit-ivory"
            }`}
          >
            {l.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 border border-transparent px-1.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-summit-ivory/85 transition-colors hover:text-summit-ivory"
      >
        <Globe className="h-4 w-4 text-summit-gold" aria-hidden="true" />
        {current.short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label="Language"
            className="absolute end-0 top-full z-[90] mt-2 min-w-[9rem] border border-summit-graphite bg-summit-charcoal py-1 shadow-2xl"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  dir={l.dir}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors hover:bg-summit-graphite ${
                    l.code === lang ? "text-summit-gold" : "text-summit-ivory/85"
                  }`}
                >
                  {l.label}
                  {l.code === lang && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
