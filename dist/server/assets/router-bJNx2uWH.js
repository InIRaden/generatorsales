import { jsx, jsxs } from "react/jsx-runtime";
import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster as Toaster$1 } from "sonner";
import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function createSupabaseClient() {
  const SUPABASE_URL = "https://zlsaqsplstraxvbrazsj.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsc2Fxc3Bsc3RyYXh2YnJhenNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDA0MjEsImV4cCI6MjA5MjUxNjQyMX0.d9A5xPsZ04xjfY6nhvVkQw-GiPKQUbsffF6UejMocmY";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const Ctx = createContext({ user: null, session: null, loading: true, signOut: async () => {
} });
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
      setUser(session2?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsx(Ctx.Provider, { value: { user, session, loading, signOut }, children });
}
const useAuth = () => useContext(Ctx);
const appCss = "/assets/styles-D3Xzh5ov.css";
const queryClient = new QueryClient();
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-gradient-brand", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "mt-6 inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground", children: "Go home" })
  ] }) });
}
const Route$8 = createRootRoute({
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
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }),
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$7 = () => import("./signup-Dn48RydL.js");
const Route$7 = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create account — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-B4QNfXp8.js");
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./route-hw5euXgI.js");
const Route$5 = createFileRoute("/_authenticated")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-DaEaoEpg.js");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "PageForge — Turn products into high-converting sales pages with AI"
    }, {
      name: "description",
      content: "Describe your product. Get a polished, persuasive landing page in seconds — with multiple templates, live preview, and HTML export."
    }, {
      property: "og:title",
      content: "PageForge — AI Sales Page Generator"
    }, {
      property: "og:description",
      content: "Describe your product. Get a polished landing page in seconds."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./new-Dd5cYZXn.js");
const Route$3 = createFileRoute("/_authenticated/new")({
  head: () => ({
    meta: [{
      title: "New page — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard-CuT35eSx.js");
const Route$2 = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./page._id-ATK-oa_1.js");
const Route$1 = createFileRoute("/_authenticated/page/$id")({
  head: () => ({
    meta: [{
      title: "Preview — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./page._id.edit-BHbY4lom.js");
const Route = createFileRoute("/_authenticated/page/$id/edit")({
  head: () => ({
    meta: [{
      title: "Edit — PageForge"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$7.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const AuthenticatedRouteRoute = Route$5.update({
  id: "/_authenticated",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AuthenticatedNewRoute = Route$3.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedPageIdRoute = Route$1.update({
  id: "/page/$id",
  path: "/page/$id",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedPageIdEditRoute = Route.update({
  id: "/edit",
  path: "/edit",
  getParentRoute: () => AuthenticatedPageIdRoute
});
const AuthenticatedPageIdRouteChildren = {
  AuthenticatedPageIdEditRoute
};
const AuthenticatedPageIdRouteWithChildren = AuthenticatedPageIdRoute._addFileChildren(AuthenticatedPageIdRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute,
  AuthenticatedNewRoute,
  AuthenticatedPageIdRoute: AuthenticatedPageIdRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  LoginRoute,
  SignupRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r,
  supabase as s,
  useAuth as u
};
