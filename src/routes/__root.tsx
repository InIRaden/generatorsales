import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import appCss from "../styles.css?url";

const queryClient = new QueryClient();

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <a href="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground">Go home</a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PageForge — AI Sales Page Generator" },
      { name: "description", content: "Turn any product into a high-converting sales page in seconds with AI." },
      { property: "og:title", content: "PageForge — AI Sales Page Generator" },
      { name: "twitter:title", content: "PageForge — AI Sales Page Generator" },
      { property: "og:description", content: "Turn any product into a high-converting sales page in seconds with AI." },
      { name: "twitter:description", content: "Turn any product into a high-converting sales page in seconds with AI." },
      { property: "og:image", content: "https://ui-avatars.com/api/?name=Raden+Mahesa&background=111827&color=ffffff&size=1200&rounded=true&bold=true&format=png" },
      { name: "twitter:image", content: "https://ui-avatars.com/api/?name=Raden+Mahesa&background=111827&color=ffffff&size=1200&rounded=true&bold=true&format=png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  ),
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}
