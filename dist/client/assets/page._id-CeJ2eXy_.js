import{R as B,u as N,r as o,s as x,t as u,j as t,L as b}from"./index-CMeujDQ8.js";import{A as z}from"./AppHeader-BI_8Zl5t.js";import{L,A as k,a as S,S as T}from"./SalesPageView-B8KQaPvu.js";import{B as p,a as E}from"./button-CsGpsdmu.js";import{P}from"./pen-line-ChvxizBZ.js";import{D as q}from"./download-BDizhkwN.js";import"./sparkles-nwzJOZRw.js";import"./check-BC0MK0mE.js";function C(r,c,n){const e={modern:{bg:"#0b0b13",text:"#ffffff",cardBg:"rgba(255,255,255,0.05)",cardBorder:"rgba(255,255,255,0.1)",ctaBg:"linear-gradient(135deg,#8b5cf6,#3b82f6)",ctaText:"#fff",accent:"#c4b5fd",heroBg:"linear-gradient(135deg,rgba(139,92,246,0.3),rgba(59,130,246,0.2),transparent)",fontHead:"system-ui, -apple-system, 'Segoe UI', sans-serif",fontBody:"system-ui, -apple-system, sans-serif",ctaShadow:"0 10px 40px -10px rgba(139,92,246,0.6)"},bold:{bg:"#fff8ee",text:"#1a1a1a",cardBg:"#ffffff",cardBorder:"#000",ctaBg:"#000",ctaText:"#fff",accent:"#e11d48",heroBg:"linear-gradient(135deg,rgba(251,146,60,0.3),rgba(244,63,94,0.2),transparent)",fontHead:"system-ui, sans-serif",fontBody:"system-ui, sans-serif",ctaShadow:"6px 6px 0 0 #ff6b35"},minimal:{bg:"#ffffff",text:"#171717",cardBg:"#fafafa",cardBorder:"#e5e5e5",ctaBg:"#171717",ctaText:"#fff",accent:"#737373",heroBg:"linear-gradient(180deg,#fafafa,#fff)",fontHead:"system-ui, sans-serif",fontBody:"system-ui, sans-serif",ctaShadow:"none"},elegant:{bg:"#0f1115",text:"#e7e5e4",cardBg:"#1a1d23",cardBorder:"rgba(251,191,36,0.2)",ctaBg:"#fbbf24",ctaText:"#0f1115",accent:"#fcd34d",heroBg:"linear-gradient(135deg,rgba(245,158,11,0.15),transparent)",fontHead:"Georgia, serif",fontBody:"system-ui, sans-serif",ctaShadow:"none"}}[c],a=i=>i.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m]);return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${a(n)} — ${a(r.headline)}</title>
<meta name="description" content="${a(r.subheadline)}" />
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:${e.fontBody};background:${e.bg};color:${e.text};line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:${e.fontHead};line-height:1.2}
.container{max-width:1100px;margin:0 auto;padding:0 1.5rem}
.hero{background:${e.heroBg};padding:6rem 1.5rem;text-align:center}
.hero h1{font-size:clamp(2rem,5vw,3.75rem);font-weight:800;letter-spacing:-0.02em;margin:1.5rem 0}
.hero p{font-size:1.25rem;color:${e.accent};max-width:42rem;margin:0 auto}
.badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem 1rem;font-size:.75rem;border-radius:9999px;background:${e.cardBg};border:1px solid ${e.cardBorder}}
.cta{display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 1.75rem;border:none;border-radius:9999px;font-weight:600;font-size:.95rem;cursor:pointer;background:${e.ctaBg};color:${e.ctaText};box-shadow:${e.ctaShadow};text-decoration:none}
.cta-secondary{background:${e.cardBg};color:${e.text};border:1px solid ${e.cardBorder}}
.cta-row{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-top:2.5rem}
section{padding:4rem 1.5rem}
section h2{font-size:clamp(1.75rem,3vw,2.5rem);font-weight:700;text-align:center;margin-bottom:3rem}
.grid{display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{background:${e.cardBg};border:1px solid ${e.cardBorder};border-radius:1rem;padding:1.5rem}
.card h3{font-size:1.1rem;margin-bottom:.5rem}
.card p{font-size:.9rem;opacity:.85}
.icon{display:inline-flex;width:2.5rem;height:2.5rem;border-radius:.75rem;background:${e.ctaBg};color:${e.ctaText};align-items:center;justify-content:center;margin-bottom:1rem;font-weight:700}
.feature{display:flex;gap:1rem;align-items:flex-start}
.feature .icon{margin-bottom:0;flex-shrink:0;width:2.25rem;height:2.25rem}
.testimonial .stars{color:${e.accent};margin-bottom:.75rem;font-size:.9rem;letter-spacing:2px}
.testimonial .author{margin-top:1rem;padding-top:1rem;border-top:1px solid ${e.cardBorder};font-weight:600;font-size:.9rem}
.testimonial .role{color:${e.accent};font-size:.8rem;font-weight:400}
.pricing{max-width:28rem;margin:0 auto;text-align:center;padding:2.5rem}
.pricing .price{font-size:3rem;font-weight:800;margin:1rem 0 .5rem}
.pricing ul{list-style:none;text-align:left;margin:1.5rem 0 2rem}
.pricing li{padding:.5rem 0;display:flex;gap:.5rem;font-size:.9rem}
.pricing li::before{content:"✓";color:${e.accent};font-weight:700}
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
  <h1>${a(r.headline)}</h1>
  <p>${a(r.subheadline)}</p>
  <div class="cta-row">
    <a href="#pricing" class="cta">${a(r.cta.primary)} →</a>
    <a href="#features" class="cta cta-secondary">${a(r.cta.secondary)}</a>
  </div>
</section>

<section class="desc">
  ${r.description.split(/\n\n+/).map(i=>`<p>${a(i)}</p>`).join("")}
</section>

<section>
  <h2>Why you'll love it</h2>
  <div class="container"><div class="grid">
    ${r.benefits.map(i=>`<div class="card"><div class="icon">✓</div><h3>${a(i.title)}</h3><p>${a(i.description)}</p></div>`).join("")}
  </div></div>
</section>

<section id="features">
  <h2>Everything you get</h2>
  <div class="container"><div class="grid">
    ${r.features.map(i=>`<div class="card feature"><div class="icon">★</div><div><h3>${a(i.title)}</h3><p>${a(i.description)}</p></div></div>`).join("")}
  </div></div>
</section>

<section>
  <h2>Loved by people like you</h2>
  <div class="container"><div class="grid">
    ${r.socialProof.map(i=>`<div class="card testimonial"><div class="stars">★★★★★</div><p>"${a(i.quote)}"</p><div class="author">${a(i.author)}<div class="role">${a(i.role)}</div></div></div>`).join("")}
  </div></div>
</section>

<section id="pricing">
  <div class="card pricing">
    <h3>${a(r.pricing.title)}</h3>
    <div class="price">${a(r.pricing.price)}</div>
    <p>${a(r.pricing.description)}</p>
    <ul>${r.pricing.features.map(i=>`<li>${a(i)}</li>`).join("")}</ul>
    <a href="#" class="cta">${a(r.cta.primary)}</a>
  </div>
</section>

${r.faq&&r.faq.length>0?`
<section class="faq">
  <h2>Questions, answered</h2>
  <div class="container">
    ${r.faq.map(i=>`<div class="card"><h3>${a(i.question)}</h3><p>${a(i.answer)}</p></div>`).join("")}
  </div>
</section>`:""}

<section class="final">
  <h2>Ready to get started?</h2>
  <p>Join hundreds of others who already made the leap.</p>
  <a href="#pricing" class="cta">${a(r.cta.primary)} →</a>
</section>
</body></html>`}function V(){const{id:r}=B.useParams(),c=N(),[n,g]=o.useState(null),[e,a]=o.useState("modern"),[i,m]=o.useState(""),[v,y]=o.useState(!0),[w,f]=o.useState(!1);o.useEffect(()=>{(async()=>{const{data:s,error:l}=await x.from("sales_pages").select("*").eq("id",r).single();if(l||!s){u.error("Page not found"),c({to:"/dashboard"});return}g(s.content),a(s.template??"modern"),m(s.product_name),y(!1)})()},[r,c]);const $=async s=>{a(s),f(!0),await x.from("sales_pages").update({template:s}).eq("id",r),f(!1)},j=()=>{if(!n)return;const s=C(n,e,i),l=new Blob([s],{type:"text/html"}),h=URL.createObjectURL(l),d=document.createElement("a");d.href=h,d.download=`${i.replace(/[^a-z0-9]+/gi,"-").toLowerCase()||"sales-page"}.html`,document.body.appendChild(d),d.click(),d.remove(),URL.revokeObjectURL(h),u.success("HTML exported!")};return v?t.jsx("div",{className:"min-h-screen flex items-center justify-center",children:t.jsx(L,{className:"h-5 w-5 animate-spin text-primary"})}):t.jsxs("div",{className:"min-h-screen bg-background",children:[t.jsx(z,{}),t.jsx("div",{className:"sticky top-16 z-30 glass border-b",children:t.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3",children:[t.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[t.jsx(p,{asChild:!0,variant:"ghost",size:"sm",children:t.jsxs(b,{to:"/dashboard",children:[t.jsx(k,{className:"h-4 w-4 mr-1.5"}),"Dashboard"]})}),t.jsxs("div",{className:"min-w-0",children:[t.jsx("div",{className:"text-sm font-semibold truncate",children:i}),t.jsxs("div",{className:"text-xs text-muted-foreground",children:["Live preview ",w&&"• saving template…"]})]})]}),t.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[t.jsx("div",{className:"flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1",children:S.map(s=>t.jsx("button",{onClick:()=>$(s.id),className:E("text-xs px-3 py-1.5 rounded-full transition",e===s.id?"bg-gradient-brand text-primary-foreground":"text-muted-foreground hover:text-foreground"),children:s.name},s.id))}),t.jsx(p,{asChild:!0,variant:"secondary",size:"sm",children:t.jsxs(b,{to:"/page/$id/edit",params:{id:r},children:[t.jsx(P,{className:"h-3.5 w-3.5 mr-1.5"}),"Edit"]})}),t.jsxs(p,{onClick:j,size:"sm",className:"bg-gradient-brand text-primary-foreground hover:opacity-90",children:[t.jsx(q,{className:"h-3.5 w-3.5 mr-1.5"}),"Export HTML"]})]})]})}),t.jsx("main",{className:"mx-auto max-w-[1400px] px-4 sm:px-6 py-6",children:t.jsx("div",{className:"rounded-2xl overflow-hidden border border-white/10 shadow-card-soft",children:n&&t.jsx(T,{content:n,template:e})})})]})}export{V as component};
