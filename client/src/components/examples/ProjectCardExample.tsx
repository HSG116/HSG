import ProjectCard from "../ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function ProjectCardExample() {
  return (
    <div className="p-4 bg-background max-w-sm">
      <ProjectCard 
        project={PROJECTS[0]} 
        onClick={() => console.log("Project clicked:", PROJECTS[0].title)} 
      />
    </div>
  );
}
