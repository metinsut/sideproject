import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProjects } from "@/queries/projects";

export const Route = createFileRoute("/app/project/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(useGetProjects());
    return { projects, crumb: "All Projects" };
  },
  head: () => ({
    meta: [{ title: "Projects" }],
  }),
});
function RouteComponent() {
  const { data: projects } = useSuspenseQuery(useGetProjects());

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {projects.map((project) => (
        <Link
          to={`/app/project/$projectId`}
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
