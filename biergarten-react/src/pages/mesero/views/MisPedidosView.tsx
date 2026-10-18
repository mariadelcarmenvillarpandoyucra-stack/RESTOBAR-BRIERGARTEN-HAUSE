import { Badge } from "../../../components/ui/Badge";
import { SectionCard } from "../../../components/ui/SectionCard";
import { bs } from "../../../lib/format";
import { useStore } from "../../../store/StoreContext";

export function MisPedidosView({ meseroNombre }: { meseroNombre: string }) {
  const { db } = useStore();
  const misPedidos = db.pedidos.filter((p) => p.mesero === meseroNombre);

  return (
    <div className="space-y-3">
      {misPedidos.length === 0 && <p className="text-sm text-cream-dim">Todavía no enviaste pedidos hoy.</p>}
      {misPedidos.map((p) => (
        <SectionCard
          key={p.id}
          title={`Pedido #${p.id} · Mesa ${p.mesa}`}
          action={<Badge estado={p.estado} />}
        >
          <ul className="text-xs text-cream-dim space-y-0.5 mb-2">
            {p.items.map((it, i) => <li key={i}>{it.cant}× {it.nombre}</li>)}
          </ul>
          {p.nota && <p className="text-xs text-cream-dim mb-2 border-l-2 border-gold-dim pl-2 italic">{p.nota}</p>}
          <div className="flex justify-between text-xs text-cream-dim">
            <span>{p.hora}</span>
            <span className="text-gold font-semibold">{bs(p.total)}</span>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
