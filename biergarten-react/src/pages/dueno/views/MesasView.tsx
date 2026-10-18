import { MesaGrid } from "../../../components/mesa/MesaGrid";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useStore } from "../../../store/StoreContext";

export function MesasView() {
  const { db } = useStore();

  return (
    <SectionCard
      title="Estado de mesas"
      subtitle="Vista de solo lectura · se actualiza desde el panel de meseros"
    >
      <MesaGrid mesas={db.mesas} pedidos={db.pedidos} />
      <div className="flex flex-wrap gap-4 text-xs text-cream-dim border-t border-line pt-3">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-ok" /> Libre</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warn" /> Ocupada</span>
      </div>
    </SectionCard>
  );
}