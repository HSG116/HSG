import { useState, useMemo, useEffect } from "react";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchDbProjects = async () => {
      const { data } = await supabase.from('site_projects').select('*');
      if (data) {
        const mappedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.name_ar,
          titleEn: p.name_en, // Attempt to get English name from DB
          category: p.category || "web",
          categoryKey: p.category || "web",
          imageUrl: p.image_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
          description: p.description_ar,
          descriptionEn: p.description_en, // Attempt to get English description from DB
          longDescription: p.description_ar,
          longDescriptionEn: p.description_en, // Attempt to get English description from DB
          technologies: p.technologies || ["Web"],
          demoLink: p.url || "#"
        })) as any;
        setDbProjects(mappedProjects);
      }
    };
    fetchDbProjects();
  }, []);

  const allProjects = useMemo(() => [...PROJECTS, ...dbProjects], [dbProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter((project) => project.categoryKey === activeFilter);
  }, [activeFilter, allProjects]);

  const getCategoryCount = (key: string) => {
    if (key === "all") return allProjects.length;
    return allProjects.filter((p) => p.categoryKey === key).length;
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-visible"
      data-testid="projects-section"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black/80 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 pb-2 inline-block">
              {t("projects.title")}
            </h2>
            <button
              onClick={handleScrollToAbout}
              className="text-sm text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-white/5 backdrop-blur-sm group"
              data-testid="skip-section"
            >
              {t("projects.skip")}
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            </button>
          </div>
          <div className="w-24 h-1.5 bg-gradient-to-l from-blue-600 to-purple-600 mx-auto mb-8 rounded-full" />
          <p className="text-gray-300 max-w-2xl mx-auto text-xl leading-relaxed font-light">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${activeFilter === category.key
                ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
                }`}
            >
              <i className={`${category.icon} opacity-80 text-lg`}></i>
              <span>{t(`projects.${category.key}`) || category.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeFilter === category.key ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-gray-500"
                }`}>
                {getCategoryCount(category.key)}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((originalProject) => {
              const project = {
                ...originalProject,
                title: (i18n.language === 'en' && originalProject.titleEn) ? originalProject.titleEn : originalProject.title,
                description: (i18n.language === 'en' && originalProject.descriptionEn) ? originalProject.descriptionEn : originalProject.description,
                longDescription: (i18n.language === 'en' && originalProject.longDescriptionEn) ? originalProject.longDescriptionEn : originalProject.longDescription,
                category: t(`projects.${originalProject.categoryKey}`) || originalProject.category
              };
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-full bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-folder-open text-4xl text-gray-600"></i>
            </div>
            <p className="text-gray-500 text-lg">لا توجد مشاريع في هذه الفئة حالياً</p>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Luxurious Fusion Divider */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        {/* Gradient Fade to Black/Transparent */}
        <div className="h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Decorative Line & Glow */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="hidden md:block absolute -bottom-6 w-[600px] h-[100px] bg-blue-600/20 blur-[60px] rounded-full pointer-events-none" />

          {/* Center Geometric Element */}
          <div className="absolute bottom-0 translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <div className="relative w-12 h-12 md:w-16 md:h-16 bg-black border border-blue-500/30 rotate-45 transform hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] backdrop-blur-xl flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
              <i className="fas fa-chevron-down text-blue-400 -rotate-45 animate-bounce mt-1"></i>
            </div>

            {/* Side Ornaments */}
            <div className="absolute left-[-60px] top-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="absolute right-[-60px] top-1/2 w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
