import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { A as AppHeader } from "./AppHeader-DwErxbN_.js";
import { P as ProductForm, g as generateSalesPage } from "./sales-api-Cc15O9Zl.js";
import { T as TemplatePicker, S as SalesPageView } from "./SalesPageView-DKoen4Gf.js";
import { B as Button } from "./button-BmLZMIt9.js";
import { ArrowLeft, Loader2, Sparkles, Save } from "lucide-react";
import { u as useAuth, s as supabase } from "./router-bJNx2uWH.js";
import { toast } from "sonner";
import "./label-PJTQmjq7.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "@supabase/supabase-js";
const empty = {
  product_name: "",
  product_description: "",
  features: "",
  target_audience: "",
  price: "",
  unique_selling_point: ""
};
function NewPage() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(empty);
  const [template, setTemplate] = useState("modern");
  const [content, setContent] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const canGenerate = input.product_name.trim() && input.product_description.trim();
  const handleGenerate = async () => {
    if (!canGenerate) {
      toast.error("Add a product name and description first.");
      return;
    }
    setGenerating(true);
    try {
      const result = await generateSalesPage(input);
      setContent(result);
      toast.success("Sales page generated!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };
  const handleSave = async () => {
    if (!content || !user) return;
    setSaving(true);
    const {
      data,
      error
    } = await supabase.from("sales_pages").insert({
      user_id: user.id,
      product_name: input.product_name,
      product_description: input.product_description,
      features: input.features,
      target_audience: input.target_audience,
      price: input.price,
      unique_selling_point: input.unique_selling_point,
      template,
      content
    }).select("id").single();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved!");
    navigate({
      to: "/page/$id",
      params: {
        id: data.id
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-mesh opacity-40" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-4 -ml-2", children: /* @__PURE__ */ jsxs("a", { href: "/dashboard", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
          "Back"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[420px_1fr] gap-6 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 lg:sticky lg:top-24", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold mb-1", children: "Describe your product" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "The more detail, the better the page." }),
            /* @__PURE__ */ jsx(ProductForm, { value: input, onChange: setInput }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-2", children: "Template" }),
                /* @__PURE__ */ jsx(TemplatePicker, { value: template, onChange: setTemplate })
              ] }),
              /* @__PURE__ */ jsx(Button, { onClick: handleGenerate, disabled: !canGenerate || generating, className: "w-full bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand", children: generating ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Generating…"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                content ? "Regenerate all" : "Generate sales page"
              ] }) }),
              content && /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, variant: "secondary", className: "w-full", children: saving ? "Saving…" : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
                "Save page"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-2 min-h-[600px] overflow-hidden", children: content ? /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden border border-white/10", children: /* @__PURE__ */ jsx(SalesPageView, { content, template }) }) : /* @__PURE__ */ jsxs("div", { className: "h-[600px] flex flex-col items-center justify-center text-center px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "h-14 w-14 rounded-2xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Live preview" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: 'Fill out the form and hit "Generate" to see your sales page render here.' })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  NewPage as component
};
