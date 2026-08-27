import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import StructuredData from "./components/StructuredData";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import ProjectLifecycle from "./pages/ProjectLifecycle";
import LegalSupport from "./pages/LegalSupport";
import Recognition from "./pages/Recognition";
import Collaboration from "./pages/Collaboration";
import Contact from "./pages/Contact";
import AskQuestion from "./pages/AskQuestion";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-summit-gold focus:px-4 focus:py-2 focus:text-summit-black"
      >
        Skip to content
      </a>
      <StructuredData />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/expertise"
              element={
                <PageTransition>
                  <Expertise />
                </PageTransition>
              }
            />
            <Route
              path="/project-lifecycle"
              element={
                <PageTransition>
                  <ProjectLifecycle />
                </PageTransition>
              }
            />
            <Route
              path="/legal-support"
              element={
                <PageTransition>
                  <LegalSupport />
                </PageTransition>
              }
            />
            <Route
              path="/recognition"
              element={
                <PageTransition>
                  <Recognition />
                </PageTransition>
              }
            />
            <Route
              path="/collaboration"
              element={
                <PageTransition>
                  <Collaboration />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/ask-a-question"
              element={
                <PageTransition>
                  <AskQuestion />
                </PageTransition>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget />}
    </div>
  );
}
