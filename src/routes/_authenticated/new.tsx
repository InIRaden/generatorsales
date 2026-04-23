import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProductForm } from "@/components/sales/ProductForm";
import { TemplatePicker } from "@/components/sales/TemplatePicker";
import { SalesPageView } from "@/components/sales/SalesPageView";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Save, ArrowLeft } from "lucide-react";
import type { ProductInput, SalesPageContent, Template } from "@/lib/types";
import { generateSalesPage } from "@/lib/sales-api";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/new")({
  head: () => ({ meta: [{ title: "New page — PageForge" }] }),
  component: NewPage,
});

const empty: ProductInput = {
  product_name: "", product_description: "", features: "",
  target_audience: "", price: "", unique_selling_point: "",
};

function NewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState<ProductInput>(empty);
  const [template, setTemplate] = useState<Template>("modern");
  const [content, setContent] = useState<SalesPageContent | null>(null);
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
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!content || !user) return;
    setSaving(true);
    const { data, error } = await supabase.from("sales_pages").insert({
      user_id: user.id,
      product_name: input.product_name,
      product_description: input.product_description,
      features: input.features,
      target_audience: input.target_audience,
      price: input.price,
      unique_selling_point: input.unique_selling_point,
      template,
      content: content as any,
    }).select("id").single();
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved!");
    navigate({ to: "/page/$id", params: { id: data.id } });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-mesh opacity-40" />
      <div className="relative">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
            <a href="/dashboard"><ArrowLeft className="h-4 w-4 mr-1.5" />Back</a>
          </Button>
          <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
            {/* Form */}
            <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
              <h1 className="text-xl font-bold mb-1">Describe your product</h1>
              <p className="text-sm text-muted-foreground mb-6">The more detail, the better the page.</p>
              <ProductForm value={input} onChange={setInput} />
              <div className="mt-6 space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Template</p>
                  <TemplatePicker value={template} onChange={setTemplate} />
                </div>
                <Button onClick={handleGenerate} disabled={!canGenerate || generating} className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand">
                  {generating ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</> : <><Sparkles className="h-4 w-4 mr-2" />{content ? "Regenerate all" : "Generate sales page"}</>}
                </Button>
                {content && (
                  <Button onClick={handleSave} disabled={saving} variant="secondary" className="w-full">
                    {saving ? "Saving…" : <><Save className="h-4 w-4 mr-2" />Save page</>}
                  </Button>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="glass rounded-2xl p-2 min-h-[600px] overflow-hidden">
              {content ? (
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <SalesPageView content={content} template={template} />
                </div>
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center text-center px-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">Live preview</h2>
                  <p className="text-sm text-muted-foreground max-w-sm">Fill out the form and hit "Generate" to see your sales page render here.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
