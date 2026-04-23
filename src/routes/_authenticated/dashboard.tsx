import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Trash2, Edit3, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PageForge" }] }),
  component: Dashboard,
});

interface Row {
  id: string;
  product_name: string;
  template: string;
  created_at: string;
  updated_at: string;
}

function Dashboard() {
  const { user } = useAuth();
  const [pages, setPages] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("sales_pages")
      .select("id, product_name, template, created_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPages(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("sales_pages").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Page deleted");
    setPages((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-mesh opacity-50" />
      <div className="relative">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your sales pages</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {user?.user_metadata?.display_name ?? user?.email}.</p>
            </div>
            <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90 glow-brand">
              <Link to="/new"><Plus className="h-4 w-4 mr-2" />New sales page</Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl p-6 h-40 animate-pulse" />
              ))}
            </div>
          ) : pages.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 glow-brand">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No sales pages yet</h2>
              <p className="text-muted-foreground mb-6">Generate your first one in under a minute.</p>
              <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90">
                <Link to="/new"><Plus className="h-4 w-4 mr-2" />Create first page</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-6 ease-smooth transition hover:bg-white/[0.06] group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-brand-soft border border-white/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                      {p.template}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg truncate">{p.product_name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <Button asChild size="sm" variant="secondary" className="flex-1">
                      <Link to="/page/$id" params={{ id: p.id }}><Eye className="h-3.5 w-3.5 mr-1.5" />View</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/page/$id/edit" params={{ id: p.id }}><Edit3 className="h-3.5 w-3.5" /></Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this page?</AlertDialogTitle>
                          <AlertDialogDescription>
                            "{p.product_name}" will be permanently removed. This can't be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(p.id)} className="bg-destructive text-destructive-foreground">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
