import logoDark from "@assets/880o868973_1764355143132.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code, Palette } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-[90vh] flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-start space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="gradient-text">{t("hero.title") || "فخام ديزاين"}</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-400 font-medium mb-6">
                {t("hero.subtitle")}
              </p>
              <div className="max-w-2xl mx-auto lg:mx-0 space-y-4">
                <p className="text-lg text-gray-400 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                  {t("hero.description1")} {t("hero.description2")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              <button
                onClick={() => handleScrollTo("#projects")}
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <i className="fas fa-laptop-code"></i>
                <span className="relative z-10">{t("hero.cta_projects")}</span>
              </button>

              <button
                onClick={() => handleScrollTo("#contact")}
                className="flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-full font-bold transition-all duration-300 hover:bg-white/5 border-2 border-white/20 hover:border-white/40 group"
              >
                <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                <span>{t("hero.cta_contact")}</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="relative animate-float z-10 group cursor-pointer">
              {/* Massive background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-colors duration-1000" />

              {/* Glowing circles */}
              <div className="absolute inset-x-[-20%] inset-y-[-20%] border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-x-[-40%] inset-y-[-40%] border border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

              <div className="relative p-4 transition-all duration-500">
                <img
                  src={logoDark}
                  alt="HSG Logo"
                  className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floaties */}
              <div className="absolute -top-4 -right-4 w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-400 font-bold animate-bounce [animation-duration:3s]">
                <Code className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 glass rounded-2xl flex items-center justify-center text-purple-400 font-bold animate-bounce [animation-duration:4s]">
                <Palette className="w-7 h-7" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={() => handleScrollTo("#services")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
        </motion.button>
      </div>
    </section>
  );
}
