import { useState, useMemo, useEffect } from "react";
import { PROJECTS, CATEGORIES } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchDbProjects = async () => {
      const { data } = await supabase.from('site_projects').select('*').order('id', { ascending: false });
      if (data) {
        const mappedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.name_en || p.name_ar,
          titleEn: p.name_en,
          category: p.category || "web",
          categoryKey: p.category || "web",
          imageUrl: p.image_url || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
          description: p.description_en || p.description_ar,
          descriptionEn: p.description_en,
          longDescription: p.description_en || p.description_ar,
          longDescriptionEn: p.description_en,
          technologies: p.technologies || ["Web"],
          demoLink: p.url || "#"
        })) as any;
        setDbProjects(mappedProjects);
      }
    };
    fetchDbProjects();
  }, []);

  const allProjects = useMemo(() => [...dbProjects, ...PROJECTS.map(p => ({ ...p }))], [dbProjects]);

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
      className="py-24 md:py-32 relative overflow-hidden"
      data-testid="projects-section"
    >
      {/* Background Ambience removed for a monolithic seamless look */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-mono mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-md"
          >
            <i className="fas fa-layer-group"></i>
            <span className="tracking-widest font-bold">PORTFOLIO_ARCHIVE</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-6 tracking-tight drop-shadow-sm flex items-center justify-center gap-4">
            {t("projects.title")}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              {t("projects.subtitle")}
            </p>
          </div>

          <button
            onClick={handleScrollToAbout}
            className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 hover:border-white/20 bg-white/5 backdrop-blur-md group"
          >
            {t("projects.skip")}
            <i className="fas fa-arrow-down transition-transform group-hover:translate-y-1"></i>
          </button>
        </motion.div>

        {/* Filter Categories - Apple-like Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <div className="flex flex-wrap justify-center p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl">
            {CATEGORIES.map((category) => {
              const isActive = activeFilter === category.key;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  className={`relative flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-sm font-bold transition-all duration-500 ${isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <i className={`${category.icon} opacity-80`}></i>
                    <span>{t(`projects.${category.key}`) || category.label}</span>
                    {isActive && (
                      <span className="px-1.5 py-0.5 rounded-full bg-white text-black text-[9px] leading-none flex items-center justify-center">
                        {getCategoryCount(category.key)}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((originalProject, index) => {
              const project = {
                ...originalProject,
                title: originalProject.titleEn || originalProject.title,
                description: originalProject.descriptionEn || originalProject.description,
                longDescription: originalProject.longDescriptionEn || originalProject.longDescription,
                category: t(`projects.${originalProject.categoryKey}`) || originalProject.category
              };
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -40 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: index * 0.05 // Stagger effect
                  }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <i className="fas fa-folder-open text-4xl text-gray-500"></i>
            </div>
            <p className="text-gray-400 text-lg font-mono">NO_PROJECTS_FOUND</p>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
