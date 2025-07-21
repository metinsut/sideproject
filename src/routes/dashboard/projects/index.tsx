import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FTable } from "@/components/f/f-table";
import { getData } from "@/db-queries/projects";
import { useColumns } from "./-columns";
import { Toolbar } from "./-toolbar";

export const Route = createFileRoute("/dashboard/projects/")({
  component: RouteComponent,
  loader: async () => {
    return {
      projects: await getData(),
    };
  },
});

function RouteComponent() {
  const { projects } = Route.useLoaderData();
  const columns = useColumns<(typeof projects)[number]>();

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <Toolbar />
      <FTable table={table} />
    </div>
  );
}
