import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import LifecycleTimeline from "../components/LifecycleTimeline";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo } from "../data/siteContent";

export default function ProjectLifecycle() {
  return (
    <>
      <Seo title={seo.projectLifecycle.title} description={seo.projectLifecycle.description} />
      <PageHeader
        eyebrow="Project Lifecycle"
        title="Complete lifecycle visibility, from strategy to delivery."
        copy="A single advisory relationship spanning ten stages — from initial strategic assessment through post-project review."
      />
      <LifecycleTimeline />
      <ConsultationCTA />
    </>
  );
}
