import type { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      className="group relative h-[320px] md:h-[420px] bg-[#030b1a]/80 backdrop-blur-sm rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer isolate ring-1 ring-white/10 hover:ring-blue-500/40 transition-all duration-500 shadow-xl"
      onClick={onClick}
      data-testid={`project-card-${project.id}`}
    >
      {/* Background Image with Zoom on Hover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a] via-[#030b1a]/70 to-transparent opacity-95" />
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />

      {/* Category Pill - Top Left */}
      <div className="absolute top-3 start-3 md:top-5 md:start-5 z-20">
        <div className="px-2.5 md:px-4 py-1 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] md:text-xs font-bold text-white shadow-lg tracking-wider uppercase">
          {t("projects." + project.categoryKey) || project.category}
        </div>
      </div>

      {/* Info Content — Always Visible */}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 flex flex-col justify-end z-20 h-auto min-h-[45%] bg-gradient-to-t from-[#030b1a] via-[#030b1a]/95 to-transparent">
        <div>
          {/* Title */}
          <h3 className="text-[15px] md:text-2xl font-bold tracking-tight text-white mb-2 line-clamp-none drop-shadow-md leading-tight">
            {i18n.language === 'ar' ? (project.titleAr || project.title) : project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-[10px] md:text-sm mb-2 md:mb-4 line-clamp-1 md:line-clamp-2 leading-relaxed">
            {i18n.language === 'ar' ? (project.descriptionAr || project.description) : project.description}
          </p>

          {/* Tech Tags — Desktop Only */}
          <div className="hidden md:flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-white/10 backdrop-blur-[2px] border border-white/5 text-gray-300 text-[10px] font-mono tracking-widest uppercase rounded flex items-center shadow-inner"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-400 me-2 animate-pulse" />
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-white/5 text-gray-500 text-[10px] font-mono rounded">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 md:py-2.5 bg-white text-black rounded-lg md:rounded-xl text-[9px] md:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
              data-testid={`project-demo-${project.id}`}
            >
              <span>{t("projects.visit")}</span>
              <i className="fas fa-arrow-right rtl:-scale-x-100 text-[7px] md:text-[10px]"></i>
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 md:py-2.5 bg-white/10 text-white hover:bg-white/20 rounded-lg md:rounded-xl text-[9px] md:text-sm font-bold border border-white/10 backdrop-blur-md transition-all hover:border-white/30"
              data-testid={`project-details-${project.id}`}
            >
              <i className="fas fa-expand-alt text-[7px] md:text-xs"></i>
              <span>{t("projects.details")}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
