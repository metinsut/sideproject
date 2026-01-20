import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/db";

export const Route = createFileRoute("/api/project/")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const projectList = await db()?.query.projects.findMany();

          return new Response(JSON.stringify(projectList), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
