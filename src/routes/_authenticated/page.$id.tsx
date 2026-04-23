import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { SalesPageView } from "@/components/sales/SalesPageView";
import { TEMPLATES } from "@/components/sales/TemplatePicker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3, Download, Loader2 } from "lucide-react";
import type { SalesPageContent, Template } from "@/lib/types";
import { exportSalesPageHtml } from "@/lib/export-html";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/page/$id")({
  head: () => ({ meta: [{ title: "Preview — PageForge" }] }),
  component: PageView,
});

function PageView() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<SalesPageContent | null>(null);
  const [template, setTemplate] = useState<Template>("modern");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingTpl, setSavingTpl] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("sales_pages").select("*").eq("id", id).single();
      if (error || !data) {
        toast.error("Page not found");
        navigate({ to: "/dashboard" });
        return;
      }
      setContent(data.content as unknown as SalesPageContent);
      setTemplate((data.template as Template) ?? "modern");
      setProductName(data.product_name);
      setLoading(false);
    })();
  }, [id, navigate]);

  const updateTemplate = async (t: Template) => {
    setTemplate(t);
    setSavingTpl(true);
    await supabase.from("sales_pages").update({ template: t }).eq("id", id);
    setSavingTpl(false);
  };

  const handleExport = () => {
    if (!content) return;
    const html = exportSalesPageHtml(content, template, productName);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${productName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "sales-page"}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("HTML exported!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="sticky top-16 z-30 glass border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard"><ArrowLeft className="h-4 w-4 mr-1.5" />Dashboard</Link>
            </Button>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{productName}</div>
              <div className="text-xs text-muted-foreground">Live preview {savingTpl && "• saving template…"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateTemplate(t.id)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full transition",
                    template === t.id ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link to="/page/$id/edit" params={{ id }}><Edit3 className="h-3.5 w-3.5 mr-1.5" />Edit</Link>
            </Button>
            <Button onClick={handleExport} size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90">
              <Download className="h-3.5 w-3.5 mr-1.5" />Export HTML
            </Button>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-card-soft">
          {content && <SalesPageView content={content} template={template} />}
        </div>
      </main>
    </div>
  );
}
