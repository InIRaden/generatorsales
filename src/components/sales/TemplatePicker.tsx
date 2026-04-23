import type { Template } from "@/lib/types";
import { cn } from "@/lib/utils";

const TEMPLATES: { id: Template; name: string; gradient: string }[] = [
  { id: "modern", name: "Modern", gradient: "from-violet-500 to-blue-500" },
  { id: "bold", name: "Bold", gradient: "from-orange-400 to-rose-500" },
  { id: "minimal", name: "Minimal", gradient: "from-neutral-300 to-neutral-500" },
  { id: "elegant", name: "Elegant", gradient: "from-amber-300 to-amber-600" },
];

export function TemplatePicker({ value, onChange }: { value: Template; onChange: (v: Template) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-xl p-3 border text-left transition ease-smooth",
            value === t.id ? "border-primary bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
          )}
        >
          <div className={cn("h-12 rounded-lg bg-gradient-to-br mb-2", t.gradient)} />
          <div className="text-xs font-medium">{t.name}</div>
        </button>
      ))}
    </div>
  );
}

export { TEMPLATES };
