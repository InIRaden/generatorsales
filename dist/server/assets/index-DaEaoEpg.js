import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Wand2, LayoutTemplate, Download, Check } from "lucide-react";
import { A as AppHeader } from "./AppHeader-DwErxbN_.js";
import { B as Button } from "./button-BmLZMIt9.js";
import { u as useAuth } from "./router-bJNx2uWH.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
import "@supabase/supabase-js";
function Landing() {
  const {
    user
  } = useAuth();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-mesh opacity-60" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 pt-20 pb-24 text-center", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
          "Powered by Raden Mahesa"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight", children: [
          "Turn any product into a",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-brand", children: "high-converting sales page" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-2xl mx-auto", children: "Describe what you sell. PageForge writes the headline, benefits, social proof and CTA — and renders it as a real landing page you can preview and export." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand", children: /* @__PURE__ */ jsxs(Link, { to: user ? "/new" : "/signup", children: [
            "Generate my page ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-white/15", children: /* @__PURE__ */ jsx(Link, { to: user ? "/dashboard" : "/login", children: "I have an account" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 pb-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl grid gap-6 md:grid-cols-3", children: [{
        icon: Wand2,
        title: "Persuasive copywriting",
        desc: "Headlines, benefits, FAQ — written like a senior direct-response copywriter."
      }, {
        icon: LayoutTemplate,
        title: "4 stunning templates",
        desc: "Modern, Bold, Minimal, Elegant — switch instantly without re-generating."
      }, {
        icon: Download,
        title: "Export to HTML",
        desc: "Download a self-contained .html file. Host it anywhere, no build step."
      }].map((f, i) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 ease-smooth transition hover:bg-white/[0.06]", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(f.icon, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
      ] }, i)) }) }),
      /* @__PURE__ */ jsx("section", { className: "px-4 sm:px-6 pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl glass rounded-3xl p-8 md:p-12 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-3", children: "From idea to live page in 60 seconds" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Three steps. No design skills required." }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3 text-left", children: ["Describe your product", "AI writes & designs", "Preview, edit & export"].map((s, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/5 border border-white/10 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-primary mb-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
            " Step ",
            i + 1
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: s })
        ] }, i)) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "mt-8 bg-gradient-brand text-primary-foreground hover:opacity-90", children: /* @__PURE__ */ jsxs(Link, { to: user ? "/new" : "/signup", children: [
          "Start generating ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("footer", { className: "border-t border-white/10 py-8 text-center text-xs text-muted-foreground", children: "Built with Raden Mahesa" })
    ] })
  ] });
}
export {
  Landing as component
};
