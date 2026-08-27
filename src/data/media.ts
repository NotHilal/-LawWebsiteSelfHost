/**
 * Supplied brand imagery, wired to editorial content that references it.
 * Kept separate from siteContent.ts because Vite resolves these as module
 * imports (hashed, optimized) rather than plain strings.
 */
import emblem from "../assets/emblem.webp";
import portrait from "../assets/portrait.webp";
import heroPortrait from "../assets/hero-portrait.jpg";
import awardLexisNexis from "../assets/award-lexisnexis.webp";
import awardQatarBLF from "../assets/award-qatar-blf.webp";
import aiIcon from "../../img/ai.jpg";
import type { RecognitionItem } from "./siteContent";

export const media = {
  emblem,
  portrait,
  heroPortrait,
  awardLexisNexis,
  awardQatarBLF,
  aiIcon,
};

export const recognitionItems: RecognitionItem[] = [
  {
    id: "qatar-business-law-forum-2024",
    organization: "Qatar Business Law Forum",
    category: "Legal Counsel of the Year",
    status: "Winner",
    year: "2024",
    detail: "Soukeina Awdeh — Tadmur Holding WLL",
    image: awardQatarBLF,
    imageAlt:
      "Qatar Business Law Forum award — Legal Counsel of the Year, Winner 2024, presented to Soukeina Awdeh, Tadmur Holding WLL",
  },
  {
    id: "lexisnexis-mena-legal-awards-2025",
    organization: "LexisNexis Middle East Legal Awards",
    category: "In-House Team of the Year",
    status: "Shortlisted",
    year: "2025",
    detail: "Middle East Legal Awards — In-House Team of the Year",
    image: awardLexisNexis,
    imageAlt:
      "LexisNexis Middle East Legal Awards — Shortlisted 2025, In-House Team of the Year",
  },
];
