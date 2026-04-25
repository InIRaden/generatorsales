import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Wand2, LayoutTemplate, Download, ArrowRight, Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PageForge — Turn products into high-converting sales pages with AI" },
      { name: "description", content: "Describe your product. Get a polished, persuasive landing page in seconds — with multiple templates, live preview, and HTML export." },
      { property: "og:title", content: "PageForge — AI Sales Page Generator" },
      { property: "og:description", content: "Describe your product. Get a polished landing page in seconds." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="relative">
        <AppHeader />

        <section className="px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" />
              Powered by Raden Mahesa
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              Turn any product into a{" "}
              <span className="text-gradient-brand">high-converting sales page</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Describe what you sell. PageForge writes the headline, benefits, social proof and CTA — and renders it as a real landing page you can preview and export.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand">
                <Link to={user ? "/new" : "/signup"}>
                  Generate my page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15">
                <Link to={user ? "/dashboard" : "/login"}>I have an account</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-24">
          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
            {[
              { icon: Wand2, title: "Persuasive copywriting", desc: "Headlines, benefits, FAQ — written like a senior direct-response copywriter." },
              { icon: LayoutTemplate, title: "4 stunning templates", desc: "Modern, Bold, Minimal, Elegant — switch instantly without re-generating." },
              { icon: Download, title: "Export to HTML", desc: "Download a self-contained .html file. Host it anywhere, no build step." },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-6 ease-smooth transition hover:bg-white/[0.06]">
                <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-24">
          <div className="mx-auto max-w-3xl glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">From idea to live page in 60 seconds</h2>
            <p className="text-muted-foreground mb-8">Three steps. No design skills required.</p>
            <div className="grid gap-4 md:grid-cols-3 text-left">
              {["Describe your product", "AI writes & designs", "Preview, edit & export"].map((s, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-2 text-xs text-primary mb-2">
                    <Check className="h-3.5 w-3.5" /> Step {i + 1}
                  </div>
                  <div className="font-medium">{s}</div>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8 bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Link to={user ? "/new" : "/signup"}>Start generating <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-muted-foreground">
          Built with Raden Mahesa
        </footer>
      </div>
    </div>
  );
}
