import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import CollaborationSection from "../components/CollaborationSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function Collaboration() {
  const { pages } = useContent();
  return (
    <>
      <Seo page="collaboration" />
      <PageHeader
        eyebrow={pages.collaboration.eyebrow}
        title={pages.collaboration.title}
        copy={pages.collaboration.copy}
      />
      <CollaborationSection />
      <ConsultationCTA />
    </>
  );
}
