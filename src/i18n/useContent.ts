import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";
import type { Lang, SiteContent } from "./index";

function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("i18n hooks must be used inside <LanguageProvider>");
  }
  return ctx;
}

/** The active language dictionary. Components re-render when the language changes. */
export function useContent(): SiteContent {
  return useLanguageContext().content;
}

/** `{ lang, setLang, dir, dirSign }` for the language switcher and RTL-aware motion. */
export function useLang(): {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
  dirSign: 1 | -1;
} {
  const { lang, setLang, dir, dirSign } = useLanguageContext();
  return { lang, setLang, dir, dirSign };
}
