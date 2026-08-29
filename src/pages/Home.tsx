import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import PresentationVideo from "../components/PresentationVideo";
import Industries from "../components/Industries";
import StatementSection from "../components/StatementSection";
import ConsultationCTA from "../components/ConsultationCTA";
import { seo } from "../data/siteContent";

export default function Home() {
  return (
    <>
      <Seo title={seo.home.title} description={seo.home.description} />
      <Hero />
      <Introduction />
      <PresentationVideo />
      <Industries />
      <StatementSection />
      <ConsultationCTA />
    </>
  );
}
