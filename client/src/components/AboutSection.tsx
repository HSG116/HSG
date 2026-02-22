import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t, i18n } = useTranslation();

  const cvLinks = {
    ar: "/CV-ar.pdf",
    en: "/CV-en.pdf",
  };

  const cvUrl = i18n.language.startsWith("ar") ? cvLinks.ar : cvLinks.en;

  return (
    <section
      id="about"
      className="py-24 md:py-36 relative overflow-visible"
      data-testid="about-section"
    >
      {/* Top Blend from Previous Section */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[150px] bg-blue-900/10 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-white to-blue-100 mb-6 pb-2 inline-block opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            HSG {t("about.title")}
          </h2>
          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-blue-500/50"></div>
            <div className="w-2 h-2 rotate-45 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-blue-500/50"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-10 shadow-xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              <span className="bg-gradient-to-l from-blue-500 to-blue-700 bg-clip-text text-transparent">
                HSG
              </span>
            </h3>

            <p className="text-foreground/90 text-lg leading-relaxed mb-8 text-center">
              {t("about.intro")}
            </p>

            <div className="bg-gradient-to-l from-primary/10 to-accent/5 border border-primary/20 rounded-xl p-6 mb-8">
              <h4 className="text-primary font-bold mb-4 text-center">{t("about.quick_experiences")}</h4>
              <ul className="space-y-3 text-foreground/90 text-lg">
                <li className="flex items-start gap-3 text-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{t("about.exp1")}</span>
                </li>
                <li className="flex items-start gap-3 text-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{t("about.exp2")}</span>
                </li>
                <li className="flex items-start gap-3 text-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{t("about.exp3")}</span>
                </li>
                <li className="flex items-start gap-3 text-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{t("about.exp4")}</span>
                </li>
                <li className="flex items-start gap-3 text-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{t("about.exp5")}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
              <a
                href={cvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                data-testid="download-cv-current"
              >
                <i className="fas fa-external-link-alt"></i>
                <span>{t("about.download_cv")}</span>
              </a>
              <p className="text-sm text-muted-foreground text-center">
                {i18n.language.startsWith("ar")
                  ? "متوفر أيضاً نسخة باللغة الإنجليزية - تحويل اللغة أعلى الصفحة"
                  : "Also available in Arabic - Change language at the top of the page"}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-primary font-bold mb-4 text-lg">{t("about.technologies_title")}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "HTML", icon: "fab fa-html5" },
                    { name: "CSS", icon: "fab fa-css3" },
                    { name: "JavaScript", icon: "fab fa-js" },
                    { name: "React.js", icon: "fab fa-react" },
                    { name: "Node.js", icon: "fab fa-node" },
                    { name: "MongoDB", icon: "fas fa-database" },
                    { name: "Git", icon: "fab fa-git" },
                    { name: "GitHub", icon: "fab fa-github" },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-500/30 rounded-xl hover:border-blue-500/60 transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
                    >
                      <i className={`${tech.icon} text-xl text-blue-500 mb-2 group-hover:text-blue-400 transition-colors`}></i>
                      <span className="text-sm font-semibold text-foreground text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxurious Particle Divider to Contact */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[1px]">
        <div className="relative w-full h-[120px]">
          {/* Gradient Fade */}
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent to-background/90" />

          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className="fill-background/80" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
          {/* Glowing Line */}
          <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-[2px]"></div>
        </div>
      </div>
    </section>
  );
}
