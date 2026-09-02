import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import LifecycleTimeline from "../components/LifecycleTimeline";
import ConsultationCTA from "../components/ConsultationCTA";
import { useContent } from "../i18n/useContent";

export default function ProjectLifecycle() {
  const { pages } = useContent();
  return (
    <>
      <Seo page="projectLifecycle" />
      <PageHeader
        eyebrow={pages.projectLifecycle.eyebrow}
        title={pages.projectLifecycle.title}
        copy={pages.projectLifecycle.copy}
      />
      <LifecycleTimeline />
      <ConsultationCTA />
    </>
  );
}
