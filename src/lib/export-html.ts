import type { SalesPageContent, Template } from "./types";

export function exportSalesPageHtml(content: SalesPageContent, template: Template, productName: string): string {
  const themes: Record<Template, { bg: string; text: string; cardBg: string; cardBorder: string; ctaBg: string; ctaText: string; accent: string; heroBg: string; fontHead: string; fontBody: string; ctaShadow: string }> = {
    modern: { bg: "#0b0b13", text: "#ffffff", cardBg: "rgba(255,255,255,0.05)", cardBorder: "rgba(255,255,255,0.1)", ctaBg: "linear-gradient(135deg,#8b5cf6,#3b82f6)", ctaText: "#fff", accent: "#c4b5fd", heroBg: "linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.2),transparent)", fontHead: "system-ui, -apple-system, 'Segoe UI', sans-serif", fontBody: "system-ui, -apple-system, sans-serif", ctaShadow: "0 10px 40px -10px rgba(139,92,246,0.6)" },
    bold: { bg: "#fff8ee", text: "#1a1a1a", cardBg: "#ffffff", cardBorder: "#000", ctaBg: "#000", ctaText: "#fff", accent: "#e11d48", heroBg: "linear-gradient(135deg,rgba(251,146,60,0.3),rgba(244,63,94,0.2),transparent)", fontHead: "system-ui, sans-serif", fontBody: "system-ui, sans-serif", ctaShadow: "6px 6px 0 0 #ff6b35" },
    minimal: { bg: "#ffffff", text: "#171717", cardBg: "#fafafa", cardBorder: "#e5e5e5", ctaBg: "#171717", ctaText: "#fff", accent: "#737373", heroBg: "linear-gradient(180deg,#fafafa,#fff)", fontHead: "system-ui, sans-serif", fontBody: "system-ui, sans-serif", ctaShadow: "none" },
    elegant: { bg: "#0f1115", text: "#e7e5e4", cardBg: "#1a1d23", cardBorder: "rgba(251,191,36,0.2)", ctaBg: "#fbbf24", ctaText: "#0f1115", accent: "#fcd34d", heroBg: "linear-gradient(135deg,rgba(245,158,11,0.15),transparent)", fontHead: "Georgia, serif", fontBody: "system-ui, sans-serif", ctaShadow: "none" },
  };
  const t = themes[template];
  const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(productName)} — ${escape(content.headline)}</title>
<meta name="description" content="${escape(content.subheadline)}" />
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:${t.fontBody};background:${t.bg};color:${t.text};line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:${t.fontHead};line-height:1.2}
.container{max-width:1100px;margin:0 auto;padding:0 1.5rem}
.hero{background:${t.heroBg};padding:6rem 1.5rem;text-align:center}
.hero h1{font-size:clamp(2rem,5vw,3.75rem);font-weight:800;letter-spacing:-0.02em;margin:1.5rem 0}
.hero p{font-size:1.25rem;color:${t.accent};max-width:42rem;margin:0 auto}
.badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem 1rem;font-size:.75rem;border-radius:9999px;background:${t.cardBg};border:1px solid ${t.cardBorder}}
.cta{display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 1.75rem;border:none;border-radius:9999px;font-weight:600;font-size:.95rem;cursor:pointer;background:${t.ctaBg};color:${t.ctaText};box-shadow:${t.ctaShadow};text-decoration:none}
.cta-secondary{background:${t.cardBg};color:${t.text};border:1px solid ${t.cardBorder}}
.cta-row{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-top:2.5rem}
section{padding:4rem 1.5rem}
section h2{font-size:clamp(1.75rem,3vw,2.5rem);font-weight:700;text-align:center;margin-bottom:3rem}
.grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{background:${t.cardBg};border:1px solid ${t.cardBorder};border-radius:1rem;padding:1.5rem}
.card h3{font-size:1.1rem;margin-bottom:.5rem}
.card p{font-size:.9rem;opacity:.85}
.icon{display:inline-flex;width:2.5rem;height:2.5rem;border-radius:.75rem;background:${t.ctaBg};color:${t.ctaText};align-items:center;justify-content:center;margin-bottom:1rem;font-weight:700}
.feature{display:flex;gap:1rem;align-items:flex-start}
.feature .icon{margin-bottom:0;flex-shrink:0;width:2.25rem;height:2.25rem}
.testimonial .stars{color:${t.accent};margin-bottom:.75rem;font-size:.9rem;letter-spacing:2px}
.testimonial .author{margin-top:1rem;padding-top:1rem;border-top:1px solid ${t.cardBorder};font-weight:600;font-size:.9rem}
.testimonial .role{color:${t.accent};font-size:.8rem;font-weight:400}
.pricing{max-width:28rem;margin:0 auto;text-align:center;padding:2.5rem}
.pricing .price{font-size:3rem;font-weight:800;margin:1rem 0 .5rem}
.pricing ul{list-style:none;text-align:left;margin:1.5rem 0 2rem}
.pricing li{padding:.5rem 0;display:flex;gap:.5rem;font-size:.9rem}
.pricing li::before{content:"✓";color:${t.accent};font-weight:700}
.pricing .cta{width:100%;justify-content:center}
.faq .card{margin-bottom:.75rem}
.final{text-align:center;padding:5rem 1.5rem}
.final h2{font-size:clamp(2rem,4vw,3rem);margin-bottom:1.5rem}
.final p{opacity:.8;margin-bottom:2rem}
.desc p{margin-bottom:1rem}
.desc{max-width:42rem;margin:0 auto;text-align:center;font-size:1.1rem}
@media (max-width:600px){.hero{padding:4rem 1rem}section{padding:3rem 1rem}}
</style>
</head>
<body>
<section class="hero">
  <span class="badge">✨ Limited launch offer</span>
  <h1>${escape(content.headline)}</h1>
  <p>${escape(content.subheadline)}</p>
  <div class="cta-row">
    <a href="#pricing" class="cta">${escape(content.cta.primary)} →</a>
    <a href="#features" class="cta cta-secondary">${escape(content.cta.secondary)}</a>
  </div>
</section>

<section class="desc">
  ${content.description.split(/\n\n+/).map((p) => `<p>${escape(p)}</p>`).join("")}
</section>

<section>
  <h2>Why you'll love it</h2>
  <div class="container"><div class="grid">
    ${content.benefits.map((b) => `<div class="card"><div class="icon">✓</div><h3>${escape(b.title)}</h3><p>${escape(b.description)}</p></div>`).join("")}
  </div></div>
</section>

<section id="features">
  <h2>Everything you get</h2>
  <div class="container"><div class="grid">
    ${content.features.map((f) => `<div class="card feature"><div class="icon">★</div><div><h3>${escape(f.title)}</h3><p>${escape(f.description)}</p></div></div>`).join("")}
  </div></div>
</section>

<section>
  <h2>Loved by people like you</h2>
  <div class="container"><div class="grid">
    ${content.socialProof.map((s) => `<div class="card testimonial"><div class="stars">★★★★★</div><p>"${escape(s.quote)}"</p><div class="author">${escape(s.author)}<div class="role">${escape(s.role)}</div></div></div>`).join("")}
  </div></div>
</section>

<section id="pricing">
  <div class="card pricing">
    <h3>${escape(content.pricing.title)}</h3>
    <div class="price">${escape(content.pricing.price)}</div>
    <p>${escape(content.pricing.description)}</p>
    <ul>${content.pricing.features.map((f) => `<li>${escape(f)}</li>`).join("")}</ul>
    <a href="#" class="cta">${escape(content.cta.primary)}</a>
  </div>
</section>

${content.faq && content.faq.length > 0 ? `
<section class="faq">
  <h2>Questions, answered</h2>
  <div class="container">
    ${content.faq.map((q) => `<div class="card"><h3>${escape(q.question)}</h3><p>${escape(q.answer)}</p></div>`).join("")}
  </div>
</section>` : ""}

<section class="final">
  <h2>Ready to get started?</h2>
  <p>Join hundreds of others who already made the leap.</p>
  <a href="#pricing" class="cta">${escape(content.cta.primary)} →</a>
</section>
</body></html>`;
}
