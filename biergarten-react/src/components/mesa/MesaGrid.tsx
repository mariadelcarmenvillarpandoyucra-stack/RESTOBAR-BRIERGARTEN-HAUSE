import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { bs, tiempoMesaDesde } from "../../lib/format";
import type { Mesa, Pedido } from "../../types";

interface MesaGridProps {
  mesas: Mesa[];
  pedidos: Pedido[];
  onSelect?: (numero: number) => void;
}

function MesaCard({
  mesa,
  total,
  onSelect,
}: {
  mesa: Mesa;
  total: number;
  onSelect?: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  const ocupada = mesa.estado !== "libre";

  useEffect(() => {
    if (!ocupada || mesa.horaApertura === null) return;

    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, [mesa.estado, mesa.horaApertura, ocupada]);

  const contenido = (
    <>
      <div className="flex w-full items-center justify-between">
        <span className="text-xs font-medium text-cream-dim uppercase tracking-wide">Mesa</span>
        <Badge estado={mesa.estado} />
      </div>
      <span className="font-display text-4xl text-cream leading-none">{mesa.num}</span>
      <div className="min-h-10 flex flex-col items-center justify-center gap-1">
        {ocupada ? (
          <>
            <span className="text-xs text-cream-dim">
              {tiempoMesaDesde(mesa.horaApertura, now)}
            </span>
            <span className="text-sm text-gold font-semibold">{bs(total)}</span>
          </>
        ) : (
          <span className="text-xs text-cream-dim">
            {onSelect ? "Toca para tomar un pedido" : "Sin pedidos activos"}
          </span>
        )}
      </div>
    </>
  );

  const className = [
    "card min-h-[148px] w-full p-3 sm:p-4",
    "flex flex-col items-center justify-between gap-2 text-center",
    onSelect ? "cursor-pointer transition-all duration-200 hover:border-gold hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" : "",
    ocupada ? "border-warn/40" : "",
  ].join(" ");

  return onSelect ? (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      aria-label={`Mesa ${mesa.num}, ${ocupada ? "ocupada" : "libre"}${ocupada ? `, ${bs(total)}` : ""}`}
    >
      {contenido}
    </button>
  ) : (
    <div className={className}>{contenido}</div>
  );
}

export function MesaGrid({ mesas, pedidos, onSelect }: MesaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {mesas.map((mesa) => {
        const total = pedidos
          .filter((pedido) => pedido.mesa === mesa.num)
          .reduce((suma, pedido) => suma + pedido.total, 0);

        return (
          <MesaCard
            key={mesa.num}
            mesa={mesa}
            total={total}
            onSelect={onSelect ? () => onSelect(mesa.num) : undefined}
          />
        );
      })}
    </div>
  );
}
