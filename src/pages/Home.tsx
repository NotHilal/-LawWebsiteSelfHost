import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import PresentationVideo from "../components/PresentationVideo";
import Industries from "../components/Industries";
import StatementSection from "../components/StatementSection";
import ConsultationCTA from "../components/ConsultationCTA";

export default function Home() {
  return (
    <>
      <Seo page="home" />
      <Hero />
      <Introduction />
      <PresentationVideo />
      <Industries />
      <StatementSection />
      <ConsultationCTA />
    </>
  );
}
