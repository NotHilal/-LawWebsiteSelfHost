import type { Lang, LanguageMeta } from "./types";
import en, { type SiteContent } from "./content.en";
import fr from "./content.fr";
import ar from "./content.ar";

export type { Lang, LanguageMeta, SiteContent };
export type { ExpertiseGroup, RecognitionText } from "./types";

export const DEFAULT_LANG: Lang = "en";

export const LANGUAGES: LanguageMeta[] = [
  { code: "en", label: "English", short: "EN", dir: "ltr", locale: "en" },
  { code: "fr", label: "Français", short: "FR", dir: "ltr", locale: "fr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl", locale: "ar" },
];

export const DICTIONARIES: Record<Lang, SiteContent> = { en, fr, ar };

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "fr" || value === "ar";
}

export function metaFor(lang: Lang): LanguageMeta {
  return LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
}
