import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import RecognitionSection from "../components/RecognitionSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo } from "../data/siteContent";

export default function Recognition() {
  return (
    <>
      <Seo title={seo.recognition.title} description={seo.recognition.description} />
      <PageHeader
        eyebrow="Recognition"
        title="Professional recognition, earned through high-stakes responsibility."
        copy="A closer look at the awards and shortlists reflecting the lead advisor's professional track record."
      />
      <RecognitionSection />
      <ConsultationCTA />
    </>
  );
}
