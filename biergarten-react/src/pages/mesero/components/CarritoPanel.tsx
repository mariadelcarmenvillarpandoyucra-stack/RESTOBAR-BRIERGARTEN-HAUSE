import type { ItemPedido } from "../../../types";

interface CarritoPanelProps {
  items: ItemPedido[];
  nota: string;
  onNotaChange: (nota: string) => void;
  onCambiarCantidad: (nombre: string, delta: number) => void;
  onEnviar: () => void;
}

export function CarritoPanel({ items, nota, onNotaChange, onCambiarCantidad, onEnviar }: CarritoPanelProps) {
  const total = items.reduce((sum, item) => sum + item.precio * item.cant, 0);

  return (
    <section className="border-t border-line pt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-cream-dim">Pedido actual</span>
        <span className="font-display text-lg text-gold">Bs. {total.toFixed(0)}</span>
      </div>
      {items.length > 0 && (
        <>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {items.map((item) => (
              <div key={item.nombre} className="flex items-center justify-between gap-3 bg-bg-card-hi rounded-sm px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm text-cream truncate">{item.nombre}</p>
                  <p className="text-xs text-gold">Bs. {item.precio}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button type="button" aria-label={`Quitar una unidad de ${item.nombre}`} onClick={() => onCambiarCantidad(item.nombre, -1)} className="w-7 h-7 rounded border border-line text-cream hover:border-gold">−</button>
                  <span className="text-sm text-cream w-5 text-center">{item.cant}</span>
                  <button type="button" aria-label={`Agregar una unidad de ${item.nombre}`} onClick={() => onCambiarCantidad(item.nombre, 1)} className="w-7 h-7 rounded border border-line text-cream hover:border-gold">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="nota-pedido" className="text-xs text-cream-dim block mb-1">Descripción / especificaciones del pedido</label>
            <textarea
              id="nota-pedido"
              rows={2}
              maxLength={300}
              value={nota}
              onChange={(event) => onNotaChange(event.target.value)}
              placeholder="Ej: hamburguesa sin cebolla, cerveza bien fría, sin hielo…"
              className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream resize-none"
            />
          </div>
        </>
      )}
      <button type="button" disabled={items.length === 0} onClick={onEnviar} className="btn-gold w-full text-sm disabled:opacity-40 disabled:cursor-not-allowed">
        Enviar a cocina →
      </button>
    </section>
  );
}
