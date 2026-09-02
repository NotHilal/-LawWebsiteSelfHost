import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useContent, useLang } from "../i18n/useContent";
import { media } from "../data/media";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { nav, ui } = useContent();
  const { dir } = useLang();
  // Arabic script is hard to read at the tiny sizes used for Latin uppercase
  // micro-labels, so bump the nav / CTA text a little in RTL.
  const rtl = dir === "rtl";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-summit-black/85 backdrop-blur-md border-b border-summit-graphite"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-8 xl:px-14">
          <Link to="/" className="flex items-center gap-3" aria-label="Summit Management Consultancy — Home">
            <img src={media.emblem} alt="" role="presentation" className="h-9 w-auto" />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-base tracking-[0.1em] text-summit-ivory sm:text-lg sm:tracking-[0.12em]">
                SUMMIT
              </span>
              <span className="font-sans text-[0.48rem] tracking-[0.16em] text-summit-mute sm:text-[0.58rem] sm:tracking-[0.24em]">
                MANAGEMENT CONSULTANCY
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Primary">
            {nav.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative whitespace-nowrap py-1 font-medium tracking-[0.12em] uppercase transition-colors ${
                    rtl ? "text-[1.05rem]" : "text-[0.7rem]"
                  } ${isActive ? "text-summit-gold" : "text-summit-ivory/85 hover:text-summit-ivory"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.shortLabel ?? item.label}
                    <span
                      className={`absolute -bottom-1 start-0 h-px bg-summit-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3 xl:gap-4">
            <Link
              to="/ask-a-question"
              className={`hidden whitespace-nowrap border border-summit-gold/60 px-3.5 py-2.5 font-medium tracking-[0.1em] uppercase text-summit-ivory transition-colors duration-300 hover:border-summit-gold hover:bg-summit-gold/10 lg:inline-block xl:px-4 ${
                rtl ? "text-[0.95rem]" : "text-[0.68rem]"
              }`}
            >
              {ui.navCta.askQuestion}
            </Link>
            <Link
              to="/contact"
              className={`hidden whitespace-nowrap border border-summit-gold/60 px-3.5 py-2.5 font-medium tracking-[0.1em] uppercase text-summit-ivory transition-colors duration-300 hover:border-summit-gold hover:bg-summit-gold/10 lg:inline-block xl:px-4 ${
                rtl ? "text-[0.95rem]" : "text-[0.68rem]"
              }`}
            >
              {ui.navCta.requestConsultation}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 text-summit-ivory lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* Kept last so it sits at the far edge of the header — right in LTR,
                left in RTL (Arabic). */}
            <LanguageSwitcher />
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
