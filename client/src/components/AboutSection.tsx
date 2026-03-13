import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();


  return (
    <section
      id="about"
      className="py-24 md:py-36 relative overflow-visible"
      data-testid="about-section"
    >
      <div className="absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-full max-w-[800px] h-[150px] bg-blue-900/10 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-6 py-4 leading-[1.2] inline-block opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            {t("about.title")} HSG Studio
          </h2>
          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
            <div className="h-[1px] w-full bg-gradient-to-r rtl:bg-gradient-to-l from-transparent to-blue-500/50"></div>
            <div className="w-2 h-2 rotate-45 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <div className="h-[1px] w-full bg-gradient-to-l rtl:bg-gradient-to-r from-transparent to-blue-500/50"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-10 shadow-xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              <span className="bg-gradient-to-l rtl:bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                HSG Studio
              </span>
            </h3>

            <p className="text-foreground/90 text-lg leading-relaxed mb-8 text-center">
              {t("about.intro")}
            </p>

            <div className="bg-gradient-to-l rtl:bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 rounded-xl p-6 mb-8">
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

            <div className="space-y-6">
              <div>
                <h4 className="text-primary font-bold mb-4 text-lg text-center">{t("about.technologies_title")}</h4>
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
    </section>
  );
}
