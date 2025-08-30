/// <reference types="vite/client" />

import "@/lib/i18n";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/auth/functions/getUser";
import { Links } from "@/lib/root/link";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: Awaited<ReturnType<typeof getUser>>;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
      staleTime: Infinity,
    });
    return { user };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Side Project",
      },
    ],
    links: Links,
  }),
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: (error) => <div>{error.error.message}</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

type RootDocumentProps = {
  children: ReactNode;
};

function RootDocument({ children }: Readonly<RootDocumentProps>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
