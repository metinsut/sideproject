/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/auth/functions/getUser";
import androidIcon from "/android-icon-192x192.png?url";
import appleIcon57x57 from "/apple-icon-57x57.png?url";
import appleIcon60x60 from "/apple-icon-60x60.png?url";
import appleIcon72x72 from "/apple-icon-72x72.png?url";
import appleIcon76x76 from "/apple-icon-76x76.png?url";
import appleIcon114x114 from "/apple-icon-114x114.png?url";
import appleIcon120x120 from "/apple-icon-120x120.png?url";
import appleIcon144x144 from "/apple-icon-144x144.png?url";
import appleIcon152x152 from "/apple-icon-152x152.png?url";
import appleIcon180x180 from "/apple-icon-180x180.png?url";
import favicon16x16 from "/favicon-16x16.png?url";
import favicon32x32 from "/favicon-32x32.png?url";
import favicon96x96 from "/favicon-96x96.png?url";
import manifest from "/manifest.json?url";
import msIcon70x70 from "/ms-icon-70x70.png?url";
import msIcon144x144 from "/ms-icon-144x144.png?url";
import msIcon150x150 from "/ms-icon-150x150.png?url";
import msIcon310x310 from "/ms-icon-310x310.png?url";
import appCss from "../styles/index.css?url";

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
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", sizes: "57x57", href: appleIcon57x57 },
      { rel: "apple-touch-icon", sizes: "60x60", href: appleIcon60x60 },
      { rel: "apple-touch-icon", sizes: "72x72", href: appleIcon72x72 },
      { rel: "apple-touch-icon", sizes: "76x76", href: appleIcon76x76 },
      { rel: "apple-touch-icon", sizes: "114x114", href: appleIcon114x114 },
      { rel: "apple-touch-icon", sizes: "120x120", href: appleIcon120x120 },
      { rel: "apple-touch-icon", sizes: "144x144", href: appleIcon144x144 },
      { rel: "apple-touch-icon", sizes: "152x152", href: appleIcon152x152 },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleIcon180x180 },
      { rel: "icon", type: "image/png", sizes: "192x192", href: androidIcon },
      { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32x32 },
      { rel: "icon", type: "image/png", sizes: "96x96", href: favicon96x96 },
      { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16x16 },
      { rel: "icon", type: "image/png", sizes: "70x70", href: msIcon70x70 },
      { rel: "icon", type: "image/png", sizes: "144x144", href: msIcon144x144 },
      { rel: "icon", type: "image/png", sizes: "150x150", href: msIcon150x150 },
      { rel: "icon", type: "image/png", sizes: "310x310", href: msIcon310x310 },
      { rel: "manifest", href: manifest },
    ],
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
