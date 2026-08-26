import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Introduction from "../components/Introduction";
import WhySummit from "../components/WhySummit";
import ExecutiveProfile from "../components/ExecutiveProfile";
import PrinciplesSection from "../components/PrinciplesSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo, introduction } from "../data/siteContent";

export default function About() {
  return (
    <>
      <Seo title={seo.about.title} description={seo.about.description} />
      <PageHeader
        eyebrow="About Summit"
        title="An elite practice built on public-sector and executive experience."
        copy={introduction.paragraphs[0]}
      />
      <Introduction />
      <ExecutiveProfile />
      <WhySummit />
      <PrinciplesSection />
      <ConsultationCTA />
    </>
  );
}
