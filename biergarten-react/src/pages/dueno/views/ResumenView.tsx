import { StatCard } from "../../../components/ui/StatCard";
import { StatGrid } from "../../../components/ui/StatGrid";
import { Badge } from "../../../components/ui/Badge";
import { SectionCard } from "../../../components/ui/SectionCard";
import { bs } from "../../../lib/format";
import { computeStats } from "../../../lib/stats";
import { useStore } from "../../../store/StoreContext";

/* Antes "Dashboard" — renombrado a "Restobar Biergärten Haus" a pedido del dueño. */
export function ResumenView() {
  const { db } = useStore();
  const stats = computeStats(db);
  const pedidosActivos = db.pedidos.filter((p) => p.estado !== "entregado");
  const mesasOcupadas = db.mesas.filter((m) => m.estado !== "libre").length;

  return (
    <div className="space-y-6">
      <div
        className="rounded p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(120deg, #3a2a12, #6b4a1c 55%, #8a6a2a)", border: "1px solid #8a6f2c" }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-gold-soft mb-1">Bienvenido, administrador</p>
        <h2 className="font-display text-2xl mb-1">Resumen del Restobar</h2>
        <p className="text-sm text-white/80">Aquí puedes controlar las operaciones de tu negocio en tiempo real.</p>
      </div>

      <StatGrid>
        <StatCard label="🍺 Ventas de hoy" value={bs(stats.ventasHoy)} sub={`${stats.numVentas} cuentas cobradas`} />
        <StatCard label="🧾 Pedidos activos" value={String(pedidosActivos.length)} sub={`${db.pedidos.length} en total hoy`} />
        <StatCard label="🪑 Mesas ocupadas" value={`${mesasOcupadas} / ${db.mesas.length}`} />
        <StatCard label="⭐ Calificación" value={stats.calificacionPromedio ? stats.calificacionPromedio.toFixed(1) : "—"} sub={`${db.ventas.filter((v) => v.calificacion > 0).length} opiniones`} />
      </StatGrid>

      <div className="grid md:grid-cols-2 gap-4">
        <SectionCard title="Pedidos en curso">
          <div className="space-y-2">
            {pedidosActivos.slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm border-b border-line pb-2 last:border-0">
                <span className="text-cream">#{p.id} · Mesa {p.mesa} · {p.mesero}</span>
                <Badge estado={p.estado} />
              </div>
            ))}
            {pedidosActivos.length === 0 && <p className="text-sm text-cream-dim">No hay pedidos activos.</p>}
          </div>
        </SectionCard>

        <SectionCard title="Ventas de la semana">
          <div className="flex items-end gap-2 h-32">
            {db.ventasSemana.map((v, i) => {
              const max = Math.max(...db.ventasSemana);
              const dias = ["L", "M", "M", "J", "V", "S", "D"];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gold-dim rounded-t-sm" style={{ height: `${(v / max) * 100}%` }} title={bs(v)} />
                  <span className="text-[10px] text-cream-dim">{dias[i]}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
