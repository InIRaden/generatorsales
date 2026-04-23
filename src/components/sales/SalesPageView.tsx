import type { SalesPageContent, Template } from "@/lib/types";
import { Check, Star, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  content: SalesPageContent;
  template?: Template;
}

const templateClasses: Record<Template, { wrap: string; hero: string; card: string; cta: string; accent: string; heading: string }> = {
  modern: {
    wrap: "bg-[#0b0b13] text-white",
    hero: "bg-gradient-to-br from-violet-600/30 via-blue-600/20 to-transparent",
    card: "bg-white/5 backdrop-blur-xl border border-white/10",
    cta: "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.6)]",
    accent: "text-violet-300",
    heading: "font-bold tracking-tight",
  },
  bold: {
    wrap: "bg-[#fff8ee] text-[#1a1a1a]",
    hero: "bg-gradient-to-br from-orange-400/30 via-rose-400/20 to-transparent",
    card: "bg-white border-2 border-black shadow-[6px_6px_0_0_#000]",
    cta: "bg-black text-white border-2 border-black shadow-[6px_6px_0_0_#ff6b35]",
    accent: "text-rose-600",
    heading: "font-extrabold tracking-tight",
  },
  minimal: {
    wrap: "bg-white text-neutral-900",
    hero: "bg-gradient-to-b from-neutral-50 to-white",
    card: "bg-neutral-50 border border-neutral-200",
    cta: "bg-neutral-900 text-white",
    accent: "text-neutral-500",
    heading: "font-semibold tracking-tight",
  },
  elegant: {
    wrap: "bg-[#0f1115] text-[#e7e5e4]",
    hero: "bg-gradient-to-br from-amber-500/15 via-amber-300/5 to-transparent",
    card: "bg-[#1a1d23] border border-amber-500/20",
    cta: "bg-amber-400 text-[#0f1115]",
    accent: "text-amber-300",
    heading: "font-serif",
  },
};

export function SalesPageView({ content, template = "modern" }: Props) {
  const t = templateClasses[template];

  return (
    <div className={`${t.wrap} min-h-full w-full`}>
      {/* Hero */}
      <section className={`${t.hero} px-6 py-20 md:py-28 text-center`}>
        <div className="mx-auto max-w-4xl">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium ${t.card}`}>
            <Sparkles className="h-3.5 w-3.5" /> Limited launch offer
          </span>
          <h1 className={`mt-6 text-4xl md:text-6xl ${t.heading}`}>{content.headline}</h1>
          <p className={`mt-6 text-lg md:text-xl ${t.accent}`}>{content.subheadline}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className={`${t.cta} inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold`}>
              {content.cta.primary} <ArrowRight className="h-4 w-4" />
            </button>
            <button className={`${t.card} rounded-full px-7 py-3.5 text-sm font-semibold`}>
              {content.cta.secondary}
            </button>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-base md:text-lg leading-relaxed opacity-90">
          {content.description.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`text-3xl md:text-4xl text-center mb-12 ${t.heading}`}>Why you'll love it</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.benefits.map((b, i) => (
              <div key={i} className={`${t.card} rounded-2xl p-6`}>
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${t.cta}`}>
                  <Check className="h-5 w-5" />
                </div>
                <h3 className={`text-lg mb-2 ${t.heading}`}>{b.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`text-3xl md:text-4xl text-center mb-12 ${t.heading}`}>Everything you get</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.features.map((f, i) => (
              <div key={i} className={`${t.card} rounded-xl p-5 flex gap-4`}>
                <div className={`shrink-0 h-9 w-9 rounded-lg flex items-center justify-center ${t.cta}`}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className={`text-base mb-1 ${t.heading}`}>{f.title}</h3>
                  <p className="text-sm opacity-80">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`text-3xl md:text-4xl text-center mb-12 ${t.heading}`}>Loved by people like you</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {content.socialProof.map((s, i) => (
              <div key={i} className={`${t.card} rounded-2xl p-6`}>
                <div className={`flex gap-0.5 mb-4 ${t.accent}`}>
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm leading-relaxed opacity-90">"{s.quote}"</p>
                <div className="mt-4 pt-4 border-t border-current/10">
                  <div className="font-semibold text-sm">{s.author}</div>
                  <div className={`text-xs ${t.accent}`}>{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className={`${t.card} rounded-3xl p-8 text-center`}>
            <h3 className={`text-xl ${t.heading}`}>{content.pricing.title}</h3>
            <div className="mt-4 mb-2">
              <span className={`text-5xl ${t.heading}`}>{content.pricing.price}</span>
            </div>
            <p className="text-sm opacity-75 mb-6">{content.pricing.description}</p>
            <ul className="space-y-3 text-left mb-8">
              {content.pricing.features.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <Check className={`h-5 w-5 shrink-0 ${t.accent}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className={`${t.cta} w-full rounded-full px-7 py-3.5 text-sm font-semibold`}>
              {content.cta.primary}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content.faq && content.faq.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-3xl md:text-4xl text-center mb-12 ${t.heading}`}>Questions, answered</h2>
            <div className="space-y-3">
              {content.faq.map((q, i) => (
                <div key={i} className={`${t.card} rounded-xl p-5`}>
                  <h3 className={`mb-2 ${t.heading}`}>{q.question}</h3>
                  <p className="text-sm opacity-80">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className={`text-3xl md:text-5xl mb-6 ${t.heading}`}>Ready to get started?</h2>
          <p className="opacity-80 mb-8">Join hundreds of others who already made the leap.</p>
          <button className={`${t.cta} inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-semibold`}>
            {content.cta.primary} <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
