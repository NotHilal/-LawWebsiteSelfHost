import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useContent } from "../i18n/useContent";
import { media } from "../data/media";
import LanguageSwitcher from "./LanguageSwitcher";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { nav, ui } = useContent();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] flex flex-col bg-summit-black lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <img src={media.emblem} alt="" role="presentation" className="h-8 w-auto" />
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-summit-ivory"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile primary">
            {nav.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block border-b border-summit-graphite py-4 font-serif text-3xl transition-colors ${
                      isActive ? "text-summit-gold" : "text-summit-ivory hover:text-summit-gold"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 px-8 pb-10">
            <div className="mb-2 flex justify-center border-b border-summit-graphite pb-4">
              <LanguageSwitcher variant="inline" />
            </div>
            <NavLink
              to="/ask-a-question"
              onClick={onClose}
              className="block border border-summit-gold/60 py-4 text-center text-xs font-medium tracking-[0.2em] uppercase text-summit-ivory"
            >
              {ui.navCta.askQuestion}
            </NavLink>
            <NavLink
              to="/contact"
              onClick={onClose}
              className="block border border-summit-gold/60 py-4 text-center text-xs font-medium tracking-[0.2em] uppercase text-summit-ivory"
            >
              {ui.navCta.requestConsultation}
            </NavLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
