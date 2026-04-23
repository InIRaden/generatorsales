import { supabase } from "@/integrations/supabase/client";
import type { ProductInput, SalesPageContent } from "./types";

export async function generateSalesPage(input: ProductInput, section?: string): Promise<SalesPageContent> {
  const { data, error } = await supabase.functions.invoke("generate-sales-page", {
    body: { input, section },
  });
  if (error) {
    // Try to read structured error
    const ctx: any = (error as any).context;
    if (ctx?.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
    if (ctx?.status === 402) throw new Error("AI credits exhausted. Add funds in Settings → Workspace → Usage.");
    throw new Error(error.message || "Failed to generate sales page");
  }
  if (data?.error) throw new Error(data.error);
  return data.content as SalesPageContent;
}
