import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/functions/projects/get-projects";

export const Route = createFileRoute("/dashboard/project/")({
  component: RouteComponent,
  loader: async () => {
    const projects = await getProjects();
    return { projects, crumb: "All Projects" };
  },
});
function RouteComponent() {
  const { projects } = useLoaderData({ from: "/dashboard/project/" });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {projects.map((project) => (
        <Link
          to={`/dashboard/project/$projectId`}
          params={{ projectId: project.id.toString() }}
          key={project.id}
        >
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-100">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Waiting Tasks: 0</p>
              <p>In Progress Tasks: 0</p>
              <p>Completed Tasks: 0</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
