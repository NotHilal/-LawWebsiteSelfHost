import { useEffect } from "react";
import { useContent } from "../i18n/useContent";

/** Injects Organization / ProfessionalService JSON-LD using only verified fields. */
export default function StructuredData() {
  const { brand, contact, collaboration, seo } = useContent();

  useEffect(() => {
    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: brand.name,
      description: seo.home.description,
      areaServed: ["Qatar", "GCC"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Doha",
        addressCountry: "QA",
      },
      sameAs: [collaboration.url],
    };
    if (contact.email) data.email = contact.email;
    if (contact.phones.length > 0) data.telephone = contact.phones[0];
    if (contact.address) (data.address as Record<string, unknown>).streetAddress = contact.address;

    let script = document.getElementById("structured-data") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [brand.name, contact.address, contact.email, contact.phones, collaboration.url, seo.home.description]);

  return null;
}
