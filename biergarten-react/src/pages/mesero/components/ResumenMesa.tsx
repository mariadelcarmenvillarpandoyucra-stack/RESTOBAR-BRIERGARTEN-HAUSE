import { Badge } from "../../../components/ui/Badge";
import type { Pedido } from "../../../types";
import { bs } from "../../../lib/format";

interface ResumenMesaProps {
  pedidos: Pedido[];
  onSolicitarFactura: () => void;
  onAgregarProductos: () => void;
  onCobrar: () => void;
}

export function ResumenMesa({ pedidos, onSolicitarFactura, onAgregarProductos, onCobrar }: ResumenMesaProps) {
  const total = pedidos.reduce((sum, pedido) => sum + pedido.total, 0);

  return (
    <div className="space-y-4">
      <div className="max-h-[45vh] overflow-y-auto space-y-3">
        {pedidos.map((pedido) => (
          <article key={pedido.id} className="rounded-sm border border-line bg-bg-card-hi p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-cream">Pedido #{pedido.id}</p>
                <p className="text-xs text-cream-dim mt-1">{pedido.hora}</p>
              </div>
              <Badge estado={pedido.estado} />
            </div>
            <div className="mt-3 space-y-1">
              {pedido.items.map((item, index) => (
                <p key={`${pedido.id}-${index}`} className="text-sm text-cream-dim">{item.cant} × {item.nombre}</p>
              ))}
            </div>
            {pedido.nota && <p className="text-xs text-gold-soft mt-2">Nota: {pedido.nota}</p>}
            <p className="text-right text-sm text-gold mt-3">{bs(pedido.total)}</p>
          </article>
        ))}
      </div>
      <div className="flex justify-between border-t border-line pt-3">
        <span className="text-sm text-cream-dim">Total de la mesa</span>
        <span className="font-display text-lg text-gold">{bs(total)}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button type="button" className="btn-outline text-sm" onClick={onSolicitarFactura}>Solicitar factura</button>
        <button type="button" className="btn-outline text-sm" onClick={onAgregarProductos}>Agregar productos</button>
      </div>
      <button type="button" onClick={onCobrar} className="btn-gold w-full text-sm min-h-[52px] font-semibold">
        Cobrar y liberar mesa
      </button>
    </div>
  );
}
