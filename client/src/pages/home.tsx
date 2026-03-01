import { useEffect } from "react";
import { useLocation } from "wouter";
import StarsBackground from "@/components/StarsBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // If the location is not just '/', try to scroll to an element with that ID
    if (location !== "/") {
      const sectionId = location.substring(1); // remove leading slash
      const element = document.getElementById(sectionId);
      if (element) {
        // Wait a small bit for components to mount fully
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Scroll to top if exactly at root
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div
      className="min-h-screen font-outfit tracking-tight"
      dir="ltr"
    >
      <StarsBackground />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
