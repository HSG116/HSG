
import StarsBackground from "@/components/StarsBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import i18n from "@/lib/i18n";

export default function Home() {
  return (
    <div className={`min-h-screen ${i18n.language.startsWith("ar") ? "font-cairo" : "font-outfit tracking-tight"}`} dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}>
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
