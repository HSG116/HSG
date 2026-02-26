import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/data/services";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { t } = useTranslation();

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

  const mobileToggle = (
    <button
      className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-foreground"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      data-testid="mobile-menu-toggle"
    >
      <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
          }`}
        data-testid="header"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            {/* Mobile Menu Toggle - Left */}
            <div className="md:hidden">
              {mobileToggle}
            </div>

            {/* Let's Talk Button - Left (Above Text) */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick("#contact")}
                className="group relative flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Pulse dot */}
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>

                <span className="relative z-10 text-white font-semibold text-sm tracking-wide uppercase">Let's Talk</span>

                <i className="fas fa-arrow-right text-blue-400 text-xs transition-transform duration-300 group-hover:translate-x-1 relative z-10"></i>
              </button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Navigation Links - Right (Above Logo) */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.href.slice(1)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "text-foreground/80 hover:text-foreground hover:bg-secondary hover:scale-105"
                    }`}
                >
                  <i className={link.icon}></i>
                  <span>{t(`nav.${link.key || link.href.slice(1)}`)}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Side Drawer — slides from left for English */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 md:hidden transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        data-testid="mobile-menu"
      >
        {/* Gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950 backdrop-blur-2xl border-r border-white/10">
          <div className="absolute top-20 -left-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 -right-20 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative h-full flex flex-col">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <i className="fas fa-bars text-white text-lg"></i>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">{t("nav.menu")}</h3>
                <p className="text-gray-400 text-xs">Navigation</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group"
            >
              <i className="fas fa-times text-gray-400 group-hover:text-white transition-colors"></i>
            </button>
          </div>

          {/* Nav links */}
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
                  animation: isMobileMenuOpen ? "slideInDrawer 0.5s ease-out forwards" : "none",
                }}
                data-testid={`mobile-nav-link-${link.href.slice(1)}`}
              >
                {activeSection !== link.href.slice(1) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}

                <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${activeSection === link.href.slice(1) ? "bg-white/20 shadow-inner" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                  <i className={`${link.icon} text-lg relative z-10`}></i>
                  {activeSection === link.href.slice(1) && (
                    <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping" />
                  )}
                </div>

                <span className="relative z-10 flex-1 text-left">{t(`nav.${link.key || link.href.slice(1)}`)}</span>

                <i className={`fas fa-chevron-right text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ${activeSection === link.href.slice(1) ? "opacity-100" : ""
                  }`}></i>

                {activeSection === link.href.slice(1) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg shadow-white/50" />
                )}
              </button>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <p className="text-white text-sm font-semibold">HSG Studio</p>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{t("nav.sidebar_footer")}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInDrawer {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
