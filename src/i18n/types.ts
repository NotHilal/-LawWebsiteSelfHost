/**
 * Shared i18n types. Kept dependency-free so both the dictionaries and the
 * provider can import from here without cycles.
 */

export type Lang = "en" | "fr" | "ar";

export type LanguageMeta = {
  code: Lang;
  /** Native label shown in the switcher. */
  label: string;
  /** Short code shown in the collapsed switcher. */
  short: string;
  dir: "ltr" | "rtl";
  /** BCP-47 tag for <html lang> and og:locale. */
  locale: string;
};

export type ExpertiseGroup = {
  number: string;
  title: string;
  summary: string;
  subsections: {
    heading: string;
    items: string[];
  }[];
  note?: string;
};

/**
 * Translatable text for a recognition award. The image + id live in
 * src/data/media.ts and are merged by `id` at render time.
 */
export type RecognitionText = {
  id: string;
  /** Language-independent flag driving the badge style. */
  variant: "winner" | "shortlisted";
  organization: string;
  category: string;
  status: string;
  year: string;
  detail: string;
  imageAlt: string;
};
