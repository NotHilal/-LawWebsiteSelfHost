import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import { seo, brand } from "../data/siteContent";

const sections = [
  {
    heading: "Information We Collect",
    body: "When you submit a consultation request, we collect the information you provide directly — including your name, organization, position, email address, phone number, area of interest, and message content.",
  },
  {
    heading: "How We Use Your Information",
    body: "Information submitted through our consultation form is used solely to respond to your enquiry and, where a working relationship follows, to administer that engagement. We do not sell or rent personal information to third parties.",
  },
  {
    heading: "Confidentiality",
    body: "Enquiries are treated with the same discretion expected of an executive advisory practice. Details shared with us are handled on a confidential basis, consistent with the sensitivity of the matters we support.",
  },
  {
    heading: "Data Retention",
    body: "We retain enquiry information only for as long as reasonably necessary to respond to your request or, where a formal engagement follows, in accordance with that engagement's terms.",
  },
  {
    heading: "Contact",
    body: `Questions about this privacy notice may be directed to ${brand.name} through the consultation form on our Contact page.`,
  },
];

export default function Privacy() {
  return (
    <>
      <Seo title={seo.privacy.title} description={seo.privacy.description} />
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Practices"
        copy="How Summit Management Consultancy handles information shared through this website."
      />

      <section className="bg-summit-black pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl space-y-12 px-6 sm:px-10 lg:px-14">
          {sections.map((s, i) => (
            <RevealOnScroll key={s.heading} delay={i * 0.05}>
              <h2 className="font-serif text-xl text-summit-ivory sm:text-2xl">{s.heading}</h2>
              <p className="mt-3 text-balance text-sm leading-relaxed text-summit-mute sm:text-base">
                {s.body}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
