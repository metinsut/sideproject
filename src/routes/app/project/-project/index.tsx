import { useLoaderData } from "@tanstack/react-router";
import { ProjectCard } from "./project-card";

export function Project() {
  const { projects } = useLoaderData({ from: "/app/project/" });

  return (
    <div className="grid gap-4">
      <p className="text-2xl font-bold">Projects</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {projects?.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
