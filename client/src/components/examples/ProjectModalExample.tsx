import { useState } from "react";
import ProjectModal from "../ProjectModal";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";

export default function ProjectModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-background">
      <Button onClick={() => setIsOpen(true)}>
        فتح نافذة تفاصيل المشروع
      </Button>
      <ProjectModal
        project={PROJECTS[0]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
