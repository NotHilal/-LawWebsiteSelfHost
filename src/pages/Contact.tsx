import { MapPin, Mail, Phone, Clock } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import RevealOnScroll from "../components/RevealOnScroll";
import GoldDivider from "../components/GoldDivider";
import BusinessCard from "../components/BusinessCard";
import { useContent } from "../i18n/useContent";

export default function Contact() {
  const { pages, consultation, contact, ui } = useContent();

  return (
    <>
      <Seo page="contact" />
      <PageHeader eyebrow={pages.contact.eyebrow} title={consultation.heading} copy={consultation.copy} />

      <section className="bg-summit-black pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <RevealOnScroll>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-summit-mute">
                {ui.sectionLabels.getInTouch}
              </p>
              <GoldDivider className="my-6" />
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-summit-ivory/85">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-summit-gold" aria-hidden="true" />
                  <span>{contact.city}</span>
                </li>
                {contact.email && (
                  <li className="flex items-start gap-3 text-summit-ivory/85">
                    <Mail className="mt-0.5 h-4 w-4 flex-none text-summit-gold" aria-hidden="true" />
                    <a href={`mailto:${contact.email}`} className="hover:text-summit-gold">
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phones.map((phone) => (
                  <li key={phone} className="flex items-start gap-3 text-summit-ivory/85">
                    <Phone className="mt-0.5 h-4 w-4 flex-none text-summit-gold" aria-hidden="true" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} dir="ltr" className="hover:text-summit-gold">
                      {phone}
                    </a>
                  </li>
                ))}
                {contact.hours && (
                  <li className="flex items-start gap-3 text-summit-ivory/85">
                    <Clock className="mt-0.5 h-4 w-4 flex-none text-summit-gold" aria-hidden="true" />
                    <span>{contact.hours}</span>
                  </li>
                )}
              </ul>

              <p className="mt-10 max-w-sm text-sm leading-relaxed text-summit-mute">
                {ui.contactPage.confidentialityNote}
              </p>

              <div className="mt-10">
                <BusinessCard />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
