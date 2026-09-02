import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Introduction from "../components/Introduction";
import WhySummit from "../components/WhySummit";
import ExecutiveProfile from "../components/ExecutiveProfile";
import PrinciplesSection from "../components/PrinciplesSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function About() {
  const { pages, introduction } = useContent();
  return (
    <>
      <Seo page="about" />
      <PageHeader
        eyebrow={pages.about.eyebrow}
        title={pages.about.title}
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
