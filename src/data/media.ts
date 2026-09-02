/**
 * Supplied brand imagery, wired to editorial content that references it.
 * Kept separate from the i18n dictionaries because Vite resolves these as module
 * imports (hashed, optimized) rather than plain strings.
 *
 * Award text (organization, category, alt text, …) lives in the i18n
 * dictionaries under `recognition.items` and is merged with the image here by
 * `id` at render time (see src/components/RecognitionSection.tsx).
 */
import emblem from "../assets/emblem.webp";
import portrait from "../assets/portrait.webp";
import heroPortrait from "../assets/hero-portrait.jpg";
import awardLexisNexis from "../assets/award-lexisnexis.webp";
import awardQatarBLF from "../assets/award-qatar-blf.webp";
import aiIcon from "../assets/chatbot-avatar.webp";
import businessCardFront from "../assets/business-card-front.png";
import businessCardBack from "../assets/business-card-back.png";

export const media = {
  emblem,
  portrait,
  heroPortrait,
  awardLexisNexis,
  awardQatarBLF,
  aiIcon,
  businessCardFront,
  businessCardBack,
};

/** Award artwork keyed by the same `id` used in each dictionary's `recognition.items`. */
export const recognitionImages: Record<string, string> = {
  "qatar-business-law-forum-2024": awardQatarBLF,
  "lexisnexis-mena-legal-awards-2025": awardLexisNexis,
};
