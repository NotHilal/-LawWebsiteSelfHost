import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import CollaborationSection from "../components/CollaborationSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo } from "../data/siteContent";

export default function Collaboration() {
  return (
    <>
      <Seo title={seo.collaboration.title} description={seo.collaboration.description} />
      <PageHeader
        eyebrow="Strategic Collaboration"
        title="Connecting management intelligence with specialist legal expertise."
        copy="Summit Management Consultancy works alongside trusted legal partners on matters where sophisticated legal, commercial, arbitration, technical, and strategic expertise intersect."
      />
      <CollaborationSection />
      <ConsultationCTA />
    </>
  );
}
