import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  DICTIONARIES,
  isLang,
  metaFor,
  type Lang,
  type SiteContent,
} from "./index";

const STORAGE_KEY = "summit_lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Active dictionary. */
  content: SiteContent;
  /** Layout direction for the active language. */
  dir: "ltr" | "rtl";
  /** +1 for LTR, -1 for RTL — multiply framer-motion `x` offsets by this. */
  dirSign: 1 | -1;
};

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;

  // 1. explicit ?lang= wins (shareable links)
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromQuery)) return fromQuery;

  // 2. previously chosen
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* storage blocked — fall through */
  }

  // 3. browser preference
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  if (isLang(nav)) return nav;

  return DEFAULT_LANG;
}

function applyDocumentLang(lang: Lang) {
  if (typeof document === "undefined") return;
  const meta = metaFor(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = meta.dir;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    applyDocumentLang(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage blocked — the choice just won't persist */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const value = useMemo<LanguageContextValue>(() => {
    const meta = metaFor(lang);
    return {
      lang,
      setLang,
      content: DICTIONARIES[lang],
      dir: meta.dir,
      dirSign: meta.dir === "rtl" ? -1 : 1,
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
