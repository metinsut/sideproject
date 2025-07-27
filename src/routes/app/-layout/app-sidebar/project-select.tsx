import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProjects } from "@/queries/projects";

export function ProjectSelect() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const { data: projects } = useSuspenseQuery(useGetProjects());

  return (
    <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
