import { TabBar } from "../ui/TabBar";

interface SubTabsProps {
  titulo: string;
  subs: string[];
  activa: string;
  onChange: (s: string) => void;
}

/** Barra de subcategorías (ej. Comidas → Piqueo | Carnes). */
export function SubTabs({ titulo, subs, activa, onChange }: SubTabsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h4 className="font-display text-gold text-sm tracking-wide uppercase">{titulo}</h4>
        <span className="flex-1 h-px bg-line" />
      </div>
      <div className="rounded-sm overflow-hidden border border-line bg-line">
        <TabBar
          tabs={subs.map((s) => ({ value: s, label: s }))}
          active={activa}
          onChange={onChange}
          variant="segmented"
          className="!gap-0"
        />
      </div>
    </div>
  );
}
