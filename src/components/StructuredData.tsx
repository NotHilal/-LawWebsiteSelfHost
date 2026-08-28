import { useEffect } from "react";
import { brand, contact, collaboration } from "../data/siteContent";

/** Injects Organization / ProfessionalService JSON-LD using only verified fields. */
export default function StructuredData() {
  useEffect(() => {
    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: brand.name,
      description:
        "Executive strategic advisory, project lifecycle management, government and institutional consulting, commercial strategy, and legal-support expertise in Qatar and the GCC.",
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
  }, []);

  return null;
}
