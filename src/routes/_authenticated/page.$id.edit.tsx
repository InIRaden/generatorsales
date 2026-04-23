import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { ProductForm } from "@/components/sales/ProductForm";
import { TemplatePicker } from "@/components/sales/TemplatePicker";
import { SalesPageView } from "@/components/sales/SalesPageView";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Save, ArrowLeft, RefreshCw } from "lucide-react";
import type { ProductInput, SalesPageContent, Template } from "@/lib/types";
import { generateSalesPage } from "@/lib/sales-api";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/page/$id/edit")({
  head: () => ({ meta: [{ title: "Edit — PageForge" }] }),
  component: EditPage,
});

const SECTIONS = [
  { id: "headline", label: "Headline + sub-headline" },
  { id: "description", label: "Description" },
  { id: "benefits", label: "Benefits" },
  { id: "features", label: "Features" },
  { id: "socialProof", label: "Social proof" },
  { id: "pricing", label: "Pricing" },
  { id: "cta", label: "Call-to-action" },
  { id: "faq", label: "FAQ" },
];

function EditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState<ProductInput>({
    product_name: "", product_description: "", features: "",
    target_audience: "", price: "", unique_selling_point: "",
  });
  const [template, setTemplate] = useState<Template>("modern");
  const [content, setContent] = useState<SalesPageContent | null>(null);
  const [section, setSection] = useState<string>("headline");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("sales_pages").select("*").eq("id", id).single();
      if (error || !data) {
        toast.error("Page not found");
        navigate({ to: "/dashboard" });
        return;
      }
      setInput({
        product_name: data.product_name,
        product_description: data.product_description ?? "",
        features: data.features ?? "",
        target_audience: data.target_audience ?? "",
        price: data.price ?? "",
        unique_selling_point: data.unique_selling_point ?? "",
      });
      setTemplate((data.template as Template) ?? "modern");
      setContent(data.content as unknown as SalesPageContent);
      setLoading(false);
    })();
  }, [id, navigate]);

  const handleRegenerateAll = async () => {
    setGenerating(true);
    try {
      const result = await generateSalesPage(input);
      setContent(result);
      toast.success("Regenerated!");
    } catch (e: any) {
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
      // Replace just the selected section with the new one
      const merged: SalesPageContent = { ...content, [section]: (result as any)[section] };
      // For headline section, also update subheadline
      if (section === "headline") merged.subheadline = result.subheadline;
      setContent(merged);
      toast.success(`Regenerated "${SECTIONS.find((s) => s.id === section)?.label}"`);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    const { error } = await supabase.from("sales_pages").update({
      product_name: input.product_name,
      product_description: input.product_description,
      features: input.features,
      target_audience: input.target_audience,
      price: input.price,
      unique_selling_point: input.unique_selling_point,
      template,
      content: content as any,
    }).eq("id", id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved!");
    navigate({ to: "/page/$id", params: { id } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-mesh opacity-40" />
      <div className="relative">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
            <Link to="/page/$id" params={{ id }}><ArrowLeft className="h-4 w-4 mr-1.5" />Back to preview</Link>
          </Button>
          <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
            <div className="glass rounded-2xl p-6 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <h1 className="text-xl font-bold mb-1">Edit page</h1>
              <p className="text-sm text-muted-foreground mb-6">Update inputs and regenerate.</p>

              <ProductForm value={input} onChange={setInput} />

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Template</p>
                  <TemplatePicker value={template} onChange={setTemplate} />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Regenerate one section</p>
                  <div className="flex gap-2">
                    <Select value={section} onValueChange={setSection}>
                      <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {SECTIONS.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleRegenerateSection} disabled={generating} variant="secondary" size="icon">
                      {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleRegenerateAll} disabled={generating} variant="outline" className="w-full">
                  {generating ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Working…</> : <><Sparkles className="h-4 w-4 mr-2" />Regenerate everything</>}
                </Button>

                <Button onClick={handleSave} disabled={saving} className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90">
                  {saving ? "Saving…" : <><Save className="h-4 w-4 mr-2" />Save changes</>}
                </Button>
              </div>
            </div>

            <div className="glass rounded-2xl p-2 overflow-hidden">
              <div className="rounded-xl overflow-hidden border border-white/10">
                {content && <SalesPageView content={content} template={template} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
