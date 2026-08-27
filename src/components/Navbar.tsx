import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { nav } from "../data/siteContent";
import { media } from "../data/media";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
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
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
          <Link to="/" className="flex items-center gap-3" aria-label="Summit Management Consultancy — Home">
            <img src={media.emblem} alt="" role="presentation" className="h-9 w-auto" />
            <span className="hidden sm:flex sm:flex-col sm:leading-tight">
              <span className="font-serif text-lg tracking-[0.12em] text-summit-ivory">SUMMIT</span>
              <span className="hidden font-sans text-[0.58rem] tracking-[0.24em] text-summit-mute lg:block">
                MANAGEMENT CONSULTANCY
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
            {nav.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group relative whitespace-nowrap py-1 text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-colors ${
                    isActive ? "text-summit-gold" : "text-summit-ivory/85 hover:text-summit-ivory"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.shortLabel ?? item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-summit-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/ask-a-question"
              className="hidden whitespace-nowrap border border-summit-gold/60 px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.1em] uppercase text-summit-ivory transition-colors duration-300 hover:border-summit-gold hover:bg-summit-gold/10 lg:inline-block"
            >
              Ask a Question
            </Link>
            <Link
              to="/contact"
              className="hidden whitespace-nowrap border border-summit-gold/60 px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.1em] uppercase text-summit-ivory transition-colors duration-300 hover:border-summit-gold hover:bg-summit-gold/10 lg:inline-block"
            >
              Request a Consultation
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
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
