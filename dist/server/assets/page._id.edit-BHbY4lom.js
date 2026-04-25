import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { a as Route, s as supabase } from "./router-bJNx2uWH.js";
import { A as AppHeader } from "./AppHeader-DwErxbN_.js";
import { P as ProductForm, g as generateSalesPage } from "./sales-api-Cc15O9Zl.js";
import { T as TemplatePicker, S as SalesPageView } from "./SalesPageView-DKoen4Gf.js";
import { c as cn, B as Button } from "./button-BmLZMIt9.js";
import { ChevronDown, Check, ChevronUp, Loader2, ArrowLeft, RefreshCw, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import * as SelectPrimitive from "@radix-ui/react-select";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "./label-PJTQmjq7.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const SECTIONS = [{
  id: "headline",
  label: "Headline + sub-headline"
}, {
  id: "description",
  label: "Description"
}, {
  id: "benefits",
  label: "Benefits"
}, {
  id: "features",
  label: "Features"
}, {
  id: "socialProof",
  label: "Social proof"
}, {
  id: "pricing",
  label: "Pricing"
}, {
  id: "cta",
  label: "Call-to-action"
}, {
  id: "faq",
  label: "FAQ"
}];
function EditPage() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    product_name: "",
    product_description: "",
    features: "",
    target_audience: "",
    price: "",
    unique_selling_point: ""
  });
  const [template, setTemplate] = useState("modern");
  const [content, setContent] = useState(null);
  const [section, setSection] = useState("headline");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    (async () => {
      const {
        data,
        error
      } = await supabase.from("sales_pages").select("*").eq("id", id).single();
      if (error || !data) {
        toast.error("Page not found");
        navigate({
          to: "/dashboard"
        });
        return;
      }
      setInput({
        product_name: data.product_name,
        product_description: data.product_description ?? "",
        features: data.features ?? "",
        target_audience: data.target_audience ?? "",
        price: data.price ?? "",
        unique_selling_point: data.unique_selling_point ?? ""
      });
      setTemplate(data.template ?? "modern");
      setContent(data.content);
      setLoading(false);
    })();
  }, [id, navigate]);
  const handleRegenerateAll = async () => {
    setGenerating(true);
    try {
      const result = await generateSalesPage(input);
      setContent(result);
      toast.success("Regenerated!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };
  const handleRegenerateSection = async () => {
    if (!content) return;
    setGenerating(true);
    try {
      const result = await generateSalesPage(input, section);
      const merged = {
        ...content,
        [section]: result[section]
      };
      if (section === "headline") merged.subheadline = result.subheadline;
      setContent(merged);
      toast.success(`Regenerated "${SECTIONS.find((s) => s.id === section)?.label}"`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };
  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const {
      error
    } = await supabase.from("sales_pages").update({
      product_name: input.product_name,
      product_description: input.product_description,
      features: input.features,
      target_audience: input.target_audience,
      price: input.price,
      unique_selling_point: input.unique_selling_point,
      template,
      content
    }).eq("id", id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved!");
    navigate({
      to: "/page/$id",
      params: {
        id
      }
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background relative", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-mesh opacity-40" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(AppHeader, {}),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-4 -ml-2", children: /* @__PURE__ */ jsxs(Link, { to: "/page/$id", params: {
          id
        }, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
          "Back to preview"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[420px_1fr] gap-6 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold mb-1", children: "Edit page" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Update inputs and regenerate." }),
            /* @__PURE__ */ jsx(ProductForm, { value: input, onChange: setInput }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-2", children: "Template" }),
                /* @__PURE__ */ jsx(TemplatePicker, { value: template, onChange: setTemplate })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-2", children: "Regenerate one section" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs(Select, { value: section, onValueChange: setSection, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "flex-1", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: SECTIONS.map((s) => /* @__PURE__ */ jsx(SelectItem, { value: s.id, children: s.label }, s.id)) })
                  ] }),
                  /* @__PURE__ */ jsx(Button, { onClick: handleRegenerateSection, disabled: generating, variant: "secondary", size: "icon", children: generating ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Button, { onClick: handleRegenerateAll, disabled: generating, variant: "outline", className: "w-full", children: generating ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Working…"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                "Regenerate everything"
              ] }) }),
              /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, className: "w-full bg-gradient-brand text-primary-foreground hover:opacity-90", children: saving ? "Saving…" : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
                "Save changes"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden border border-white/10", children: content && /* @__PURE__ */ jsx(SalesPageView, { content, template }) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  EditPage as component
};
