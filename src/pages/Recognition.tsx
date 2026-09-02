import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import RecognitionSection from "../components/RecognitionSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function Recognition() {
  const { pages } = useContent();
  return (
    <>
      <Seo page="recognition" />
      <PageHeader
        eyebrow={pages.recognition.eyebrow}
        title={pages.recognition.title}
        copy={pages.recognition.copy}
      />
      <RecognitionSection />
      <ConsultationCTA />
    </>
  );
}
