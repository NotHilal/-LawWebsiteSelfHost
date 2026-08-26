import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import ExpertiseSection from "../components/ExpertiseSection";
import WhoWeAdvise from "../components/WhoWeAdvise";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo } from "../data/siteContent";

export default function Expertise() {
  return (
    <>
      <Seo title={seo.expertise.title} description={seo.expertise.description} />
      <PageHeader
        eyebrow="Advisory Expertise"
        title="Strategy, execution and governance under one framework."
        copy="Four integrated capabilities spanning project lifecycle management, executive advisory, legal practice support, and institutional governance."
      />
      <ExpertiseSection />
      <WhoWeAdvise />
      <ConsultationCTA />
    </>
  );
}
