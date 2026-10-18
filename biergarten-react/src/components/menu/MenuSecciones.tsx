import type { ReactNode } from "react";
import { agruparMenu } from "../../lib/menu";
import type { Producto } from "../../types";

interface MenuSeccionesProps {
  productos: Producto[];
  /** true en la pestaña "Todos": muestra también el título de cada categoría. */
  mostrarCategorias: boolean;
  renderProducto: (p: Producto) => ReactNode;
  /** false cuando ya se filtró por una subcategoría (evita repetir el título). */
  mostrarSubsecciones?: boolean;
}

/**
 * Muestra el menú dividido en secciones (categoría → subcategoría),
 * con los productos en 2 columnas. Lo usan el panel del dueño y el del mesero,
 * así ambos se ven igual.
 */
export function MenuSecciones({ productos, mostrarCategorias, renderProducto, mostrarSubsecciones = true }: MenuSeccionesProps) {
  const grupos = agruparMenu(productos);

  return (
    <div className="space-y-6">
      {grupos.map((g) => {
        const haySubsecciones = mostrarSubsecciones && g.subgrupos.some((s) => s.nombre !== null);
        return (
          <section key={g.categoria} className="space-y-3">
            {mostrarCategorias && (
              <div className="flex items-center gap-3">
                <h4 className="font-display text-gold text-sm tracking-wide">{g.categoria}</h4>
                <span className="flex-1 h-px bg-line" />
              </div>
            )}

            {g.subgrupos.map((sg) => (
              <div key={sg.nombre ?? "__otros"} className="space-y-2.5">
                {haySubsecciones && (
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rotate-45 bg-gold-dim" />
                    <h5 className="text-[11px] uppercase tracking-[0.14em] text-cream-dim font-semibold">
                      {sg.nombre ?? "Otros"}
                    </h5>
                    <span className="text-[10px] text-muted">({sg.productos.length})</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {sg.productos.map((p) => renderProducto(p))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
