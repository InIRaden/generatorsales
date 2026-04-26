import { jsx, jsxs } from "react/jsx-runtime";
import { L as Label, I as Input } from "./label-PJTQmjq7.js";
import * as React from "react";
import { c as cn } from "./button-BmLZMIt9.js";
import { s as supabase } from "./router-bJNx2uWH.js";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function ProductForm({ value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "product_name", children: "Product / service name *" }),
      /* @__PURE__ */ jsx(Input, { id: "product_name", required: true, value: value.product_name, onChange: (e) => set("product_name", e.target.value), placeholder: "e.g. NoteFlow Pro" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "product_description", children: "Description *" }),
      /* @__PURE__ */ jsx(Textarea, { id: "product_description", required: true, rows: 3, value: value.product_description, onChange: (e) => set("product_description", e.target.value), placeholder: "What is it and what problem does it solve?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "features", children: "Key features" }),
      /* @__PURE__ */ jsx(Textarea, { id: "features", rows: 3, value: value.features, onChange: (e) => set("features", e.target.value), placeholder: "One per line, or comma-separated" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "target_audience", children: "Target audience" }),
        /* @__PURE__ */ jsx(Input, { id: "target_audience", value: value.target_audience, onChange: (e) => set("target_audience", e.target.value), placeholder: "e.g. Indie designers" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "price", children: "Price" }),
        /* @__PURE__ */ jsx(Input, { id: "price", value: value.price, onChange: (e) => set("price", e.target.value), placeholder: "e.g. $29/mo" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "usp", children: "Unique selling point" }),
      /* @__PURE__ */ jsx(Textarea, { id: "usp", rows: 2, value: value.unique_selling_point, onChange: (e) => set("unique_selling_point", e.target.value), placeholder: "What makes you different?" })
    ] })
  ] });
}
async function generateSalesPage(input, section) {
  const { data, error } = await supabase.functions.invoke("generate-sales-page", {
    body: { input, section }
  });
  if (error) {
    const ctx = error.context;
    if (ctx?.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
    if (ctx?.status === 402) throw new Error("AI credits exhausted. Add funds in Settings → Workspace → Usage.");
    throw new Error(error.message || "Failed to generate sales page");
  }
  if (data?.error) throw new Error(data.error);
  return data.content;
}
export {
  ProductForm as P,
  generateSalesPage as g
};
