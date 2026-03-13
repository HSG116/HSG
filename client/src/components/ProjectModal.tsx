import type { Project } from "@/data/projects";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t, i18n } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" data-testid="project-modal">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#030d1f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/60 flex flex-col z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 end-6 z-20 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-full text-white transition-colors duration-300 group"
              data-testid="modal-close"
            >
              <i className="fas fa-times text-xl group-hover:scale-110 transition-transform"></i>
            </button>

            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {/* Hero Image Section */}
              <div className="relative aspect-video md:aspect-[21/9] w-full bg-[#111] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030d1f] via-transparent to-transparent" />

                {/* Category Badge overlaying image */}
                <div className="absolute bottom-6 start-6 md:bottom-8 md:start-10 flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                    {t("projects." + project.categoryKey) || project.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-10 bg-[#030d1f] relative">
                {/* Subtle Glow Behind Text */}
                <div className="absolute top-0 end-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px]" />

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
                  {/* Left Column: Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                      {i18n.language === 'ar' ? (project.titleAr || project.title) : project.title}
                    </h3>

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light whitespace-pre-line">
                      {i18n.language === 'ar' ? (project.longDescriptionAr || project.longDescription) : project.longDescription}
                    </p>
                  </div>

                  {/* Right Column: Meta & Actions */}
                  <div className="w-full md:w-1/3 flex flex-col gap-8">
                    {/* Tech Stack */}
                    <div className="bg-[#071833] border border-white/5 rounded-2xl p-6">
                      <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2 mb-4">
                        <i className="fas fa-microchip text-indigo-400"></i>
                        {t("projects.technologies")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-mono rounded-lg transition-colors hover:bg-white/10 hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-2xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                      data-testid="modal-demo-link"
                    >
                      {/* Button Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-black/10 to-transparent translate-x-[-100%] rtl:translate-x-[100%] group-hover:translate-x-[100%] rtl:group-hover:translate-x-[-100%] transition-transform duration-700" />

                      <span>{t("modal.visit_site")}</span>
                      <i className="fas fa-arrow-right rtl:-scale-x-100 text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
