import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Plus, LogOut } from "lucide-react";
import { u as useAuth } from "./router-bJNx2uWH.js";
import { B as Button } from "./button-BmLZMIt9.js";
function AppHeader() {
  const { user, signOut } = useAuth();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 glass border-b", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center glow-brand", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold tracking-wide text-primary-foreground", children: "RM" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-lg", children: "PageForge" })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-2", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: "/dashboard", children: [
        /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-4 w-4 mr-2" }),
        "Dashboard"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "bg-gradient-brand text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/new", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "New page"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { onClick: () => signOut(), variant: "ghost", size: "icon", title: "Sign out", children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }) })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign in" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "bg-gradient-brand text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Get started" }) })
    ] }) })
  ] }) });
}
export {
  AppHeader as A
};
