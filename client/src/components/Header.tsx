import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/data/services";
import logoLight from "@assets/9709798_1764355143195.png";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setIsLangSwitching(true);

    // Wait for the exit animation to start covering the screen
    setTimeout(() => {
      const newLang = i18n.language === "ar" ? "en" : "ar";
      i18n.changeLanguage(newLang);
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;

      // Allow animation to complete before removing overlay
      setTimeout(() => {
        setIsLangSwitching(false);
      }, 800);
    }, 600);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
          }`}
        data-testid="header"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={toggleLanguage}
              className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 text-white rounded-full font-semibold text-sm transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 relative overflow-hidden"
              data-testid="language-toggle"
              title={i18n.language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <i className={`fas ${i18n.language === "ar" ? "fa-globe" : "fa-language"} relative z-10`}></i>
              <span className="relative z-10">{i18n.language === "ar" ? "English" : "العربية"}</span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.href.slice(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                    }`}
                  data-testid={`nav-link-${link.href.slice(1)}`}
                >
                  <i className={link.icon}></i>
                  <span>{t(`nav.${link.key || link.href.slice(1)}`)}</span>
                </button>
              ))}
            </nav>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Luxurious Side Drawer Menu */}
      <div
        className={`fixed top-0 ${i18n.language === "ar" ? "right-0" : "left-0"} h-full w-80 max-w-[85vw] z-50 md:hidden transition-transform duration-500 ease-out ${isMobileMenuOpen
          ? "translate-x-0"
          : i18n.language === "ar" ? "translate-x-full" : "-translate-x-full"
          }`}
        data-testid="mobile-menu"
      >
        {/* Gradient Background with Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 backdrop-blur-2xl border-l border-white/10">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 -left-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 -right-20 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col">
          {/* Header Section with Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <i className="fas fa-bars text-white text-lg"></i>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{t("nav.menu")}</h3>
                <p className="text-gray-400 text-xs">Menu</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group"
            >
              <i className="fas fa-times text-gray-400 group-hover:text-white transition-colors"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            {NAV_LINKS.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`group relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-medium transition-all duration-300 overflow-hidden ${activeSection === link.href.slice(1)
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "text-gray-300 hover:text-white hover:bg-white/5 hover:scale-105"
                  }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMobileMenuOpen ? "slideInRight 0.5s ease-out forwards" : "none"
                }}
                data-testid={`mobile-nav-link-${link.href.slice(1)}`}
              >
                {/* Animated Background Gradient */}
                {activeSection !== link.href.slice(1) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}

                {/* Icon Container */}
                <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeSection === link.href.slice(1)
                  ? "bg-white/20 shadow-inner"
                  : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                  <i className={`${link.icon} text-lg relative z-10`}></i>
                  {activeSection === link.href.slice(1) && (
                    <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping"></div>
                  )}
                </div>

                {/* Text */}
                <span className="relative z-10 flex-1 text-start">{t(`nav.${link.key || link.href.slice(1)}`)}</span>

                {/* Arrow Indicator */}
                <i className={`fas fa-chevron-${i18n.language === "ar" ? "left" : "right"} text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeSection === link.href.slice(1) ? "opacity-100" : ""
                  }`}></i>

                {/* Active Indicator */}
                {activeSection === link.href.slice(1) && (
                  <div className={`absolute ${i18n.language === "ar" ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg shadow-white/50`}></div>
                )}
              </button>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <p className="text-white text-sm font-semibold">HSG Portfolio</p>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                {t("nav.sidebar_footer")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(${i18n.language === "ar" ? "20px" : "-20px"});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Language Switching Overlay */}
      <AnimatePresence>
        {isLangSwitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-3xl"
          >
            <div className="relative flex flex-col items-center">
              {/* Background Particles/Orbs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-[120px] animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
