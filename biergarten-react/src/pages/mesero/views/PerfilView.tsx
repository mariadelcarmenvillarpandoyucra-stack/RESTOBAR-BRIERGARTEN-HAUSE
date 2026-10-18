import { StatCard } from "../../../components/ui/StatCard";
import { StatGrid } from "../../../components/ui/StatGrid";
import { StarRating } from "../../../components/ui/StarRating";
import { bs } from "../../../lib/format";
import { statsPorMesero } from "../../../lib/stats";
import { useStore } from "../../../store/StoreContext";

export function PerfilView({ meseroNombre }: { meseroNombre: string }) {
  const { db } = useStore();
  const stats = statsPorMesero(db, meseroNombre);

  return (
    <div className="space-y-6">
      <div className="card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gold-dim flex items-center justify-center text-black font-bold text-xl">
          {meseroNombre.charAt(0)}
        </div>
        <div>
          <p className="font-display text-lg text-cream">{meseroNombre}</p>
          <p className="text-xs text-gold">Mesero</p>
        </div>
      </div>
      <StatGrid columns={3}>
        <StatCard label="Pedidos cobrados hoy" value={String(stats.pedidosHoy)} />
        <StatCard label="Propinas" value={bs(stats.propinasHoy)} />
        <StatCard label="Calificación" value={stats.calificacion ? stats.calificacion.toFixed(1) : "—"} />
      </StatGrid>
      {stats.calificacion > 0 && (
        <div className="card p-5">
          <p className="text-sm text-cream-dim mb-2">Calificación promedio</p>
          <StarRating value={Math.round(stats.calificacion)} readOnly />
        </div>
      )}
    </div>
  );
}
