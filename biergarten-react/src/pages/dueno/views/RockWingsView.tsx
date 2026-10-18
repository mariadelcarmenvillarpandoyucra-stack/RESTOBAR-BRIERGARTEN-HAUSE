import { useState } from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { StatGrid } from "../../../components/ui/StatGrid";
import { bs } from "../../../lib/format";
import { computeRockWingsStats } from "../../../lib/stats";
import { useStore } from "../../../store/StoreContext";
import { SectionCard } from "../../../components/ui/SectionCard";

export function RockWingsView() {
  const { db, agregarVentaRockWingsManual } = useStore();
  const stats = computeRockWingsStats(db);
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [nota, setNota] = useState("");

  function handleAgregar(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(monto);
    if (!n || n <= 0) return;
    agregarVentaRockWingsManual(n, nota, fecha);
    setMonto("");
    setFecha("");
    setNota("");
  }

  return (
    <div className="space-y-6">
      <div className="rounded p-6" style={{ background: "linear-gradient(120deg, #5a2a1c, #b6532c)" }}>
        <p className="text-xs uppercase tracking-[0.25em] text-cream/80 mb-2">Marca hermana</p>
        <h2 className="font-display text-2xl text-cream mb-2">🍗 ROCK &amp; WINGS</h2>
        <p className="text-sm text-cream/90 max-w-2xl">
          Se ofrece dentro del menú del restobar y también tiene su propio local en otra ubicación.
          Aquí ves el total unificado de ambos.
        </p>
      </div>

      <StatGrid columns={3}>
        <StatCard label="🍺 Vendido en el restobar" value={bs(stats.ventasInternas)} sub={`${stats.unidadesInternas} unidades vendidas hoy`} />
        <StatCard label="📍 Vendido en el local Rock & Wings" value={bs(stats.ventasExternas)} sub={`${stats.numRegistrosExternos} registros manuales`} />
        <StatCard label="🔗 Total unificado" value={bs(stats.totalUnificado)} sub={`Producto top: ${stats.productoTopRW}`} />
      </StatGrid>

      <div className="grid md:grid-cols-2 gap-4">
        <SectionCard title="Agregar venta del local Rock & Wings" subtitle={
          "El local físico no usa este sistema — suma aquí lo que se vendió allá para mantener un solo total unificado de la marca."
        }>
          <form onSubmit={handleAgregar} className="space-y-3">
            <div>
              <label className="text-xs text-cream-dim block mb-1">Monto vendido (Bs.)</label>
              <input value={monto} onChange={(e) => setMonto(e.target.value)} type="number" placeholder="0" className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
            </div>
            <div>
              <label className="text-xs text-cream-dim block mb-1">Fecha / referencia</label>
              <input value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="Ej: Hoy, 10/09, turno tarde…" className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
            </div>
            <div>
              <label className="text-xs text-cream-dim block mb-1">Nota (opcional)</label>
              <textarea rows={2} value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Ej: ventas del turno de la tarde en el local" className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
            </div>
            <button className="btn-gold w-full text-sm">+ Sumar al total unificado</button>
          </form>
        </SectionCard>

        <SectionCard title="Historial — local Rock & Wings" subtitle="Registros que agregaste manualmente">
          {db.rockWingsVentasManual.length === 0 ? (
            <p className="text-sm text-cream-dim">Aún no registraste ventas del local Rock & Wings.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {db.rockWingsVentasManual.map((r) => (
                <div key={r.id} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
                  <div>
                    <p className="text-cream">{r.nota}</p>
                    <p className="text-[11px] text-cream-dim">{r.fecha} · {r.hora}</p>
                  </div>
                  <span className="text-cream font-semibold">{bs(r.monto)}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Detalle — vendido hoy dentro del restobar" subtitle="Calculado a partir de las mesas cobradas">
        {stats.detalleHoy.length === 0 ? (
          <p className="text-sm text-cream-dim">Aún no se vendió ningún producto Rock & Wings hoy en el restobar.</p>
        ) : (
          <div className="space-y-2">
            {stats.detalleHoy.map((d) => (
              <div key={d.nombre} className="flex justify-between text-sm border-b border-line pb-2 last:border-0">
                <span className="text-cream-dim">{d.nombre} · {d.cantidad} unid.</span>
                <span className="text-cream font-semibold">{bs(d.monto)}</span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}