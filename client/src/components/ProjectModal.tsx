import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useTranslation();
  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="project-modal"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary transition-colors"
          data-testid="modal-close"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        <div className="relative aspect-video">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0">
            {project.category}
          </Badge>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {project.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.longDescription}
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <i className="fas fa-code text-primary"></i>
              {t("projects.technologies")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold transition-all hover:bg-primary/90 hover:scale-[1.02]"
            data-testid="modal-demo-link"
          >
            <i className="fas fa-external-link-alt"></i>
            <span>{t("modal.visit_site")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
