import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { u as useAuth, s as supabase } from "./router-bJNx2uWH.js";
import { A as AppHeader } from "./AppHeader-DwErxbN_.js";
import { c as cn, b as buttonVariants, B as Button } from "./button-BmLZMIt9.js";
import { Plus, Sparkles, FileText, Eye, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
function Dashboard() {
  const {
    user
  } = useAuth();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from("sales_pages").select("id, product_name, template, created_at, updated_at").order("updated_at", {
      ascending: false
    });
    if (error) toast.error(error.message);
    else setPages(data ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const handleDelete = async (id) => {
    const {
      error
    } = await supabase.from("sales_pages").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Page deleted");
    setPages((p) => p.filter((x) => x.id !== id));
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-mesh opacity-50" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Your sales pages" }),
            /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
              "Welcome back, ",
              user?.user_metadata?.display_name ?? user?.email,
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand", children: /* @__PURE__ */ jsxs(Link, { to: "/new", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "New sales page"
          ] }) })
        ] }),
        loading ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: Array.from({
          length: 3
        }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-6 h-40 animate-pulse" }, i)) }) : pages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 glow-brand", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-2", children: "No sales pages yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "Generate your first one in under a minute." }),
          /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-brand text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: "/new", children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Create first page"
          ] }) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: pages.map((p) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 ease-smooth transition hover:bg-white/[0.06] group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground bg-white/5 border border-white/10 rounded-full px-2 py-0.5", children: p.template })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg truncate", children: p.product_name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Updated ",
            new Date(p.updated_at).toLocaleDateString()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", variant: "secondary", className: "flex-1", children: /* @__PURE__ */ jsxs(Link, { to: "/page/$id", params: {
              id: p.id
            }, children: [
              /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5 mr-1.5" }),
              "View"
            ] }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", variant: "ghost", children: /* @__PURE__ */ jsx(Link, { to: "/page/$id/edit", params: {
              id: p.id
            }, children: /* @__PURE__ */ jsx(Edit3, { className: "h-3.5 w-3.5" }) }) }),
            /* @__PURE__ */ jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
              /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete this page?" }),
                  /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                    '"',
                    p.product_name,
                    `" will be permanently removed. This can't be undone.`
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
                  /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => handleDelete(p.id), className: "bg-destructive text-destructive-foreground", children: "Delete" })
                ] })
              ] })
            ] })
          ] })
        ] }, p.id)) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
