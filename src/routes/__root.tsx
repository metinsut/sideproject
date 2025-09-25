/// <reference types="vite/client" />

import "@/lib/i18n";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/functions/auth/getUser";
import { Links } from "@/lib/root/link";
import { getThemeServerFn } from "@/lib/theme/theme-server";
import type { ThemeTypes } from "@/lib/theme/types";

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
  loader: async () => {
    const theme = await getThemeServerFn();
    return { theme, crumb: null };
  },
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: (error) => <div>{error.error.message}</div>,
});

function RootComponent() {
  const { theme } = Route.useLoaderData();
  return (
    <RootDocument theme={theme}>
      <Outlet />
    </RootDocument>
  );
}

type RootDocumentProps = {
  children: ReactNode;
  theme: ThemeTypes;
};

function RootDocument(props: Readonly<RootDocumentProps>) {
  const { children, theme } = props;
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
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
