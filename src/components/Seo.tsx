import { useEffect } from "react";
import { useContent, useLang } from "../i18n/useContent";
import { metaFor } from "../i18n";
import type { SiteContent } from "../i18n";

type SeoPage = keyof SiteContent["seo"];

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Updates document title and meta/OG tags per route and per language.
 * No external dependency required.
 */
export default function Seo({ page }: { page: SeoPage }) {
  const { seo } = useContent();
  const { lang } = useLang();
  const { title, description } = seo[page];

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", window.location.href);
    setMeta("property", "og:locale", metaFor(lang).locale);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, [title, description, lang]);

  return null;
}
