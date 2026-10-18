import { useState } from "react";
import { Icon } from "../../../lib/icons";
import { bs } from "../../../lib/format";
import { CATEGORIA_ICONS } from "../../../store/seed";
import { MenuSecciones } from "../../../components/menu/MenuSecciones";
import { SubTabs } from "../../../components/menu/SubTabs";
import { EmptyState } from "../../../components/ui/EmptyState";
import { TabBar } from "../../../components/ui/TabBar";
import {
  CATEGORIAS, TAB_PROMOS, subcategoriasDe, filtrarPorSub,
  presentacionesDe, filtrarPorPresentacion,
} from "../../../lib/menu";
import type { Producto, Promocion } from "../../../types";

/** Lo mínimo que necesita el carrito para agregar algo (producto o promoción). */
export interface ItemAgregable {
  nombre: string;
  precio: number;
}

interface MenuGridProps {
  productos: Producto[];
  /** Solo las promociones activas. */
  promociones: Promocion[];
  onAgregar: (item: ItemAgregable) => void;
}

/** Menú del mesero: pestañas por categoría, secciones por subcategoría y 2 columnas. */
export function MenuGrid({ productos, promociones, onAgregar }: MenuGridProps) {
  const existentes = Array.from(new Set(productos.map((p) => p.categoria)));
  const categorias = [
    "Todos",
    ...CATEGORIAS.filter((c) => existentes.includes(c)),
    ...existentes.filter((c) => !CATEGORIAS.includes(c)),
    TAB_PROMOS,
  ];

  const [categoria, setCategoria] = useState("Todos");
  const [subSel, setSubSel] = useState("");
  const [presentacionSel, setPresentacionSel] = useState("");
  const tab = categorias.includes(categoria) ? categoria : "Todos";

  const deLaCategoria = tab === "Todos" || tab === TAB_PROMOS ? [] : productos.filter((p) => p.categoria === tab);
  const subs = subcategoriasDe(deLaCategoria, tab);
  // Si hay subcategorías, siempre hay una activa (por defecto la primera).
  const sub = subs.length ? (subs.includes(subSel) ? subSel : subs[0]) : "";
  const esCervezaArtesanal = tab === "Cerveza" && sub === "Cerveza artesanal";
  const productosDeSub = subs.length ? filtrarPorSub(deLaCategoria, sub) : deLaCategoria;
  const presentaciones = esCervezaArtesanal ? presentacionesDe(productosDeSub) : [];
  const presentacion = presentaciones.length
    ? presentaciones.includes(presentacionSel) ? presentacionSel : presentaciones[0]
    : "";

  const productosVisibles = tab === "Todos"
    ? productos
    : tab === TAB_PROMOS
      ? []
      : esCervezaArtesanal && presentaciones.length
        ? filtrarPorPresentacion(productosDeSub, presentacion)
        : productosDeSub;
  const mostrarPromos = tab === "Todos" ? promociones.length > 0 : tab === TAB_PROMOS;
  const totalVisibles = productosVisibles.length + (mostrarPromos ? promociones.length : 0);

  function elegirCategoria(c: string) {
    setCategoria(c);
    setSubSel("");
    setPresentacionSel("");
  }

  return (
    <div className="space-y-3">
      {/* Categorías */}
      <TabBar
        tabs={categorias.map((c) => ({
          value: c,
          label: <><Icon name={(CATEGORIA_ICONS[c] as any) ?? "productos"} className="w-3.5 h-3.5" />{c}</>,
        }))}
        active={tab}
        onChange={elegirCategoria}
        variant="scroll"
      />

      <p className="text-xs text-cream-dim">{totalVisibles} productos disponibles</p>

      {subs.length > 0 && <SubTabs titulo={tab} subs={subs} activa={sub} onChange={setSubSel} />}
      {presentaciones.length > 0 && (
        <SubTabs titulo="Presentación" subs={presentaciones} activa={presentacion} onChange={setPresentacionSel} />
      )}

      {/* Promociones */}
      {mostrarPromos && promociones.length > 0 && (
        <section className="space-y-3">
          {tab === "Todos" && (
            <div className="flex items-center gap-3">
              <h4 className="font-display text-gold text-sm tracking-wide">Promociones</h4>
              <span className="flex-1 h-px bg-line" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {promociones.map((promo) => (
              <div
                key={promo.id}
                className="card overflow-hidden text-left flex flex-col border-gold/50"
              >
                <div className="w-full h-16 sm:h-20 bg-gradient-to-br from-gold/25 to-bg-card-hi flex items-center justify-center text-gold relative overflow-hidden">
                  {promo.imagen ? <img src={promo.imagen} alt={promo.titulo} className="w-full h-full object-cover" /> : <Icon name="promo" className="w-7 h-7" />}
                  <span className="absolute top-2 left-2 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-gold text-bg-deep">
                    {promo.categoria || "Promo"}
                  </span>
                </div>
                <div className="p-2.5 sm:p-3 flex flex-col flex-1">
                  <p className="text-sm text-cream font-semibold leading-tight">{promo.titulo}</p>
                  {promo.vigencia && <p className="text-[10px] text-gold-soft mt-0.5">{promo.vigencia}</p>}
                  <p className="text-[11px] text-cream-dim mt-1.5 leading-snug line-clamp-4">{promo.descripcion}</p>
                  <div className="flex items-center justify-between gap-2 mt-auto pt-2.5">
                    <p className="text-sm text-gold font-semibold">{bs(promo.precio)}</p>
                    <button
                      type="button"
                      onClick={() => onAgregar({ nombre: `Promo: ${promo.titulo}`, precio: promo.precio })}
                      className="text-[11px] px-2 py-1 rounded bg-gold text-bg-deep font-semibold active:scale-95 transition"
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Productos por sección */}
      <MenuSecciones
        productos={productosVisibles}
        mostrarCategorias={tab === "Todos"}
        mostrarSubsecciones={tab === "Todos"}
        renderProducto={(p) => (
          <div key={p.id} className="card overflow-hidden text-left flex flex-col">
            {p.imagen && p.categoria !== "Cerveza" ? (
              <div className="w-full h-20 sm:h-24 overflow-hidden bg-bg-card-hi">
                <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-16 sm:h-20 bg-bg-card-hi flex items-center justify-center text-gold">
                <Icon name={(p.icon as any) ?? "plate"} className="w-7 h-7" />
              </div>
            )}
            <div className="p-2.5 sm:p-3 flex flex-col flex-1">
              <p className="text-sm text-cream font-semibold leading-tight">{p.nombre}</p>
              <p className="text-[10px] text-cream-dim mt-0.5">
                {p.categoria}{p.subcategoria ? ` · ${p.subcategoria}` : ""}{p.presentacion ? ` · ${p.presentacion}` : ""}
              </p>
              {p.descripcion && (
                <p className="text-[11px] text-cream-dim mt-1.5 leading-snug line-clamp-4">{p.descripcion}</p>
              )}
              <div className="flex items-center justify-between gap-2 mt-auto pt-2.5">
                <p className="text-sm text-gold font-semibold">{bs(p.precio)}</p>
                <button
                  type="button"
                  onClick={() => onAgregar({
                    ...p,
                    nombre: p.presentacion ? `${p.nombre} — ${p.presentacion}` : p.nombre,
                  })}
                  className="text-[11px] px-2 py-1 rounded bg-gold text-bg-deep font-semibold active:scale-95 transition"
                >
                  + Agregar
                </button>
              </div>
            </div>
          </div>
        )}
      />

      {totalVisibles === 0 && (
        <EmptyState message={tab === TAB_PROMOS ? "No hay promociones activas por ahora." : "No hay productos en esta categoría."} />
      )}
    </div>
  );
}
