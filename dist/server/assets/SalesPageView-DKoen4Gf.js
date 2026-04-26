import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn } from "./button-BmLZMIt9.js";
import { Sparkles, ArrowRight, Check, Star } from "lucide-react";
const TEMPLATES = [
  { id: "modern", name: "Modern", gradient: "from-violet-500 to-blue-500" },
  { id: "bold", name: "Bold", gradient: "from-orange-400 to-rose-500" },
  { id: "minimal", name: "Minimal", gradient: "from-neutral-300 to-neutral-500" },
  { id: "elegant", name: "Elegant", gradient: "from-amber-300 to-amber-600" }
];
function TemplatePicker({ value, onChange }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: TEMPLATES.map((t) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => onChange(t.id),
      className: cn(
        "rounded-xl p-3 border text-left transition ease-smooth",
        value === t.id ? "border-primary bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: cn("h-12 rounded-lg bg-gradient-to-br mb-2", t.gradient) }),
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium", children: t.name })
      ]
    },
    t.id
  )) });
}
const templateClasses = {
  modern: {
    wrap: "bg-[#0b0b13] text-white",
    hero: "bg-gradient-to-br from-violet-600/30 via-blue-600/20 to-transparent",
    card: "bg-white/5 backdrop-blur-xl border border-white/10",
    cta: "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.6)]",
    accent: "text-violet-300",
    heading: "font-bold tracking-tight"
  },
  bold: {
    wrap: "bg-[#fff8ee] text-[#1a1a1a]",
    hero: "bg-gradient-to-br from-orange-400/30 via-rose-400/20 to-transparent",
    card: "bg-white border-2 border-black shadow-[6px_6px_0_0_#000]",
    cta: "bg-black text-white border-2 border-black shadow-[6px_6px_0_0_#ff6b35]",
    accent: "text-rose-600",
    heading: "font-extrabold tracking-tight"
  },
  minimal: {
    wrap: "bg-white text-neutral-900",
    hero: "bg-gradient-to-b from-neutral-50 to-white",
    card: "bg-neutral-50 border border-neutral-200",
    cta: "bg-neutral-900 text-white",
    accent: "text-neutral-500",
    heading: "font-semibold tracking-tight"
  },
  elegant: {
    wrap: "bg-[#0f1115] text-[#e7e5e4]",
    hero: "bg-gradient-to-br from-amber-500/15 via-amber-300/5 to-transparent",
    card: "bg-[#1a1d23] border border-amber-500/20",
    cta: "bg-amber-400 text-[#0f1115]",
    accent: "text-amber-300",
    heading: "font-serif"
  }
};
function SalesPageView({ content, template = "modern" }) {
  const t = templateClasses[template];
  return /* @__PURE__ */ jsxs("div", { className: `${t.wrap} min-h-full w-full`, children: [
    /* @__PURE__ */ jsx("section", { className: `${t.hero} px-6 py-20 md:py-28 text-center`, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium ${t.card}`, children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        " Limited launch offer"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: `mt-6 text-4xl md:text-6xl ${t.heading}`, children: content.headline }),
      /* @__PURE__ */ jsx("p", { className: `mt-6 text-lg md:text-xl ${t.accent}`, children: content.subheadline }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxs("button", { className: `${t.cta} inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold`, children: [
          content.cta.primary,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: `${t.card} rounded-full px-7 py-3.5 text-sm font-semibold`, children: content.cta.secondary })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-4 text-center text-base md:text-lg leading-relaxed opacity-90", children: content.description.split(/\n\n+/).map((p, i) => /* @__PURE__ */ jsx("p", { children: p }, i)) }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: `text-3xl md:text-4xl text-center mb-12 ${t.heading}`, children: "Why you'll love it" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: content.benefits.map((b, i) => /* @__PURE__ */ jsxs("div", { className: `${t.card} rounded-2xl p-6`, children: [
        /* @__PURE__ */ jsx("div", { className: `mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${t.cta}`, children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: `text-lg mb-2 ${t.heading}`, children: b.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80 leading-relaxed", children: b.description })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: `text-3xl md:text-4xl text-center mb-12 ${t.heading}`, children: "Everything you get" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: content.features.map((f, i) => /* @__PURE__ */ jsxs("div", { className: `${t.card} rounded-xl p-5 flex gap-4`, children: [
        /* @__PURE__ */ jsx("div", { className: `shrink-0 h-9 w-9 rounded-lg flex items-center justify-center ${t.cta}`, children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: `text-base mb-1 ${t.heading}`, children: f.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: f.description })
        ] })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: `text-3xl md:text-4xl text-center mb-12 ${t.heading}`, children: "Loved by people like you" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: content.socialProof.map((s, i) => /* @__PURE__ */ jsxs("div", { className: `${t.card} rounded-2xl p-6`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex gap-0.5 mb-4 ${t.accent}`, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, j)) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed opacity-90", children: [
          '"',
          s.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-current/10", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: s.author }),
          /* @__PURE__ */ jsx("div", { className: `text-xs ${t.accent}`, children: s.role })
        ] })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-md", children: /* @__PURE__ */ jsxs("div", { className: `${t.card} rounded-3xl p-8 text-center`, children: [
      /* @__PURE__ */ jsx("h3", { className: `text-xl ${t.heading}`, children: content.pricing.title }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 mb-2", children: /* @__PURE__ */ jsx("span", { className: `text-5xl ${t.heading}`, children: content.pricing.price }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm opacity-75 mb-6", children: content.pricing.description }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-left mb-8", children: content.pricing.features.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm", children: [
        /* @__PURE__ */ jsx(Check, { className: `h-5 w-5 shrink-0 ${t.accent}` }),
        /* @__PURE__ */ jsx("span", { children: f })
      ] }, i)) }),
      /* @__PURE__ */ jsx("button", { className: `${t.cta} w-full rounded-full px-7 py-3.5 text-sm font-semibold`, children: content.cta.primary })
    ] }) }) }),
    content.faq && content.faq.length > 0 && /* @__PURE__ */ jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsx("h2", { className: `text-3xl md:text-4xl text-center mb-12 ${t.heading}`, children: "Questions, answered" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: content.faq.map((q, i) => /* @__PURE__ */ jsxs("div", { className: `${t.card} rounded-xl p-5`, children: [
        /* @__PURE__ */ jsx("h3", { className: `mb-2 ${t.heading}`, children: q.question }),
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80", children: q.answer })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 py-20 text-center", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsx("h2", { className: `text-3xl md:text-5xl mb-6 ${t.heading}`, children: "Ready to get started?" }),
      /* @__PURE__ */ jsx("p", { className: "opacity-80 mb-8", children: "Join hundreds of others who already made the leap." }),
      /* @__PURE__ */ jsxs("button", { className: `${t.cta} inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-semibold`, children: [
        content.cta.primary,
        " ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
      ] })
    ] }) })
  ] });
}
export {
  SalesPageView as S,
  TemplatePicker as T,
  TEMPLATES as a
};
