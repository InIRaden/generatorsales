import type { ProductInput } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  value: ProductInput;
  onChange: (v: ProductInput) => void;
}

export function ProductForm({ value, onChange }: Props) {
  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="product_name">Product / service name *</Label>
        <Input id="product_name" required value={value.product_name} onChange={(e) => set("product_name", e.target.value)} placeholder="e.g. NoteFlow Pro" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="product_description">Description *</Label>
        <Textarea id="product_description" required rows={3} value={value.product_description} onChange={(e) => set("product_description", e.target.value)} placeholder="What is it and what problem does it solve?" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="features">Key features</Label>
        <Textarea id="features" rows={3} value={value.features} onChange={(e) => set("features", e.target.value)} placeholder="One per line, or comma-separated" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="target_audience">Target audience</Label>
          <Input id="target_audience" value={value.target_audience} onChange={(e) => set("target_audience", e.target.value)} placeholder="e.g. Indie designers" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" value={value.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. $29/mo" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="usp">Unique selling point</Label>
        <Textarea id="usp" rows={2} value={value.unique_selling_point} onChange={(e) => set("unique_selling_point", e.target.value)} placeholder="What makes you different?" />
      </div>
    </div>
  );
}
