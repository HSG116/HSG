import { useTranslation } from "react-i18next";
import SectionDivider from "@/components/SectionDivider";
import StarsBackground from "@/components/StarsBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith("ar");

  return (
    <div
      className={`min-h-screen ${isAr ? "font-cairo" : "font-outfit tracking-tight"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <StarsBackground />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <SectionDivider />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
