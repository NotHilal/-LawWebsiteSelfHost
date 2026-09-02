import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import ExpertiseSection from "../components/ExpertiseSection";
import WhoWeAdvise from "../components/WhoWeAdvise";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function Expertise() {
  const { pages } = useContent();
  return (
    <>
      <Seo page="expertise" />
      <PageHeader
        eyebrow={pages.expertise.eyebrow}
        title={pages.expertise.title}
        copy={pages.expertise.copy}
      />
      <ExpertiseSection />
      <WhoWeAdvise />
      <ConsultationCTA />
    </>
  );
}
